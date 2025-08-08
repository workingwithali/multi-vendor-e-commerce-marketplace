import { parseAsString, createLoader, parseAsArrayOf } from "nuqs/server";
const param = {
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
export const loaderProdcutFilters = createLoader(param)