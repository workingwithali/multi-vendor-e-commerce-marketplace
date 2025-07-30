import { inferRouterOutputs } from "@trpc/server";
import type { appRouter } from "@/trpc/routers/_app";

export type categoriesGetManyOutput = inferRouterOutputs<typeof appRouter>["categories"]["getMany"];