import { SearchInput } from "@/app/(app)/(Home)/search-filter/search-input";
import { Categories } from "@/app/(app)/(Home)/search-filter/categories";


interface Props {
    data: any;
}
export const SearchFilter = ( { data }: Props) => {


    return (
        <div className="px-4 lg:px-12 py-8 flex flex-col gap-4 border-b w-full">
            <SearchInput disabled={false} />
            <Categories data={data} />
            
            
        </div>
    )
}