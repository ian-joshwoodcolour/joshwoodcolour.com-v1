/**
 * @prettier
 * @flow
 */
import React from 'react';

type Props = {
    handleClick: Function,
    isSelected: boolean,
    value: string | number
};

const Checkbox = ({handleClick, isSelected, value}: Props) => (
    <div
        className={`c-checkbox ${isSelected ? 'c-checkbox--selected' : ''}`}
        onClick={() => handleClick(!isSelected, value)}
    >
        <svg
            height="15"
            viewBox="0 0 18 15"
            width="18"
            className="c-checkbox__icon"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title />
            <path
                d="M6 10.7L1.8 6.5.4 7.9 6 13.5l12-12L16.6.1 6 10.7z"
                fill="#000"
                fillRule="evenodd"
            />
        </svg>
    </div>
);

export default Checkbox;
