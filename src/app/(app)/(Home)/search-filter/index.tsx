import { SearchInput } from "@/app/(app)/(Home)/search-filter/search-input";
import { Categories } from "@/app/(app)/(Home)/search-filter/categories";
import { CustomerCategory } from "../types";


interface Props {
    data: CustomerCategory[];
}
export const SearchFilter = ( { data }: Props) => {


    return (
        <div className="px-4 lg:px-12 py-8 flex flex-col gap-4 border-b w-full">
            <SearchInput data={data} disabled={false} />
            <div className="hidden lg:block">
            <Categories data={data} />
            </div>            
        </div>
    )
}