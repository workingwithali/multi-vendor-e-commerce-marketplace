
import { DEFAULT_LIMIT } from "@/constants";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import z from "zod";


export const tagsRouter = createTRPCRouter({
    getOne: baseProcedure
        .input(
            z.object({
                slug : z.string()
            })
        )
        .query(async ({ ctx, input }) => {


            
            const data = await ctx.db.find({
                collection: 'tags',
                page: input.cursor,
                limit: input.limit,
            });

            return data;
        })
})