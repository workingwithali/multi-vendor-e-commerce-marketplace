import type { Stripe } from "stripe";
import {  NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getPayload } from "payload";
// import { config } from "@payload-config"; 

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
        if(error! instanceof Error) {
            console.log(error);
        }
        console.log(`❌ Error message: ${errorMessage}`);
        return  Response.json(
            {message: `Webhook Error: ${errorMessage}`},
            {status: 400}
        )
        
    }

}