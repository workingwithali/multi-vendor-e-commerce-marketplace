"use client"

import { useTRPC } from "@/trpc/client";
import { useCart } from "../../hooks/use-cart";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { generateTenantsUrl } from "@/lib/utils";
import { CheckoutItems } from "../components/checkout-item";


interface Props {
  tenantSlug: string
}

export const CheckoutView = ({ tenantSlug }: Props) => {
  const { productIds, clearAllCarts , removeProduct } = useCart(tenantSlug);
  const trpc = useTRPC();
  const { data, error } = useQuery(trpc.checkout.getProducts.queryOptions({ ids: productIds }))
  useEffect(() => {
    if (!error) return;
    if (error.data?.code === "NOT_FOUND") {
      clearAllCarts()
      toast.warning("Invalid product found, clearing cart");
    }
  }, [error, clearAllCarts])
  return (
    <div className="lg:pt-16 pt-4 px-4 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="border rounded-sm overflow-hidden bg-background">
            {data?.docs.map((product, index) => (
              <CheckoutItems
                key={product.id}
                id={product.id}
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
          checkout sidebar
        </div>
      </div>
    </div>
  )
}
