"use client";
import { CategoryDropdown } from "@/app/(app)/(Home)/search-filter/category-dropdown";
import { CustomerCategory } from "../types";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
interface Props {
    data: CustomerCategory[];
}

export const Categories = ({ data }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const measureRef = useRef<HTMLDivElement>(null);
    const viewAllRef = useRef<HTMLDivElement>(null);

    const [visibleCount, setVisibleCount] = useState(data.length);
    const [isAnyHovered, setIsAnyHovered] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const activeCategory = "all";

    const activeCategoryIndex = data.findIndex((category) => category.slug === activeCategory);
    const isActiveCategoryHidden = activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1;

    useEffect(() => {
        const calulateVisibleCount = () => {
            if (!containerRef.current || !measureRef.current || !viewAllRef.current) return;

            const containerWidth = containerRef.current.offsetWidth;
            const viewAllWidth = viewAllRef.current.offsetWidth;
            const availableWidth = containerWidth - viewAllWidth;

            const items = Array.from(containerRef.current.children);
            let totalWidth = 0;
            let visible = 0;
            for (const item of items) {
                const width = item.getBoundingClientRect().width;
                if (totalWidth + width > availableWidth) break;
                totalWidth += width;
                visible++;
            }
            setVisibleCount(visible);
        }
        const resizeObserver = new ResizeObserver(calulateVisibleCount)
        resizeObserver.observe(containerRef.current!);
        return () => {
            resizeObserver.disconnect();
        }

    }, [data.length]);

    return (
        // hidden
        <div className="relative w-full">
            <div
                ref={measureRef}
                className="absolute opacity-0 pointer-events-none flex"
                style={{ position: "fixed", left: "-9999", top: "-9999" }}
            >
                {data.map((category) => (
                    <div key={category.id} className="mr-2" >
                        <CategoryDropdown
                            category={category}
                            isActive={activeCategory === category.slug}
                            isNavigationHovered={false}
                        />
                    </div>
                ))}
            </div>

            {/* visible */}
            <div
                ref={containerRef}
                className="flex flex-nowrap items-center"
                onMouseEnter={() => setIsAnyHovered(true)}
                onMouseLeave={() => setIsAnyHovered(false)}
            >
                {data.slice(0, visibleCount).map((category) => (
                    <div key={category.id} className="mr-2" >
                        <CategoryDropdown
                            category={category}
                            isActive={activeCategory === category.slug}
                            isNavigationHovered={isAnyHovered}
                        />
                    </div>
                ))}
            </div>
            <div
                ref={viewAllRef}
                className="shrink-0"
            >
                <Button
                    className={cn(
                        "h-9 px-3 py-1.5 rounded-full text-sm font-medium",
                        "bg-transparent border border-transparent text-foreground",
                        "hover:border-primary hover:bg-background hover:text-foreground",
                        // Apply these if active and hovered
                        isActiveCategoryHidden && isAnyHovered && "border-primary bg-background shadow",
                    )}
                >View All</Button>
            </div>
        </div>
    );
}