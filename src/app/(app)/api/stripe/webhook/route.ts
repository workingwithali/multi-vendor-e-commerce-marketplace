import type { Stripe } from "stripe";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getPayload } from "payload";
import config from "@payload-config";
import { TRPCError } from "@trpc/server";
import { expenededLineItem } from "@/modules/checkout/types.";


export async function POST(req: Request) {
    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(
            await (await req.blob()).text(),
            req.headers.get("Stripe-Signature") as string,
            process.env.STIRPE_WEBHOOK_SECRET as string
        )
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        if (error! instanceof Error) {
            console.log(error);
        }
        console.log(`❌ Error message: ${errorMessage}`);
        return Response.json(
            { message: `Webhook Error: ${errorMessage}` },
            { status: 400 }
        )

    }
    console.log("✅ Success:", event.id);

    const permittedEvents: string[] = [
        "checkout.session.completed",
    ];
    const payload = await getPayload({ config });
    if (permittedEvents.includes(event.type)) {
        try {
            switch (event.type) {
                case "checkout.session.completed":
                    const data = event.data.object as Stripe.Checkout.Session;
                    if (!data.metadata?.userId) {
                        return new Error("User ID is missing in metadata");
                    }
                    const user = await payload.findByID({
                        collection: "users",
                        id: data.metadata.userId,
                    });
                    if (!user) {
                        throw new Error("User not found");
                    }
                    const expendedSession = await stripe.checkout.sessions.retrieve(
                        data.id,
                        {
                            expand: ['line_items']
                        }
                    );
                    if (!expendedSession.line_items?.data || !expendedSession.line_items.data.length) {
                        throw new Error("Line items not found");
                    }
                    const lineItems = expendedSession.line_items.data as expenededLineItem[];
                    for (const item of lineItems) {
                       
                        await payload.create({
                            collection: "orders",
                            data: {
                                stripeCheckoutSessionId: data.id,
                                user: user.id,
                                product: item.price.product.metadata.id,
                                name:item.price.product.name
                            },
                            overrideAccess: true,
                        });
                    }
                    break;
                default:
                    throw new Error(`Unhandled event type: ${event.type}`);
            }
            

        } catch (error) {
            console.log(error);
            return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });

        }
        

    }
    return NextResponse.json({ message: "Received" }, { status: 200 })
}