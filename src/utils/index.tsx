import { Article } from "@/rest-apis/reducers/types";
import { Temporal } from "@js-temporal/polyfill";

enum MainFilterLabels { "Category" = "Category", "Author" = "Author", "SortBy" = "SortBy" };

export const mainFilters = [{ label: MainFilterLabels.Category }, { label: MainFilterLabels.Author }, { label: MainFilterLabels.SortBy }] as const;
type MainFilterTypeLabel = (typeof mainFilters)[number]["label"];
type MainFilterType = (typeof mainFilters)[number];

export enum SortByLabels { "Date" = "Date", "Title" = "Title" };

export const sortByFilters = [
    { label: SortByLabels.Date, isChecked: true, isAsc: true },
    { label: SortByLabels.Title, isChecked: false, isAsc: false }
] as const;
export type SortBySubFilterType = (typeof sortByFilters)[number];

export interface FilterItem {
    label: string;
    isChecked: boolean;
    isAsc?: boolean;
}

function filterCategoriesList(data: Article[]): FilterItem[] {
    return [...new Set([...data.map((article: Article) => article.source)])].map((source: string) => ({
        label: source,
        isChecked: false
    }));
}

function filterAuthorsList(data: Article[]): FilterItem[] {
    return [...new Set([...data.map((article: Article) => article.author)])].map((source: string) => ({
        label: source,
        isChecked: false
    }));
}

export interface FilterGroup {
    name: MainFilterType;
    data: FilterItem[];
}

// Correctly type the Map to hold arrays of SortBySubFilterType or a function
// which gives the list of categories to be included in the filters
const filterTypeToSubFiltersMapper = new Map<MainFilterTypeLabel, SortBySubFilterType[] | unknown>([
    [MainFilterLabels.Category, filterCategoriesList],
    [MainFilterLabels.Author, filterAuthorsList],
    [MainFilterLabels.SortBy, Array.from(sortByFilters)],
]);

// Map MainFilterLabels to a property of Article type
export const filterLabelToArticleFieldMapper = new Map<MainFilterTypeLabel | SortByLabels, keyof Article>([
    [MainFilterLabels.Category, "source"],
    [MainFilterLabels.Author, "author"],
    [SortByLabels.Date, "date"],
    [SortByLabels.Title, "title"],
]);

export const derivedFilterData = (data: Article[]): FilterGroup[] => {
    if (mainFilters.length && data.length > 0) {
        return mainFilters.map((filterType: MainFilterType) => {
            const filters = filterTypeToSubFiltersMapper.get(filterType.label);
            let filterDataInterim: FilterItem[] = [];

            if (typeof filters === 'function') {
                filterDataInterim = filters(data) as FilterItem[];
            } else if (Array.isArray(filters)) {
                filterDataInterim = filters as FilterItem[];
            }

            return {
                name: filterType,
                data: filterDataInterim
            };
        });
    } else {
        return [];
    }
};


// dynamicity refers to data requires in the filter
// comes from API
export function isDynamicFilter(item: FilterGroup): boolean {
    return Boolean(filterLabelToArticleFieldMapper.get(item.name.label));
}

export function formatDateForListing(date: string) {
    try {
        const parsedDate = Temporal.PlainDate.from(date);
        const formattedDate = `${parsedDate.toLocaleString('en-US', { month: 'long' })} ${parsedDate.day}, ${parsedDate.year}`;
        return formattedDate;
    } catch (error) {
        return "";
    }
}

export function pipeline(...functions: any) { 
    const functionsModified = functions.slice(0,functions.length - 1);
    const arg = functions[functions.length - 1];
    return functionsModified.reduce((acc : any, func: any) => {
        return func.call(undefined, acc)
    }, arg);
}

export const decodeHtmlEntities = (text: string): string => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  };


// cleans the string by removing special characters
export const cleanString = (str: string): string => {
    return str.replace(/[^a-zA-Z0-9\s]/g, '');
};