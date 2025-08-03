"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoriesSidebar } from "@/modules/home/ui/components/search-filter/categorysidebar";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
interface Props {
    disabled?: boolean;
}
export const SearchInput = ({
    disabled,
}: Props) => {
    const [open, setOpen] = useState(false);
    const trpc = useTRPC();
    const session = useQuery(trpc.auth.session.queryOptions());
    return (
        <div className="flex items-center gap-2 w-full">
            <CategoriesSidebar open={open} setOpen={setOpen} />
            <div className="relative w-full">
                <SearchIcon className="absolute top-1/2 left-3 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input className="pl-10 py-6 bg-background" placeholder="Search Product" disabled={disabled} />
            </div>
            <Button
                className="py-6 size-12 shrink-0 flex bg-background border-foreground lg:hidden border rounded-md"
                variant="default"
                onClick={() => setOpen(true)}
            >
                <ListFilterIcon />
            </Button>
            {session.data?.user && (
                <Button
                    asChild
                    variant="default"
                    className="py-6 border-foreground shrink-0 flex  border rounded-md"
                >
                    <Link href="/libary">
                        <BookmarkCheckIcon />
                        Libary
                    </Link>
                </Button>
            )}
        </div>
    );
};