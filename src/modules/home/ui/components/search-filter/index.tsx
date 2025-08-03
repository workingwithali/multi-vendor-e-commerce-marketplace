"use client";
import { Categories } from "@/modules/home/ui/components/search-filter/categories";
import { SearchInput } from "@/modules/home/ui/components/search-filter/search-input";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";




export const SearchFilter = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
    const params = useParams();
    const categoryParam = params.category as string | undefined;
    const activeCategory = categoryParam || "all";
    const activeCategoryData = data.find((category) => category.slug === activeCategory);
    const activeCategoryColor = activeCategoryData?.color || 'background';
    const activeCategoryName = activeCategoryData?.name || null;
    const subcategoryParam = params.subcategory as string | undefined;
    

    return (
        <div className="px-4 lg:px-12 py-8 flex flex-col gap-4 border-b w-full"
            style={{ backgroundColor: activeCategoryColor }}
        >
            <SearchInput />
            <div className="hidden lg:block">
                <Categories data={data} />
            </div>
        </div>
    )
}

export const SecrchFilterLoading = () => {
    return (
        <div className="px-4 lg:px-12 py-8 flex flex-col gap-4 border-b w-full"
            style={{ backgroundColor: "Background" }}
        >
            <SearchInput disabled />
            <div className="hidden lg:block">
                <div className="h-9" />
            </div>
        </div>
    )
}