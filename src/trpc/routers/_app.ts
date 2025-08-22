
import { authRouter } from '@/modules/auth/server/procedures';
import { createTRPCRouter } from '../init';
import { categoriesRouter } from '@/modules/categories/server/procedures';
import { productsRouter } from '@/modules/products/server/procedures';
import { tagsRouter } from '@/modules/tags/server/procedures';
import { tenantsRouter } from '@/modules/tenants/server/procedures';
import { check } from 'zod';
import { checkoutRouter } from '@/modules/checkout/server/procedures';
export const appRouter = createTRPCRouter({
   products : productsRouter,
   auth: authRouter,
   tags: tagsRouter,
   categories: categoriesRouter,
   tenants : tenantsRouter,
   checkout : checkoutRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;