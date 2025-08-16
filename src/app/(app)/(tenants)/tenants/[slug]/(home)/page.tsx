import { getQueryClient, trpc } from "@/trpc/server";
import { ProductListViews } from "@/modules/products/ui/views/product-list-views";
import { loaderProdcutFilters } from "@/modules/products/search-param";
import { SearchParams } from "nuqs/server";
import { DEFAULT_LIMIT } from "@/constants";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface Props {
  params: { slug: string };
  searchParams: SearchParams;
}

const Page = async ({ params, searchParams }: Props) => {
  const { slug } = params; // ✅ params is not a promise
  const filter = await loaderProdcutFilters(searchParams); // ✅ searchParams, not SearchParam

  const queryClient = getQueryClient();

  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filter,
      tenantSlug: slug,
      limit: DEFAULT_LIMIT,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListViews tenantSlug={slug} />
    </HydrationBoundary>
  );
};

export default Page;
