"use client"

import { useTRPC } from "@/trpc/client";
import { useCart } from "../../hooks/use-cart";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { generateTenantsUrl } from "@/lib/utils";
import { CheckoutItems } from "../components/checkout-item";
import { CheckoutSidebar } from "../components/checkout-sidebar";
import { InboxIcon, LoaderIcon } from "lucide-react";
import { useCheckoutState } from "../../hooks/use-checkout-state";
import { useRouter } from "next/navigation";


interface Props {
  tenantSlug: string
}


export const CheckoutView = ({ tenantSlug }: Props) => {
  const router = useRouter();
  const { states, setStates } = useCheckoutState();
  const { productIds, removeProduct, clearCart } = useCart(tenantSlug);
  const trpc = useTRPC();
  const { data, error, isLoading } = useQuery(trpc.checkout.getProducts.queryOptions({ ids: productIds }))
  const purchase = useMutation(trpc.checkout.purchase.mutationOptions({
    onMutate: () => {
      setStates({ success: false, cancel: false });
    },
    onSuccess: (data) => {
      window.location.href = data.url;
    },
    onError: (error) => {
      if (error.data?.code === "UNAUTHORIZED") {
          router.push("/sign-in")
        }
        toast.error(
          error.message || "Something went wrong, please try again."
        );
      }
    }
  ));
  // Handle success state
  useEffect(() => {
    if (states.success) {
      setStates({ success: false, cancel: false });
      clearCart();
      router.push("/products")
    }
  }, [states.success, clearCart, router , setStates])

   useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("canceled")) {
      setStates({ success: false, cancel: true });
      toast.info("Checkout was canceled.");
      // remove `canceled` query from URL to avoid repeat toast
      const url = new URL(window.location.href);
      url.searchParams.delete("canceled");
      window.history.replaceState({}, "", url.toString());
    }
  }, [setStates]);

  // Handle invalid product in cart
  useEffect(() => {
    if (!error) return;
    if (error.data?.code === "NOT_FOUND") {
      clearCart()
      toast.warning("Invalid product found, clearing cart");
    }
  }, [error, clearCart])

  // Loading state
  if (isLoading) return (
    <div className="lg:pt-16 pt-4 px-4 lg:px-12">
      <div className='flex flex-col justify-center items-center text-2xl font-semibold border border-foreground py-8 border-dashed gap-y-4 bg-background w-full rounded-lg'>
        <LoaderIcon className="animate-spin size-4 text-muted-foreground" />
      </div>
    </div>
  )

  // Empty state
  if (data?.totalDocs === 0) return (
    <div className="lg:pt-16 pt-4 px-4 lg:px-12">
      <div className='flex flex-col justify-center items-center text-2xl font-semibold border border-foreground py-8 border-dashed gap-y-4 bg-background w-full rounded-lg'>
        <InboxIcon />
        <p className='text-base font-medium'>No products found</p>
      </div>
    </div>
  )

  // Main state
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
            onPurchase={() => purchase.mutate({ productIds, tenantSlug })}
            isCanceled={states.cancel}
            disabled={purchase.isPending}
          />
        </div>
      </div>
    </div>
  )
}
