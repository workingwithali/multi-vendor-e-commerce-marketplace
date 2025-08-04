import { ProductList, productListSkeleton } from "@/modules/products/ui/components/product-list";
import { getQueryClient , trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { Suspense } from "react";

interface Props {
  params: Promise<{
    category: string
  }>
}
const page = async ({  }: Props) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());


  return (
    <HydrationBoundary state={ dehydrate(queryClient) }>
      <Suspense fallback={<productListSkeleton />}>
      <ProductList />
      </Suspense>
    </HydrationBoundary>
  )
}

export default page
