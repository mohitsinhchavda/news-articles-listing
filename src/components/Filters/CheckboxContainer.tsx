import React, { useCallback } from 'react';
import { FilterGroup, FilterItem } from "../../utils/index";
import clsx from 'clsx';


interface CheckboxContainerProps {
    label: string;
    isChecked?: boolean;
    setFilters: Function;
    filterTypeDataNameLabel: string;
    isAscFlagExists?: boolean;
    isAsc?: boolean
}


const CheckboxContainer = ({ label, isChecked = false, setFilters, filterTypeDataNameLabel, isAscFlagExists, isAsc }: CheckboxContainerProps) => {

    const onChange = useCallback(() => {
        setFilters((prevState: FilterGroup[]): FilterGroup[] => {
            const indexOfFoundFilterGroup = prevState.findIndex(filterType => filterType.name.label === filterTypeDataNameLabel);
            if (indexOfFoundFilterGroup === -1) return prevState;

            const filterGroup = prevState[indexOfFoundFilterGroup];
            const indexOfFoundFilterName = (filterGroup.data as FilterItem[]).findIndex((filterName) => {
                return filterName.label === label;
            });

            if (indexOfFoundFilterName === -1) return prevState;

            const updatedData = [
                ...filterGroup.data.slice(0, indexOfFoundFilterName),
                { ...filterGroup.data[indexOfFoundFilterName], isChecked: !isChecked },
                ...filterGroup.data.slice(indexOfFoundFilterName + 1),
            ];

            const updatedFilterGroup = {
                ...filterGroup,
                data: updatedData,
            };

            return [
                ...prevState.slice(0, indexOfFoundFilterGroup),
                updatedFilterGroup,
                ...prevState.slice(indexOfFoundFilterGroup + 1),
            ];
        });
    }, [isChecked, label, filterTypeDataNameLabel, setFilters]);


    const onSortToggle = useCallback(() => {
        setFilters((prevState: FilterGroup[]): FilterGroup[] => {
            const indexOfFoundFilterGroup = prevState.findIndex(filterType => filterType.name.label === filterTypeDataNameLabel);
            const indexOfFoundFilterName = (prevState[indexOfFoundFilterGroup].data as FilterItem[]).findIndex((filterName) => {
                return filterName.label === label
            });

            if (indexOfFoundFilterGroup === -1 || indexOfFoundFilterName === -1) {
                return [...prevState]
            }
            else {
                return [
                    ...prevState.slice(0, indexOfFoundFilterGroup),
                    {
                        ...prevState[indexOfFoundFilterGroup],
                        data: [
                            ...(prevState[indexOfFoundFilterGroup].data as FilterItem[]).slice(0, indexOfFoundFilterName),
                            { ...(prevState[indexOfFoundFilterGroup].data as FilterItem[])[indexOfFoundFilterName], isAsc: isChecked ? !isAsc : isAsc, isChecked: true },
                            ...(prevState[indexOfFoundFilterGroup].data as FilterItem[]).slice(indexOfFoundFilterName + 1),
                        ]
                    },
                    ...prevState.slice(indexOfFoundFilterGroup + 1),
                ];
            }
        })
    }, [isAsc, isChecked]);

    return (
        <div className='checkbox-container'>
            <div className="form-checkbox">
                <input className="checkbox" type="checkbox" id={label} checked={isChecked} onChange={onChange} />
                <label className='checkbox-label' htmlFor={label}>{label}</label>
            </div>
            {
                isAscFlagExists
                    ?
                    <div className={clsx({
                        "selected-sorting-arrow": isChecked,
                        'unselected-sorting-arrow': !isChecked,
                    })} onClick={onSortToggle}>
                        {
                            !isAsc
                                ?
                                "\u2193"
                                :
                                "\u2191"
                        }
                    </div>
                    :
                    null
            }
        </div>
    );
};


export default CheckboxContainer;