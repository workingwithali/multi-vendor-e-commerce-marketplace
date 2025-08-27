import type Stripe from "stripe";

export type ProductMetaData = {
    stripeAccountId: string;
    id: string;
    name: string;
    price: number;
} 
export type CheckoutMetaData = {
    userId: string;
} 

export type expenededLineItem = Stripe.LineItem & {
    price: Stripe.Price & {
        product: Stripe.Product & {
            metadata: ProductMetaData;
        }
    }
}