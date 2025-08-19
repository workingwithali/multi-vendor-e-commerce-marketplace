import { formatCurrency, generateTenantsUrl } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";



interface ProductCardProps {
    id: string;
    name: string;
    imageUrl?: string | null;
    tenantSlug: string;
    tenantImageUrl?: string | null;
    reviewRating: number;
    reviewCount: number;
    price: number;
}


export const ProductCard = ({
    id,
    name,
    imageUrl,
    tenantSlug,
    tenantImageUrl,
    reviewRating,
    reviewCount,
    price
}: ProductCardProps
) => {
    const route = useRouter();
    const handleUserClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault() ;
        e.stopPropagation();
        route.push(generateTenantsUrl(tenantSlug));
    }

    return (
        <Link href={`${generateTenantsUrl(tenantSlug)}/products/${id}`}>
            <div className="border border-foreground rounded-md bg-background flex flex-col overflow-y-hidden h-full ">
                <div className="relative aspect-square" >
                    <Image
                        src={imageUrl || "/placeholder.png"}
                        alt={name}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="flex-1 flex flex-col p-4 border-y gap-2">
                    <h2 className="text-sm font-semibold  line-clamp-4">{name}</h2>
                    <div className="flex items-center gap-2" onClick={handleUserClick} >
                        {tenantImageUrl&& (
                            <Image
                                src={tenantImageUrl}
                                alt={tenantSlug}
                                width={16}
                                height={16}
                                className="rounded-full border shrink-0 object-cover size-[16px]"
                            />
                        )}
                        <p className="text-xs text-medium underline">{tenantSlug}</p>
                    </div>
                    {reviewCount > 0 && (
                        <div className="flex items-center gap-1">
                            <StarIcon className="size-3 fill-yellow-400" />
                            <p className="text-xs text-foreground">
                                {reviewRating}
                                ({reviewCount})
                            </p>
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <div className="relative px-2 py-1 w-fit border bg-pink-400 ">
                        <p className="text-lg font-semibold">
                            {formatCurrency(price)}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
} 


export const ProductCardSkeleton = () => {
    return (
        <div className="border rounded-md bg-background flex flex-col overflow-y-hidden h-full animate-pulse">
            <div className="relative aspect-square" >
                <div className="w-full h-full bg-foreground" />
            </div>

            <div className="flex-1 flex flex-col p-4 border-y gap-2">
                <div className="w-1/2 h-4 bg-foreground" />
                <div className="w-1/2 h-4 bg-foreground" />
            </div>
            <div className="p-4">
                <div className="w-1/2 h-4 bg-foreground" />
            </div>
        </div>
    )
}