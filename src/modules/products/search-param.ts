import { parseAsString, createLoader, parseAsArrayOf, parseAsStringLiteral } from "nuqs/server";

export const sortValue = ['curated', 'trending', 'hot_and_new']

const param = {
    sort: parseAsStringLiteral(sortValue).withDefault('curated'),
    minPrice: parseAsString
        .withOptions({
            clearOnDefault: true
        }).withDefault(""),
    maxPrice: parseAsString
        .withOptions({
            clearOnDefault: true
        }).withDefault(""),
    tags: parseAsArrayOf(parseAsString)
        .withOptions({
            clearOnDefault: true
        }).withDefault([]),
}
export const loaderProdcutFilters = createLoader(param)