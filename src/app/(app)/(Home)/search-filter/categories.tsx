
import { CategoryDropdown } from "@/app/(app)/(Home)/search-filter/category-dropdown";
import { CustomerCategory } from "../types";

interface Props {
    data: CustomerCategory[];
}

export const Categories = ({ data }: Props) => {
    return (
        <div className="relative w-full">
            <div className="flex flex-nowrap items-center">
                {data.map((category) => (
                    <div key={category.id} className="mr-2" >
                        <CategoryDropdown
                            category={category}
                            isActive={true} 
                            isNavigationHovered={false}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}