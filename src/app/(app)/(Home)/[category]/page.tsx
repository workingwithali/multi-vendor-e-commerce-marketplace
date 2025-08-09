
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
      <div className="px-4 lg:px-12 py-8 flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-y-2 lg:gap-y-0 ">
          <p className="test-2xl font-semibold" >Curated for you</p>
          <ProductSort />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-y-6 gap-x-12 ">
          <div className="lg:col-span-2 xl:col-span-2">
            <ProductFilters />
          </div>
          <div className="lg:col-span-4 xl:col-span-6">
            <Suspense fallback={<ProductListSkeleton />}>
              <ProductList category={category} />
            </Suspense>
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default Page;
