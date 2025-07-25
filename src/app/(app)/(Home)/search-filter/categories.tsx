import { Category } from "@/payload-types";
import { CategoryDropdown } from "@/app/(app)/(Home)/search-filter/category-dropdown";

interface Props {
    data: any;
}

export const Categories = ({ data }: Props) => {
    return (
        <div className="relative w-full">
            <div className="flex flex-nowrap items-center">
                {data.map((category: Category) => (
                    <div key={category.id} className="mr-2" >
                        <CategoryDropdown
                            category={category}
                            isActive={false} 
                            isNavigationHovered={false}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}