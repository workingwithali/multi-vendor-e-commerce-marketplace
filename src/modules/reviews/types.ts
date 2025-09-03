import { inferRouterOutputs } from "@trpc/server";
import type { appRouter } from "@/trpc/routers/_app";

export type ReviewGetOneOutput = inferRouterOutputs<typeof appRouter>["reviews"]["getOne"];