import { getQueryClient, trpc } from "@/trpc/server";
import { ProductListViews } from "@/modules/products/ui/views/product-list-views";
import { loaderProdcutFilters } from "@/modules/products/search-param";
import { SearchParams } from "nuqs/server";
import { DEFAULT_LIMIT } from "@/constants";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface Props {
  params: Promise<{
    slug: string;
  }>,
  searchParams: Promise<SearchParams>

}

const Page = async ({ params, searchParams }: Props) => {
  const { slug } = await params; 
  const filter = await loaderProdcutFilters(searchParams); 

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
      <ProductListViews tenantSlug={slug} narrowView />
    </HydrationBoundary>
  );
};

export default Page;
