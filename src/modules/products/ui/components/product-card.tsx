import Image from "next/image";
import Link from "next/link";



interface ProductCardProps {
    id: string;
    name: string;
    imageUrl?: string | null;
    anuthorUserName: string;
    anuthorImageUrl?: string | null;
    reviewRating: number;
    reviewCount: number;
    price: number;
}


export const ProductCard = ({
    id, 
    name, 
    imageUrl, 
    anuthorUserName, 
    anuthorImageUrl, 
    reviewRating, 
    reviewCount, 
    price
}: ProductCardProps
) => {
    return (
        <Link href="/">
            <div className="border rounded-md bg-background flex flex-col overflow-y-hidden h-full ">
                <div className="relative aspect-square" >
                    <Image
                        src={imageUrl || ""}
                        alt={name}
                        fill
                        className="object-cover"
                    />
                </div>

            </div>
        </Link>
)} 