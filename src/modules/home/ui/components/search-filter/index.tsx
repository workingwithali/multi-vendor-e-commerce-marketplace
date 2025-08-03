"use client";
import { Categories } from "@/modules/home/ui/components/search-filter/categories";
import { SearchInput } from "@/modules/home/ui/components/search-filter/search-input";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";




export const SearchFilter = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

    return (
        <div className="px-4 lg:px-12 py-8 flex flex-col gap-4 border-b w-full"
            style={{ backgroundColor: "Background" }}
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