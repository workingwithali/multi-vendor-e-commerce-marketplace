"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Adjust path as needed
import { categoriesGetManyOutput } from "@/modules/categories/types";
import Link from "next/link";
import { useRef, useState } from "react";
import { SubcategoryMenu } from "./subcategory-menu";

interface Props {
    category: categoriesGetManyOutput[1];
    isActive: boolean;
    isNavigationHovered: boolean;
}

export const CategoryDropdown = ({
    category,
    isActive,
    isNavigationHovered,
}: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const onMouseEnter = () => {
        if (category.subcategories) {
            setIsOpen(true);
        }
    };
    const onMouseLeave = () => setIsOpen(false);
    // const toggleDropdown = () => {
    //     if (category.subcategories?.docs?.length) {
    //         setIsOpen(!isOpen);
    //     }
    // };

    return (

        <div
            ref={dropdownRef}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="relative"
        // onClick={toggleDropdown}
        >
            <div className="relative">
                <Button
                    className={cn(
                        "h-9 px-3 py-1.5 rounded-full text-sm font-medium",
                        "bg-transparent border border-transparent text-foreground",
                        "hover:border-foreground hover:shadow-foreground hover:bg-background hover:text-foreground",
                        // Apply these if active and hovered
                        isActive && isNavigationHovered && "border-foreground bg-background shadow-foreground",
                        isOpen && "border-foreground bg-background shadow-foreground",
                    )}


                >
                    <Link
                        href={`/${category.slug == "all" ? "" : category.slug}`}
                    >
                        {category.name}
                    </Link>
                </Button>

                {category.subcategories && category.subcategories.length > 0 && (
                    <div className={cn(
                        "opacity-0 absolute w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px]",
                        "border-l-transparent border-r-transparent border-b-foreground",
                        "left-1/2 transform -translate-x-1/2",
                        isOpen && "opacity-100"
                    )} />

                )}
            </div>
            <SubcategoryMenu
                category={category}
                isOpen={isOpen}
            />
        </div>
    );
};
