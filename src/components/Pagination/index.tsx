import clsx from 'clsx';
import React, { useCallback, useEffect, useMemo } from 'react';


interface PaginationProps {
    totalPages?: number[];
    currentPage?: number;
    setCurrentPage: Function
}

const Pagination = ({ totalPages, setCurrentPage, currentPage }: PaginationProps) => {

    const onClickPageBtn = useCallback((page: number) => {
        setCurrentPage(() => page);
    }, [setCurrentPage]);

    const isFirstPage = useMemo(() => currentPage === 1, [currentPage]);
    const isLastPage = useMemo(() => currentPage === totalPages?.length, [currentPage, totalPages?.length]);

    const onClickPrevBtn = useCallback(() => {
        if (!isFirstPage){
            setCurrentPage((prev: number) => prev - 1);
        }
    }, [isFirstPage]);

    const onClickNextBtn = useCallback(() => {
        if (!isLastPage) {
            setCurrentPage((prev: number) => prev + 1);
        }
    }, [isLastPage]);

    return (
        totalPages?.length && totalPages?.length > 0
        ?
        <div className='pagination-buttons'>
            <div
                onClick={onClickPrevBtn}
                aria-disabled={isFirstPage}
                className={clsx({ 'disabled-pagination-btn': isFirstPage }, "pagination-button")}>
                &lt;
            </div>
            {
                totalPages?.map(
                    (page: number) => (
                        <div
                            key={page}
                            className={
                                clsx({
                                    "active-pagination-button": currentPage === page,
                                    'pagination-button': currentPage !== page
                                })
                            }
                            onClick={(): void => onClickPageBtn(page)}>{page}</div>
                    )
                )
            }
            <div
                onClick={onClickNextBtn}
                aria-disabled={isLastPage}
                className={clsx({ 'disabled-pagination-btn': isLastPage }, "pagination-button")}>
                &gt;
            </div>
        </div>
        :
        null
    );
};


export default Pagination;