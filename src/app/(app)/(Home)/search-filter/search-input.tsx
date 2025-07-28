"use client";
import { Input } from "@/components/ui/input";
import { ListFilterIcon, SearchIcon } from "lucide-react";
import { CustomerCategory } from "../types";
import { CategoriesSidebar } from "@/app/(app)/(Home)/search-filter/categorysidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
interface Props {
    disabled?: boolean;
    data: CustomerCategory[];
}
export const SearchInput = ({ 
    disabled,
    data
 }: Props) => {
     const [open, setOpen] = useState(false);
    return (
        <div className="flex items-center gap-2 w-full">
            <CategoriesSidebar data={data} open={open} setOpen={setOpen} />
            <div className="relative w-full">
                <SearchIcon className="absolute top-1/2 left-3 -translate-y-1/2 size-4 text-muted-foreground"/>
                <Input className="pl-10 py-6" placeholder="Search Product" disabled={disabled}/>
            </div>
            <Button
                className="size-12 shrink-0 flex lg:hidden border rounded-md"
                variant="default"
                onClick={() => setOpen(true)}
            >
                <ListFilterIcon/>
            </Button>
        </div>
    );
};