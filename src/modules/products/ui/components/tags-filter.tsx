import { DEFAULT_LIMIT } from "@/constants";
import { useTRPC } from "@/trpc/client";
import { useInfiniteQuery } from "@tanstack/react-query";

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
    return (
        <div className="flex flex-col gap-y-2">

        </div>
    )
};