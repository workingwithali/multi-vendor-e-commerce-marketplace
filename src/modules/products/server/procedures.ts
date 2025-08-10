import { Category, Media } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Sort, Where } from "payload";
import z from "zod";
import { sortValue } from "../search-param";


export const productsRouter = createTRPCRouter({
    getMany: baseProcedure
        .input(
            z.object({
                category: z.string().nullable().optional(),
                minPrice: z.string().nullable().optional(),
                maxPrice: z.string().nullable().optional(),
                tags : z.array(z.string()).nullable().optional(),
                sort : z.enum(sortValue).nullable().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            const where: Where = {};
            let sort:Sort = '-created_at';
            if (input.sort == "trending") {
                sort = 'name';
            }
            if (input.sort == "hot_and_new") {
                sort = '-created_at';
            }
            if (input.sort == "trending") {
                sort = '+created_at';
            }
            if(input.minPrice && input.maxPrice){
                where.price = {
                    less_than_equal: input.maxPrice,
                    greater_than_equal: input.minPrice
                }
            }else if(input.minPrice){
                where.price = {
                    greater_than_equal: input.minPrice
                }
            }else if(input.maxPrice){
                where.price = {
                    less_than_equal: input.maxPrice
                }
            }
            


            if (input.category) {
                const categoriesData = await ctx.db.find({
                    collection: 'categories',
                    limit: 1,
                    depth: 1, // populate "subcategories" 
                    pagination: false,
                    where: {
                        slug: {
                            equals: input.category,
                        },
                    },
                });
                const formattedData = categoriesData.docs.map((doc) => ({
                    ...doc,
                    subcategories: (doc.subcategories?.docs ?? []).map((subdoc) => ({
                        ...(subdoc as Category),
                    })),
                }));
                const subcategoriesSlug = [];
                const parentCategory = formattedData[0];

                if (parentCategory) {
                    subcategoriesSlug.push(...parentCategory.subcategories.map((subcategory) => subcategory.slug));

                    where['category.slug'] = {
                        in: [parentCategory.slug, ...subcategoriesSlug],
                    }
                }
            }
            if(input.tags&&input.tags.length>0){
                where['tags.name'] = {
                    in: input.tags,
                }
            } 
            const data = await ctx.db.find({
                collection: 'products',
                depth: 1, // populate "category" & "image"
                where,
                sort
            });

            return {
                ...data,
                docs: data.docs.map((doc) => ({
                    ...doc,
                    image: doc.image as Media |null,
                }))
            };
        })
})