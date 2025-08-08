import { Checkbox } from "@/components/ui/checkbox";
import { DEFAULT_LIMIT } from "@/constants";
import { useTRPC } from "@/trpc/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";

interface Props {
    value?: string[] | null;
    onChange: (value: string[]) => void;
}

export const TagsFilter = ({ value, onChange }: Props) => {
    const trpc = useTRPC();
    const { data , isLoading , hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(trpc.tags.getMany.infiniteQueryOptions(
        {
            limit: DEFAULT_LIMIT
        },
        {
            getNextPageParam: (lastPage) => {
                return lastPage.docs.length > 0 ? lastPage.nextPage : undefined
            }
        }
    ));
    const onClick = (tag: string) => {
        if (value?.includes(tag)) {
            onChange(value?.filter((id) => id !== tag)); // remove
        } else {
            onChange([...(value||[]), tag]); // add
        }
    };
    return (
        <div className="flex flex-col gap-y-2">
            {isLoading ? (
                <div className="flex items-center justify-center">
                    <LoaderIcon className="animate-spin size-4" />
                </div>
            ):(
                data?.pages.map((page) => (
                    page.docs.map((tag) => (
                        <div
                        key={tag.id}
                        className="cursor-pointer flex items-center justify-between"
                        onClick={()=> onClick(tag.name)}
                        >
                            <p className="font-medium">{tag.name}</p>
                            <Checkbox
                             checked={value?.includes(tag.name)}
                             onCheckedChange={()=> onClick(tag.name)}
                            />
                        </div>
                    ))
                ))
            )}
            {hasNextPage && (
                    <button
                    disabled={isFetchingNextPage}
                    onClick={() => fetchNextPage()}
                    className="underline  justify-start text-start font-medium disabled:opacity-50 cursor-pointer"
                    >
                        {isFetchingNextPage ? 'Loading more...' : 'Load More'}
                    </button>
            )}
            
        </div>
    )
};