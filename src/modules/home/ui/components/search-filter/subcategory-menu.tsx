import { cn } from "@/lib/utils";
import { categoriesGetManyOutput } from "@/modules/categories/types";
import { Category } from "@/payload-types";
import Link from "next/link";

interface Props {
    category: categoriesGetManyOutput[1];
    isOpen: boolean;
}

export const SubcategoryMenu = ({
    category,
    isOpen,
}: Props) => {
    if (!isOpen || !category.subcategories || category.subcategories.length === 0) {
        return null;
    }
    const backgroundColor = category.color || "#F5F5F5"; // Default to white if no color is set

    return (
        <div
            className="absolute z-10"
            style={{ top: '100%' , left: 0 }}
        >
            {/* Spacer to position dropdown below the trigger */}
            <div className="h-3 w-60" />

            <div
                style={{ backgroundColor }}
                className={cn(
                    "w-60 rounded-md overflow-hidden text-foreground",
                    "border border-foreground hover:border-primary", // ✅ Added border, removed shadow
                    "-translate-x-[2px] -translate-y-[2px]"
                )}
            >
                <div className="flex flex-col">
                    {category.subcategories?.map((subcategory: Category) => (
                        <Link
                            key={subcategory.slug}
                            href={`/${category.slug}/${subcategory.slug}`}
                            className={cn(
                                "w-full px-4 py-3 text-left flex items-center justify-between font-medium underline text-black",
                                "hover:bg-foreground hover:text-background transition-colors duration-200"
                            )}
                        >
                            {subcategory.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>

    );
}