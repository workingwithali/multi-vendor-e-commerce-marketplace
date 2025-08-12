
import { loaderProdcutFilters } from "@/modules/products/search-param";
import { ProductListViews } from "@/modules/products/ui/views/product-list-views";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs/server";

interface Props {
  params: Promise<{
    category: string;
  }>,
  searchParams: Promise<SearchParams>
}

const Page = async ({ params, searchParams }: Props) => {
  const { category } = await params;
  const filter = await loaderProdcutFilters(searchParams);
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({
    category,
    ...filter
  }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
     <ProductListViews category={category}/>
    </HydrationBoundary>
  );
};

export default Page;
