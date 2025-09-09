import { Category, Media, Tenant } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Sort, Where } from "payload";
import z from "zod";
import { sortValue } from "../search-param";
import { DEFAULT_LIMIT } from "@/constants";
import { headers as getHeaders } from "next/headers";


export const productsRouter = createTRPCRouter({
    getOne: baseProcedure
        .input(
            z.object({
                id: z.string()
            })
        )
        .query(async ({ ctx, input }) => {
            const headers = await getHeaders();
            const session = await ctx.db.auth({ headers });

            const product = await ctx.db.findByID({
                collection: 'products',
                id: input.id,
                depth: 2, // populate "category" & "image"
                select :{
                    content:false
                }
            })
            if (!product) {
                throw new Error("Product not found");
            }
            let isPurchased = false;
            if (session?.user) {
                const ordersData = await ctx.db.find({
                    collection: 'orders',
                    limit: 1,
                    pagination: false,
                    where: {
                        and: [
                            {
                                product: {
                                    equals: input.id,
                                }
                            },
                            {
                                user: {
                                    equals: session.user.id,
                                }
                            }
                        ]
                    }
                });
                isPurchased = !!ordersData.docs[0];
            }
            const reviews = await ctx.db.find({
                collection: 'reviews',
                limit: 1,
                pagination: false,
                where: {
                    product: {
                        equals: input.id,
                    }
                },
            })
            const reviewsRating = reviews.docs.length > 0 ? reviews.docs.reduce((acc, doc) => acc + doc.rating, 0) / reviews.totalDocs : 0;
            const ratingDistribution: Record<number, number> = {
                5: 0,
                4: 0,
                3: 0,
                2: 0,
                1: 0
            };
            if(reviews.totalDocs > 0) {
                reviews.docs.forEach((review) => {
                    const Rating = review.rating;
                    if(Rating >= 1 || Rating <= 5) {
                        ratingDistribution[Rating] = (ratingDistribution[Rating] || 0) + 1;
                    }
                    
                })
                Object.keys(ratingDistribution).forEach((key) => {
                    const rating = Number(key);
                    const count = ratingDistribution[rating] || 0;
                    ratingDistribution[rating] = Math.round((count / reviews.totalDocs) * 100);
                })
            }
            return {
                ...product,
                isPurchased,
                image: product.image as Media | null,
                tenant: product.tenant as Tenant & { image: Media | null },
                reviewsRating,
                reviewsCount: reviews.totalDocs,
                ratingDistribution,
            }
        }),
    getMany: baseProcedure
        .input(
            z.object({
                cursor: z.number().default(1),
                limit: z.number().default(DEFAULT_LIMIT),
                category: z.string().nullable().optional(),
                minPrice: z.string().nullable().optional(),
                maxPrice: z.string().nullable().optional(),
                tags: z.array(z.string()).nullable().optional(),
                sort: z.enum(sortValue).nullable().optional(),
                tenantSlug: z.string().nullable().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            const where: Where = {};
            let sort: Sort = '-created_at';
            if (input.sort == "trending") {
                sort = 'name';
            }
            if (input.sort == "hot_and_new") {
                sort = '-created_at';
            }
            if (input.sort == "trending") {
                sort = '+created_at';
            }
            if (input.minPrice && input.maxPrice) {
                where.price = {
                    less_than_equal: input.maxPrice,
                    greater_than_equal: input.minPrice
                }
            } else if (input.minPrice) {
                where.price = {
                    greater_than_equal: input.minPrice
                }
            } else if (input.maxPrice) {
                where.price = {
                    less_than_equal: input.maxPrice
                }
            }


            if (input.tenantSlug) {
                where['tenant.slug'] = {
                    equals: input.tenantSlug,
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
            if (input.tags && input.tags.length > 0) {
                where['tags.name'] = {
                    in: input.tags,
                }
            }
            const data = await ctx.db.find({
                collection: 'products',
                depth: 2, // populate "category" & "image"
                where,
                sort,
                page: input.cursor,
                limit: input.limit,
                select :{
                    content:false
                }
            });
            const dataWithSummarizedReviews = await Promise.all(
                data.docs.map(async (doc) => {
                    const reviewsData = await ctx.db.find({
                        collection: 'reviews',
                        limit: 1,
                        pagination: false,
                        where: {
                            product: {
                                equals: doc.id,
                            }
                        },
                    });
                    return {
                        ...doc,
                        reviewsCount: reviewsData.totalDocs,
                        reviewsRating: reviewsData.docs.length === 0 ? 0:reviewsData.docs.reduce((acc, doc) => acc + doc.rating, 0)/reviewsData.totalDocs
                    };
                })
            )

            return {
                ...data,
                docs: dataWithSummarizedReviews.map((doc) => ({
                    ...doc,
                    image: doc.image as Media | null,
                    tenant: doc.tenant as Tenant & { image: Media | null }
                }))
            };
        })
})