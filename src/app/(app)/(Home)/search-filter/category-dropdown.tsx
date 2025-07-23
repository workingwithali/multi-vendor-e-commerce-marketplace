"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Adjust path as needed
import { Category } from "@/payload-types";
import { useState, useRef } from "react";

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
    const onMouseEnter = () => {
        setIsOpen(true);
    };
    const onMouseLeave = () => {
        if (category.subcategories) {
            setIsOpen(false);
        }
    };
    return (

        <div
            ref={dropdownRef}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="relative "
        >
            <Button
                variant="outline"
                className={cn(
                    "h-11 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    "bg-transparent border border-transparent text-foreground",
                    "hover:bg-muted hover:border-primary",
                    {
                        "bg-background text-foreground": isActive && isNavigationHovered,
                    }
                )}
            >
                {category.name}
            </Button>
        </div>
    );
};
