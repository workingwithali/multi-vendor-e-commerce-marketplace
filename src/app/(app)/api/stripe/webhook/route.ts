import type { Stripe } from "stripe";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getPayload } from "payload";
import config from "@payload-config";

export async function POST(req: Request) {
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      await (await req.blob()).text(),
      req.headers.get("Stripe-Signature") as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    if (error! instanceof Error) {
      console.log(error);
    }
    console.log(`❌ Error message: ${errorMessage}`);
    return Response.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    );
  }

  console.log("✅ Success:", event.id);

  const permittedEvents: string[] = [
    "checkout.session.completed",
    "account.updated",
  ];
  const payload = await getPayload({ config });

  if (permittedEvents.includes(event.type)) {
    try {
      switch (event.type) {
        case "checkout.session.completed": {
          const data = event.data.object as Stripe.Checkout.Session;

          if (!data.metadata?.userId) {
            throw new Error("User ID is missing in metadata");
          }

          const user = await payload.findByID({
            collection: "users",
            id: data.metadata.userId,
          });

          if (!user) {
            throw new Error("User not found");
          }

          // ✅ Expand both line_items and product
          const expandedSession = await stripe.checkout.sessions.retrieve(
            data.id, 
            {
            expand: ["line_items", "line_items.data.price.product"],
          },
          {
            stripeAccount: event.account,
          }
        );

          if (
            !expandedSession.line_items?.data ||
            !expandedSession.line_items.data.length
          ) {
            throw new Error("Line items not found");
          }

          const lineItems = expandedSession.line_items.data;

          for (const item of lineItems) {
            const product = item.price?.product as Stripe.Product | string;

            // Handle case where product is just an ID string
            if (typeof product === "string") {
              console.warn("⚠️ Product not expanded, only ID provided:", product);
              continue;
            }

            await payload.create({
              collection: "orders",
              data: {
                stripeCheckoutSessionId: data.id,
                user: user.id,
                product: product.metadata?.id ?? product.id,
                name: product.name || "Unknown Product",
              },
              overrideAccess: true,
            });
          }
          break;
        }
        case "account.updated": {
          const data = event.data.object as Stripe.Account;

          await payload.update({
            collection: "tenants",
            where: {
              stripeAccountId: {
                equals: data.id,
              },
            },
            data: {
              stripeDetailsSubmitted: data.details_submitted ,
            },
            
          });
          break;
        }
        default:
          throw new Error(`Unhandled event type: ${event.type}`);
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Webhook handler failed" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ message: "Received" }, { status: 200 });
}
