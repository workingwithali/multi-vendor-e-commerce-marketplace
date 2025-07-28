import { Category } from "@/payload-types"

export type CustomerCategory  = Category & {
    subcategories : Category[];
};