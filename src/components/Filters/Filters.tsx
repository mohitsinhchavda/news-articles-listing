import React from 'react';
import { FilterGroup, FilterItem } from '@/utils';
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
                filters?.map((filter: FilterGroup, index: number) => {
                    return (
                        <div key={`${filter.name}${index}`}>
                            <div>
                                <FilterTitle name={filter.name.label} />
                            </div>
                            <div className='checkboxes-container'>
                                {
                                    filter?.data?.map((checkboxItem: FilterItem) => {
                                        return (
                                            <CheckboxContainer
                                                key={`${checkboxItem.label}`}
                                                label={checkboxItem.label}
                                                isChecked={checkboxItem.isChecked}
                                                setFilters={setFilters}
                                                filterTypeDataNameLabel={filter.name.label}
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