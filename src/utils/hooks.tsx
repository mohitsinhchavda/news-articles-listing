import React, { useEffect, useMemo, useState } from "react";
import {
    cleanString,
    decodeHtmlEntities,
    derivedFilterData,
    FilterGroup,
    filterLabelToArticleFieldMapper,
    isDynamicFilter,
    pipeline,
    SortByLabels,
    SortBySubFilterType
} from ".";
import { Article } from "@/rest-apis/reducers/types";
import DOMPurify from "dompurify";
import { PaginationConstants } from "./pagination";

export interface useFiltersArgs {
    reduxData: Article[]
}

interface useFiltersReturnType {
    filters: FilterGroup[];
    filteredData: Article[];
    setFilters: Function;
    areAnyFiltersApplied: boolean;
}

export const useFilters = ({ reduxData }: useFiltersArgs): useFiltersReturnType => {
    const [filters, setFilters] = React.useState<FilterGroup[]>([]);

    useEffect(() => {
        setFilters(derivedFilterData(reduxData));
    }, [reduxData]);

    const appliedFilters = useMemo(() => {
        return filters.map(filterItem => {
            const { data } = filterItem;
            const appliedSubFilters = (data as SortBySubFilterType[]).filter((d: SortBySubFilterType) => d.isChecked);

            if (appliedSubFilters.length) {
                return {
                    ...filterItem,
                    data: [...appliedSubFilters]
                };
            }
            return undefined; // Explicitly return undefined when no sub-filters are applied
        }).filter((filterItem): filterItem is Exclude<typeof filterItem, undefined> => filterItem !== undefined)
    }, [filters]);

    const areAnyFiltersApplied = useMemo(() => Boolean(appliedFilters?.length > 0), [appliedFilters]);


    const filteredData = useMemo(() => {
        let filteredNewsListingData: Article[] = [...reduxData];

        if (appliedFilters.length !== 0) {
            filteredNewsListingData = filteredNewsListingData.filter((newsArticle: Article) => {
                const dynamicAppliedFilters = appliedFilters.filter((appliedFilter: FilterGroup) => isDynamicFilter(appliedFilter));
                if (dynamicAppliedFilters.length) {
                    return dynamicAppliedFilters.every(dynamicFilter => {
                        const articleField = filterLabelToArticleFieldMapper.get(dynamicFilter.name.label) as keyof Article;
                        const articleFieldVal = newsArticle[articleField].toLocaleLowerCase();
                        return dynamicFilter.data.some(filters => articleFieldVal.includes(filters.label.toLocaleLowerCase()));
                    });
                } else {
                    return true;
                }
            });

            const staticAppliedFilters = appliedFilters.filter((appliedFilter: FilterGroup) => !isDynamicFilter(appliedFilter));
            if (staticAppliedFilters.length) {
                filteredNewsListingData = [...filteredNewsListingData.sort((a, b) => {
                    const dateKey = filterLabelToArticleFieldMapper.get(SortByLabels.Date) as keyof Article;
                    const dateA = new Date(a[dateKey]);
                    const dateB = new Date(b[dateKey]);

                    let isDateAsc: boolean | undefined;

                    const dateFilterObj = (staticAppliedFilter: FilterGroup) => { return staticAppliedFilter.data.find(data => data.label === SortByLabels.Date) };
                    const isDateFilterApplied = staticAppliedFilters.find((staticAppliedFilter: FilterGroup): boolean => {
                        isDateAsc = dateFilterObj(staticAppliedFilter)?.isAsc;
                        return Boolean(dateFilterObj(staticAppliedFilter))
                    });

                    if (isDateFilterApplied) {
                        // Latest
                        if (isDateAsc) {
                            if (dateA > dateB) return -1;
                            if (dateA < dateB) return 1;
                        }
                        else {
                            // Oldest
                            if (dateA < dateB) return -1;
                            if (dateA > dateB) return 1;
                        }
                    }

                    let isTitleAsc: boolean | undefined;

                    const titleFilterObj = (staticAppliedFilter: FilterGroup) => { return staticAppliedFilter.data.find(data => data.label === SortByLabels.Title) };

                    const titleKey = filterLabelToArticleFieldMapper.get(SortByLabels.Title) as keyof Article;
                    if (staticAppliedFilters.find(staticAppliedFilter => {
                        isTitleAsc = titleFilterObj(staticAppliedFilter)?.isAsc
                        return Boolean(titleFilterObj(staticAppliedFilter))
                    })) {
                        const titleA = pipeline(decodeHtmlEntities, DOMPurify.sanitize, cleanString, a[titleKey]).toLocaleLowerCase()
                        const titleB = pipeline(decodeHtmlEntities, DOMPurify.sanitize, cleanString, b[titleKey]).toLocaleLowerCase()
                        if (isTitleAsc) {
                            // ascending
                            if (titleA < titleB) return -1;
                            if (titleA > titleB) return 1;
                        }
                        else {
                            // descending
                            if (titleA > titleB) return -1;
                            if (titleA < titleB) return 1;
                        }
                    }

                    return 0;
                })];
            }
        }

        return filteredNewsListingData;
    }, [reduxData, filters, appliedFilters]);

    return {
        filteredData,
        filters,
        setFilters,
        areAnyFiltersApplied
    }
}



interface usePaginationArgs {
    filteredData: Article[],
}

interface usePaginationReturnType {
    currentPage: number,
    paginatedData: Article[],
    setCurrentPage: Function,
    totalPages: number[] | undefined,
}

export const usePagination = ({ filteredData }: usePaginationArgs): usePaginationReturnType => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [paginatedData, setPaginatedData] = React.useState<Article[]>([]);
    const [totalPages, setTotalPages] = useState<number[]>();

    useEffect(() => {
        setPaginatedData(() => filteredData.slice((currentPage - 1) * PaginationConstants.PerPageItems, currentPage * PaginationConstants.PerPageItems));
        setTotalPages(() => {
            const totalPages = Math.ceil(filteredData.length / PaginationConstants.PerPageItems);
            return Array.from({ length: totalPages }, (_, index) => index + 1);
        });
    }, [filteredData, currentPage]);

    return {
        currentPage,
        paginatedData,
        setCurrentPage,
        totalPages
    }
}