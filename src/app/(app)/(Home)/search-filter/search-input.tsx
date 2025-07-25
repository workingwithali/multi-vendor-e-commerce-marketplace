import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface Props {
    disabled?: boolean;
}
export const SearchInput = ({ disabled }: Props) => {
    return (
        <div className="flex items-center gap-2 w-full">
            <div className="relative w-full">
                <SearchIcon className="absolute top-1/2 left-3 -translate-y-1/2 size-4 text-muted-foreground"/>
                <Input className="pl-10 py-6" placeholder="Search Product" disabled={disabled}/>
            </div>
            
        </div>
    );
};