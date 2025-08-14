
import { DEFAULT_LIMIT } from "@/constants";
import { loaderProdcutFilters } from "@/modules/products/search-param";
import { ProductListViews } from "@/modules/products/ui/views/product-list-views";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs/server";

interface Props {
  searchParams: Promise<SearchParams>
}

const Page = async ({ searchParams }: Props) => {
  const filter = await loaderProdcutFilters(searchParams);
  const queryClient = getQueryClient();

  void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
    ...filter,
    limit: DEFAULT_LIMIT
  }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
     <ProductListViews />
    </HydrationBoundary>
  );
};

export default Page;
