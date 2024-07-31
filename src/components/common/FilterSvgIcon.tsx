import React from "react";


interface FilterSVGIconProps {
    size?: number;
    isActive: boolean
}
export default function FilterSvgIcon({ size = 24, isActive }: FilterSVGIconProps) {
    return (
        <svg
            id="Layer_1"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            height={size}
            width={size}
            data-name="Layer 1" fill={isActive ? "#565D6D" : "#1e2128"}>
            <path
                d="m14 24a1 1 0 0 1 -.6-.2l-4-3a1 1 0 0 1 -.4-.8v-5.62l-7.016-7.893a3.9 3.9 0 0 1 2.916-6.487h14.2a3.9 3.9 0 0 1 2.913 6.488l-7.013 7.892v8.62a1 1 0 0 1 -1 1z"
            />
        </svg>
    )
}