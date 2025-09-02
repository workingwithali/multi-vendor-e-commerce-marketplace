
import { DEFAULT_LIMIT } from "@/constants";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { create } from "domain";
import z from "zod";


export const tagsRouter = createTRPCRouter({
    getOne: protectedProcedure
        .input(
            z.object({
                productId: z.string()
            })
        )
        .query(async ({ ctx, input }) => {
            const product = await ctx.db.findByID({
                collection: "products",
                id: input.productId,
            })
            if (!product) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Product not found"
                })
            }
            const reviewsData = await ctx.db.find({
                collection: 'reviews',
                limit: 1,
                pagination: false,
                where: {
                    and: [
                        {
                            product: {
                                equals: input.productId
                            }
                        },
                        {
                            user: {
                                equals: ctx.session.user.id
                            }
                        }
                    ]
                }
            });
            const review = reviewsData.docs[0];
            if (!review) return null;
            return review;
        }),
    create: protectedProcedure
        .input(
            z.object({
                productId: z.string(),
                rating: z.number().min(1, { message: "Rating is required" }).max(5),
                comment: z.string().min(1, { message: "Comment is required" }).max(500),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const product = await ctx.db.findByID({
                collection: "products",
                id: input.productId,
            })
            if (!product) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Product not found"
                })
            }

            const existingReview = await ctx.db.find({
                collection: 'reviews',
                limit: 1,
                pagination: false,
                where: {
                    and: [
                        {
                            product: {
                                equals: input.productId
                            }
                        },
                        {
                            user: {
                                equals: ctx.session.user.id
                            }
                        }
                    ]
                }
            });
            if (existingReview.totalDocs > 0) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "You have already reviewed this product"
                })
            }

            const review = await ctx.db.create({
                collection: "reviews",
                data: {
                    user: ctx.session.user.id,
                    product: input.productId,
                    rating: input.rating,
                    comment: input.comment,
                }
            })
            return review;
        }),
    update: protectedProcedure
        .input(
            z.object({
                reviewsId: z.string(),
                rating: z.number().min(1, { message: "Rating is required" }).max(5),
                comment: z.string().min(1, { message: "Comment is required" }).max(500),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const existingReview = await ctx.db.findByID({
                depth: 0,
                collection: "reviews",
                id: input.reviewsId,
            })
            if (!existingReview) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Review not found"
                })
            }
            if (existingReview.user !== ctx.session.user.id) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "You are not authorized to update this review"
                })
            
            }

            const updatedReview = await ctx.db.update({
                collection: "reviews",
                id: input.reviewsId,
                data: {
                    rating: input.rating,
                    comment: input.comment,
                }
            })
            return updatedReview;
        }),
})