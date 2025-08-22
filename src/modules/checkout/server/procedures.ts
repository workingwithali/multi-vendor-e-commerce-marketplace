import {  Media, Tenant } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import z from "zod";
import { TRPCError } from "@trpc/server";


export const checkoutRouter = createTRPCRouter({
   
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
                    id: {
                        in: input.ids
                    }
                },
            });
            if (data.totalDocs !== input.ids.length) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Products not found"
                })
            }

            return {
                ...data,
                docs: data.docs.map((doc) => ({
                    ...doc,
                    image: doc.image as Media |null,
                    tenant: doc.tenant as Tenant & { image: Media | null }
                }))
            };
        })
})