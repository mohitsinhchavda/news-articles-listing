import { START_FETCHING_NEWS_LISTING } from '@/rest-apis/actions/newsListing';
import { useNewsListingSelector } from '@/rest-apis/selectors/newsListing';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import ArticlesListing from "../components/ArticlesListing";
import Pagination from '@/components/Pagination';
import { useFilters, usePagination } from '@/utils/hooks';
import FiltersMainContainer from '@/components/Filters/FiltersMainContainer';

const ArticleListingContainer = () => {

  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    dispatch({ type: START_FETCHING_NEWS_LISTING });
  }, []);

  const { isLoading, data: reduxData, errorMessage, isError } = useNewsListingSelector();

  // Filter related stuff
  const {
    filteredData,
    filters,
    setFilters,
    areAnyFiltersApplied,
  } = useFilters({
    reduxData
  });

  // Pagination stuff
  const {
    currentPage,
    paginatedData,
    setCurrentPage,
    totalPages
  } = usePagination({
    filteredData
  });

  return (
    <div className='container'>
      <div className='nav-main-container'>
        <FiltersMainContainer
          areAnyFiltersApplied={areAnyFiltersApplied}
          filters={filters}
          setFilters={setFilters}
        />
        <main className='main'>
          <ArticlesListing
            data={paginatedData}
            isLoading={isLoading}
            isError={isError}
            errorMessage={errorMessage}
          />
        </main>
      </div>
      <footer>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </footer>
    </div>
  );
};


export default ArticleListingContainer;