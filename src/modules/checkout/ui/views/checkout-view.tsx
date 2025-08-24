"use client"

import { useTRPC } from "@/trpc/client";
import { useCart } from "../../hooks/use-cart";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { generateTenantsUrl } from "@/lib/utils";
import { CheckoutItems } from "../components/checkout-item";
import { CheckoutSidebar } from "../components/checkout-sidebar";
import { InboxIcon, LoaderIcon } from "lucide-react";


interface Props {
  tenantSlug: string
}

export const CheckoutView = ({ tenantSlug }: Props) => {
  const { productIds, clearAllCarts, removeProduct } = useCart(tenantSlug);
  const trpc = useTRPC();
  const { data, error, isLoading } = useQuery(trpc.checkout.getProducts.queryOptions({ ids: productIds }))
  useEffect(() => {
    if (!error) return;
    if (error.data?.code === "NOT_FOUND") {
      clearAllCarts()
      toast.warning("Invalid product found, clearing cart");
    }
  }, [error, clearAllCarts])
  if (isLoading) return (
    <div className="lg:pt-16 pt-4 px-4 lg:px-12">
      <div className='flex flex-col justify-center items-center text-2xl font-semibold border border-foreground py-8 border-dashed gap-y-4 bg-background w-full rounded-lg'>
        <LoaderIcon className="animate-spin size-4 text-muted-foreground" />
      </div>
    </div>
  )
  if (data?.totalDocs === 0) return (
    <div className="lg:pt-16 pt-4 px-4 lg:px-12">
      <div className='flex flex-col justify-center items-center text-2xl font-semibold border border-foreground py-8 border-dashed gap-y-4 bg-background w-full rounded-lg'>
        <InboxIcon />
        <p className='text-base font-medium'>No products found</p>
      </div>
    </div>
  )
  return (
    <div className="lg:pt-16 pt-4 px-4 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="border rounded-sm overflow-hidden bg-background">
            {data?.docs.map((product, index) => (
              <CheckoutItems
                key={product.id}
                isLast={index === data.docs.length - 1}
                imageUrl={product?.image?.url}
                name={product?.name}
                productUrl={`${generateTenantsUrl(product.tenant.slug)}/products/${product?.id}`}
                tenantUrl={`${generateTenantsUrl(product.tenant.slug)}`}
                tenantName={product.tenant.name}
                price={product?.price}
                onRemove={() => removeProduct(product.id)}
              />
            ))}
          </div>
        </div>
        <div className="lg:col-span-3">
          <CheckoutSidebar
            total={data?.totalPrice || 0}
            onCheckout={() => { }}
            isCanceled={false}
            isPending={false}
          />
        </div>
      </div>
    </div>
  )
}
