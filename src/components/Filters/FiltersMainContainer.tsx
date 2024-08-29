import React, { useCallback } from 'react';
import { FilterGroup } from '@/utils';
import clsx from "clsx";
import { useMediaQuery } from 'react-responsive';
import FilterSvgIcon from '../common/FilterSvgIcon';
import Modal from 'react-responsive-modal';
import Filters from "./Filters";


interface FiltersProps {
  areAnyFiltersApplied: boolean;
  filters: FilterGroup[];
  setFilters: Function;
}


const FiltersMainContainer = ({ areAnyFiltersApplied, filters, setFilters }: FiltersProps) => {

  // responsive filters modal related stuff
  const [filterModalIsOpen, setFilterModalIsOpen] = React.useState(false);

  const onClickFiltersModalOpenerResponsive = useCallback(() => {
    setFilterModalIsOpen((filterModalIsOpen) => !filterModalIsOpen);
  }, []);

  const isTableOrMobile = useMediaQuery({
    query: '(max-width: 1024px)'
  });
  return (
    isTableOrMobile
      ?
      <>
        <nav className='responsive-nav'>
          <div className='responsive-filter filter-title' onClick={onClickFiltersModalOpenerResponsive}>
            <div className={clsx('responsive-filter-title', {
              'responsive-filters-applied-text': areAnyFiltersApplied
            })}>
              {areAnyFiltersApplied ? "Filters are applied" : "Filters"}
            </div>
            <FilterSvgIcon isActive={areAnyFiltersApplied} />
          </div>
          <Modal open={filterModalIsOpen} onClose={() => setFilterModalIsOpen(false)} center classNames={{ modal: 'responsive-filter-modal-root' }}>
            <Filters filters={filters} setFilters={setFilters} />
          </Modal>
        </nav>
      </>
      :
      <nav className='nav'>
        <Filters filters={filters} setFilters={setFilters} />
      </nav>
  );
};


export default FiltersMainContainer;