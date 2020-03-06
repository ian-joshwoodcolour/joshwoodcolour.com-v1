/**
 * @prettier
 * @flow
 */
import React from 'react';
import {getPrice} from '../../services/helpers';

type Props = {
    handleClick: Function,
    label?: string,
    size?: string,
    variantId: number
};

const AddToCartButton = ({handleClick, label, size, variantId}: Props) => (
    <button
        className={`c-button c-button--black c-button--add ${size ? `c-button--${size}` : ''}`}
        onClick={() => handleClick(variantId)}
    >
        {label ? label : 'Add to cart'}
    </button>
);

export default AddToCartButton;
