import { useQueryStates  } from "nuqs";
import { parseAsString ,createLoader } from "nuqs/server";

export const param = {
    minPrice: parseAsString
        .withOptions({
            clearOnDefault: true
        }),
    maxPrice: parseAsString
        .withOptions({
            clearOnDefault: true
        })
}

export const useProductFilters = () => {
    return useQueryStates(param)
} 

export const loaderProdcutFilters = createLoader(param)