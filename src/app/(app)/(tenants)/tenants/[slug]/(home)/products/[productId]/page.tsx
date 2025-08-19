import { ProductView } from "@/modules/products/ui/views/product-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";


interface Props {
    params: Promise<{
    slug: string;
    productId: string
  }>,
}



const Page = async( { params }: Props) => {
    const { productId , slug } = await params;
    const queryClient = getQueryClient();
      void queryClient.prefetchQuery(trpc.tenants.getOne.queryOptions({
        slug,
      }));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductView tenantSlug={slug} prodcutId={productId} />
    </HydrationBoundary>
  )
}

export default Page