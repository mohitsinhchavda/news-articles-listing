import React from 'react';
import { FilterGroup } from '@/utils';
import FilterTitle from './FilterTitle';
import CheckboxContainer from './CheckboxContainer';


interface FiltersProps {
    setFilters: Function;
    filters: FilterGroup[];
}


const Filters = ({ filters = [], setFilters }: FiltersProps) => {
    return (
        <div className='filters'>
            {
                filters?.map((filters: any, index: number) => {
                    return (
                        <div key={`${filters.name}${index}`}>
                            <div>
                                <FilterTitle name={filters.name.label} />
                            </div>
                            <div className='checkboxes-container'>
                                {
                                    filters?.data?.map((checkboxItem: any, index: number) => {
                                        return (
                                            <CheckboxContainer
                                                key={`${checkboxItem.label}`}
                                                label={checkboxItem.label}
                                                isChecked={checkboxItem.isChecked}
                                                setFilters={setFilters}
                                                filterTypeDataNameLabel={filters.name.label}
                                                isAscFlagExists={"isAsc" in checkboxItem}
                                                isAsc={checkboxItem.isAsc}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};


export default Filters;