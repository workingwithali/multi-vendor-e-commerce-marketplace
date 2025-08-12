
import { loaderProdcutFilters } from "@/modules/products/search-param";
import { ProductFilters } from "@/modules/products/ui/components/product-filter";
import { ProductList, ProductListSkeleton } from "@/modules/products/ui/components/product-list";
import { ProductSort } from "@/modules/products/ui/components/product-sort";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";

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
     
    </HydrationBoundary>
  );
};

export default Page;
