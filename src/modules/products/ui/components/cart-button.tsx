import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCart } from "@/modules/checkout/hooks/use-cart"
import Link from "next/link"
interface Props {
    tenatSlug: string,
    productId: string,
    isPurchased?: boolean,
}
export const CartButton = ({ tenatSlug, productId, isPurchased }: Props) => {
    const cart = useCart(tenatSlug)
    if (isPurchased) {
        return (
            <Button className={cn(
                "flex-1 h-12 rounded-sm text-sm font-medium transition-shadow duration-2000",
                "bg-background hover:bg-foreground hover:text-background border border-foreground text-foreground shadow-none shadow-foreground hover:shadow-sm",
            )}
            asChild
            >
                <Link href={`/library/${productId}`}>
                    View in library
                </Link>
            </Button>
        );
    }
    return (
        <Button
            onClick={() => cart.toggleProduct(productId)}

            className={cn(
                "flex-1 h-12 rounded-sm text-sm font-medium transition-shadow duration-200",
                "bg-primary border border-foreground text-foreground shadow-none shadow-foreground hover:shadow-sm",
                cart.isProductInCart(productId) &&
                "bg-background hover:bg-background"
            )}
        >
            {cart.isProductInCart(productId) ? "Remove from cart" : "Add to cart"}
        </Button>
    )
}
