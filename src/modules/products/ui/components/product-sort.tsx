"use client"
import { Button } from "@/components/ui/button"
import { useProductFilters } from "../../hooks/use-porduct-filters"
import { cn } from "@/lib/utils"
export const ProductSort = () => {
    const [filters, setFilters] = useProductFilters()
    return (
        <div className="flex items-center gap-2">
            <Button
             size="sm"
             variant="ghostOutline"
             className={cn(
                 "rounded-full ",
                 filters.sort == "curated" && "bg-foreground text-background"
             )}
             onClick={() => setFilters({ sort: "curated" })}
            >
                Curated
            </Button>
            <Button
             size="sm"
             variant="ghostOutline"
             className={cn(
                 "rounded-full",
                 filters.sort == "trending" && "bg-foreground text-background"
             )}
             onClick={() => setFilters({ sort: "trending" })}
            >
                Trending
            </Button>
            <Button
             size="sm"
             variant="ghostOutline"
             className={cn(
                 "rounded-full ",
                 filters.sort == "hot_and_new" && "bg-foreground text-background"
             )}
             onClick={() => setFilters({ sort: "hot_and_new" })}
            >
                Hot & New
            </Button>
        </div>
    )
}