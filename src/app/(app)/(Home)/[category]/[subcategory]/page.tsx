
import { DEFAULT_LIMIT } from "@/constants";
import { loaderProdcutFilters } from "@/modules/products/search-param";
import { ProductList, ProductListSkeleton } from "@/modules/products/ui/components/product-list";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs";
import { Suspense } from "react";

interface Props {
  params: Promise<{
    subcategory: string;
  }>;
  searchParams: Promise<SearchParams>;
}

const Page =  async ({params , searchParams}: Props) => {
  const { subcategory } = await params;
    const filter = await loaderProdcutFilters(searchParams);
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
    ...filter,
    category : subcategory,
    limit: DEFAULT_LIMIT
  }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList  category={subcategory}/>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
