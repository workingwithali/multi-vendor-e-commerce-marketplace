import {  useQueryStates  } from "nuqs";
import { parseAsString, createLoader, parseAsArrayOf } from "nuqs/server";

export const param = {
    minPrice: parseAsString
        .withOptions({
            clearOnDefault: true
        }),
    maxPrice: parseAsString
        .withOptions({
            clearOnDefault: true
        }),
    tags: parseAsArrayOf(parseAsString)
        .withOptions({
            clearOnDefault: true
        }),
}

export const useProductFilters = () => {
    return useQueryStates(param)
} 

export const loaderProdcutFilters = createLoader(param)