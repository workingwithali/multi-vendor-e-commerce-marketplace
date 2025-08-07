"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { PriceFilter } from "./price-filter";
import { useProductFilters } from "../../hooks/use-porduct-filters";
import { type } from "node:os";
import { TagsFilter } from "./tags-filter";

interface Props {
    title: string
    className?: string
    children: React.ReactNode
}
const ProductFilter = ({ title, className, children }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const Icons = isOpen ? ChevronDownIcon : ChevronRightIcon;
    return (
        <div className={cn("p-4 border-b flex flex-col gap-2", className)}>
            <div
                onClick={() => setIsOpen((current) => !current)}
                className="flex items-center justify-between cursor-pointer"
            >
                <p className="font-medium">{title}</p>
                <Icons className="size-4" />
            </div>
            {isOpen && children}
        </div>
    )
}
// 
export const ProductFilters = () => {
    const [filter, setFilter] = useProductFilters();
    const onChange = (key: keyof typeof filter, value: unknown) => {
        setFilter({ ...filter, [key]: value });
    };
    const hasAnyFilter = Object.entries(filter).some(([,value]) => {
        if (typeof value === "string") {
            return value !== "";
        }
        return value !== null;
    });
    const onClear = () => {
        setFilter({
            minPrice: "",
            maxPrice: "",
        });
    };
    return (
        <div className="border rounded-md bg-background">
            <div className="p-4 border-b flex items-center justify-between">
                <p className="font-medium">Filter</p>
                {hasAnyFilter && (
                    <button
                        className="underline cursor-pointer"
                        onClick={() => onClear()}
                        type="button">Clear
                    </button>
                )}
            </div>
            <ProductFilter title="Price">
                <PriceFilter
                    minPrice={filter.minPrice}
                    maxPrice={filter.maxPrice}
                    onMinPriceChange={(value) => onChange('minPrice', value)}
                    onMaxPriceChange={(value) => onChange('maxPrice', value)}
                />
            </ProductFilter>
            <ProductFilter title="Tags" className="border-b-0">
                <TagsFilter
                    value={filter.tags}
                    onChange={(value) => onChange('tags', value)}
                />
            </ProductFilter>


        </div>
    )
};
