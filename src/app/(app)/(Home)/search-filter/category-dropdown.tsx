"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Adjust path as needed
import { Category } from "@/payload-types";
import { useState, useRef } from "react";
import { useDropdownPosition } from "./use-dropdown-position";
import { SubcategoryMenu } from "./subcategory-menu";

interface Props {
    category: Category;
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
    const { getDropdownPosition } = useDropdownPosition(dropdownRef);
    const onMouseEnter = () => {
        if (category.subcategories) {
            setIsOpen(true);
        }
    };
    const onMouseLeave = () => setIsOpen(false);
    const dropdownPosition = getDropdownPosition();

    return (

        <div
            ref={dropdownRef}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="relative"
        >
            <div className="relative">
                <Button
                    className={cn(
                        // Base layout and animation
                        "h-9 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                        // Default state: transparent background & no border
                        "bg-transparent border border-foreground text-foreground",
                        // Hover: show primary border + subtle background + shadow
                        "hover:border-primary hover:bg-muted",
                        // Conditional active/hovered state
                        isActive && isNavigationHovered && ("border-primary bg-muted shadow"),
                    )}

                >
                    {category.name}
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
                Position={dropdownPosition}
            />
        </div>
    );
};
