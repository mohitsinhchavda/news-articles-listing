import React from 'react';


interface FilterTitleProps {
    name: string
}


const FilterTitle = ({ name }: FilterTitleProps) => {
    return (
        <div className='filter-title'>
            {name}
        </div>
    );
};


export default FilterTitle;