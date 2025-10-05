import { Media, Tenant } from "@/payload-types";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "@/trpc/init";
import z from "zod";
import { TRPCError } from "@trpc/server";
import { CheckoutMetaData, ProductMetaData } from "../types.";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";



export const checkoutRouter = createTRPCRouter({
    verify: protectedProcedure
        .mutation(async ({ ctx }) => {
            const user = await ctx.db.findByID({
                collection: 'users',
                id: ctx.session.user.id,
                depth: 0,
            });
            if (!user) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found"
                })
            }
            const tenantId = user.tenants?.[0]?.tenant as string
            const tenant = await ctx.db.findByID({
                collection: 'tenants',
                id: tenantId,
            });
            if (!tenant) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Tenant not found"
                })
            }
            const accountLinks = await stripe.accountLinks.create({
                account: tenant.stripeAccountId,
                refresh_url: `${process.env.NEXT_PUBLIC_API_URL}/admin`,
                return_url: `${process.env.NEXT_PUBLIC_API_URL}/admin`,
                type: "account_onboarding",
            });
            if (!accountLinks.url) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to create account link."
                });
            }
            return { url: accountLinks.url };
        }),


    purchase: protectedProcedure
        .input(
            z.object({
                productIds: z.array(z.string()).min(1),
                tenantSlug: z.string().min(1),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const products = await ctx.db.find({
                collection: 'products',
                depth: 2,
                where: {
                    and: [
                        {
                            id: {
                                in: input.productIds
                            }
                        },
                        {
                            "tenant.slug": {
                                equals: input.tenantSlug
                            }
                        },
                        {
                            isArchived: {
                                not_equals: true
                            }
                        }
                    ]


                },
            });

            if (products.totalDocs !== input.productIds.length) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Some products are invalid or do not belong to the specified tenant."
                });
            }
            const tenantData = await ctx.db.find({
                collection: 'tenants',
                limit: 1,
                pagination: false,
                where: {
                    slug: {
                        equals: input.tenantSlug
                    }
                },
            });
            const tenant = tenantData?.docs?.[0];
            if (!tenant) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Tenant not found."
                });
            }
            const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = products.docs.map((product) => ({
                quantity: 1,
                price_data: {
                    currency: "pkr",
                    product_data: {
                        name: product.name,
                        metadata: {
                            stripeAccountId: tenant.stripeAccountId,
                            id: product.id,
                            name: product.name,
                            price: product.price,
                        } as ProductMetaData,
                    },
                    unit_amount: product.price * 100,
                },
            }));
            const checkout = await stripe.checkout.sessions.create({
                customer_email: ctx.session.user.email,
                success_url: `${process.env.NEXt_PUBLIC_API_URL}/tenants/${input.tenantSlug}/checkout?success=true`,
                cancel_url: `${process.env.NEXt_PUBLIC_API_URL}/tenants/${input.tenantSlug}/checkout?canceled=true`,
                mode: 'payment',
                line_items: lineItems,
                invoice_creation: { enabled: true },
                metadata: { userId: ctx.session.user.id } as CheckoutMetaData,
            });
            if (!checkout.url) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to create checkout session."
                });
            }

            return { url: checkout.url };
        })

    ,
    getProducts: baseProcedure
        .input(
            z.object({
                ids: z.array(z.string()),
            })
        )
        .query(async ({ ctx, input }) => {
            const data = await ctx.db.find({
                collection: 'products',
                depth: 2, // populate "category" & "image"
                where: {
                    and: [
                        {
                            id: {
                                in: input.ids
                            }
                        },
                        {
                            isArchived: {
                                not_equals: true
                            }
                        }
                    ]

                },
            });
            if (data.totalDocs !== input.ids.length) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Products not found"
                })
            }
            const totalPrice = data.docs.reduce((acc, product) => {
                const price = Number(product.price);
                return acc + (isNaN(price) ? 0 : price);
            }, 0)

            return {
                ...data,
                totalPrice: totalPrice,
                docs: data.docs.map((doc) => ({
                    ...doc,
                    image: doc.image as Media | null,
                    tenant: doc.tenant as Tenant & { image: Media | null }
                }))
            };
        })
})