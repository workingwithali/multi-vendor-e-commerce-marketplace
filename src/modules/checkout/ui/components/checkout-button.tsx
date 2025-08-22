import { Button } from "@/components/ui/button";
import { cn, generateTenantsUrl } from "@/lib/utils";
import Link from "next/link";
import { useCart } from "../../hooks/use-cart";
import { ShoppingCartIcon } from "lucide-react";

interface Props {
  className?: string;
  hideIfEmpty?: boolean;
  tenantSlug: string;
}

export const CheckoutButton = ({ className, hideIfEmpty, tenantSlug }: Props) => {
  const { totalItems } = useCart(tenantSlug);

  if (hideIfEmpty && totalItems === 0) return null;

  return (
    <Button
      asChild
      className={cn(
        "flex-1 h-12 rounded-sm text-sm font-medium transition-shadow duration-200",
        "bg-primary border border-foreground text-foreground shadow-none hover:shadow-sm",
        className
      )}
    >
      <Link href={`${generateTenantsUrl(tenantSlug)}/checkout`}>
        <ShoppingCartIcon className="mr-2 h-4 w-4" />
        {totalItems > 0 ? totalItems : "Checkout"}
      </Link>
    </Button>
  );
};
