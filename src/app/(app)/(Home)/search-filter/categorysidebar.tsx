
import { ScrollArea } from "@/components/ui/scroll-area";
import { CustomerCategory } from "../types";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    data: CustomerCategory[];
}
export const CategoriesSidebar = ({ open, setOpen, data }: Props) => {
    const  router = useRouter();
    const [parentCategory, setParentCategory] = useState<CustomerCategory[] | null>(null);
    const [selectCategory, setSelectCategory] = useState<CustomerCategory | null>(null);
    const currentCategory = parentCategory ??data ?? [];
    const handleOpenChange = (open: boolean) => {
        setOpen(open);
        setParentCategory(null);
        setSelectCategory(null);
    };
    const handleCategoryClick = (category: CustomerCategory) => {
        if (category.subcategories && category.subcategories.length > 0) {
            setParentCategory(category.subcategories as CustomerCategory[]);
            setSelectCategory(category);
        } else {
            if(parentCategory && selectCategory) {
                router.push(`/${selectCategory.slug}/${category.slug}`);
            }else {
                if (category.slug === "all") {
                    router.push("/");
                }else {
                    router.push(`/${category.slug}`);
                }
            }
            handleOpenChange(false);
        }
    };
    const handBackClick = () => {
        if (parentCategory) {
            setParentCategory(null);
            setSelectCategory(null);
        }
    };
    const backgroundColor = selectCategory?.color || "background"; // Define your background color here
    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetContent side="left" className="p-0 transition-none" style={{ backgroundColor: backgroundColor }}>
                <SheetHeader className="p-4 border-b border-foreground">
                    <SheetTitle>Categories</SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex flex-col h-full overflow-y-auto pb-2">
                    {parentCategory && (
                        <Button
                            className="w-full text-left px-4 hover:bg-foreground hover:text-background flex items-center text-base font-medium cursor-pointer"
                            onClick={() => {handBackClick()}}
                        >
                            <ChevronLeftIcon className="size-4 mr-2" />
                            Back
                        </Button>
                    )}
                    {currentCategory.map((category) => (
                        <Button
                            key={category.slug}
                            onClick={() => handleCategoryClick(category)}
                            className="w-full text-left px-4 hover:bg-foreground hover:text-background flex items-center justify-between text-base font-medium cursor-pointer "
                        >
                            {category.name}
                            {category.subcategories && category.subcategories.length > 0 && (
                                <ChevronRightIcon className="size-4" />   
                            )}
                        </Button>
                    ))}
                </ScrollArea>
            </SheetContent>
        </Sheet>

    )
}