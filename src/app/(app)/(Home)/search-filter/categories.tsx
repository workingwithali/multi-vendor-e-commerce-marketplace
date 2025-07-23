import { Category } from "@/payload-types";
import { CategoryDropdown } from "@/app/(app)/(Home)/search-filter/category-dropdown";

interface Props {
    data: any;
}

export const Categories = ({ data }: Props) => {
    return (
        <div>
            {data.map((category: Category) => (
                <div key={category.id} >
                    <CategoryDropdown
                    category={category}
                    isActive={false} // Replace with actual logic to determine if active
                    isNavigationHovered={false} // Replace with actual logic if needed
                     />
                </div>
            ))}
        </div>
    );
}