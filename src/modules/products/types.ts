import { inferRouterOutputs } from "@trpc/server";
import type { appRouter } from "@/trpc/routers/_app";

export type productsGetManyOutput = inferRouterOutputs<typeof appRouter>["products"]["getMany"];