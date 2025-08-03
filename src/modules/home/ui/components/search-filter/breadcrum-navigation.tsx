import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";


interface Props {
    activeCategory: string | null;
    activeCategoryName: string | null;
    activeSubcategoryName: string | null;
}

export const BreadcrumNavigation = ({
    activeCategory,
    activeCategoryName,
    activeSubcategoryName
}: Props) => {
    if (activeCategory == "all" || !activeCategoryName) return null
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {activeSubcategoryName ? (
                    <>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild className="text-xl font-medium underline text-foreground">
                                <Link href={`/${activeCategory}`}>{activeCategoryName}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-xl text-foreground font-medium">
                        /
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbPage  className="text-xl font-medium ">
                                {activeSubcategoryName}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </>
                ):(
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-xl font-medium">
                                {activeCategoryName}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
