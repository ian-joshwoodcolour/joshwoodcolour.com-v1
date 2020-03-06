/**
 * @prettier
 * @flow
 */
import get from 'lodash/get';
import nth from 'lodash/nth';
import {getPrice} from '../services/helpers';

type ProductRecommendationElements = {
    $product1?: HTMLElement,
    $product1Image?: HTMLElement,
    $product1Title?: HTMLElement,
    $product1Price?: HTMLElement,
    $product2?: HTMLElement,
    $product2Image?: HTMLElement,
    $product2Title?: HTMLElement,
    $product2Price?: HTMLElement
};

const els: ProductRecommendationElements = {};

export const update = (newProducts: Array<Object>): void => {
    const {
        $product1,
        $product1Image,
        $product1Price,
        $product1Title,
        $product2,
        $product2Image,
        $product2Price,
        $product2Title
    } = els;

    if (newProducts && $product1 && $product1Image && $product1Price && $product1Title) {
        const {featured_image, handle, price, title} = nth(get(newProducts, 'recommendations'), 0);

        $product1.setAttribute('href', `/products/${handle}`);
        $product1Image.style.backgroundImage = `url(${featured_image})`;
        $product1Price.innerText = getPrice(price);
        $product1Title.innerText = title;
    }

    if (newProducts && $product2 && $product2Image && $product2Price && $product2Title) {
        const {featured_image, handle, price, title} = nth(get(newProducts, 'recommendations'), 1);

        $product2.setAttribute('href', `/products/${handle}`);
        $product2Image.style.backgroundImage = `url(${featured_image})`;
        $product2Price.innerText = getPrice(price);
        $product2Title.innerText = title;
    }
};

const cache = () => {
    els.$product1 = ((document.querySelector('.js-recommendation-1'): any): HTMLElement);
    els.$product1Image = ((document.querySelector(
        '.js-recommendation-1 .js-image'
    ): any): HTMLElement);
    els.$product1Price = ((document.querySelector(
        '.js-recommendation-1 .js-price'
    ): any): HTMLElement);
    els.$product1Title = ((document.querySelector(
        '.js-recommendation-1 .js-title'
    ): any): HTMLElement);
    els.$product2 = ((document.querySelector('.js-recommendation-2'): any): HTMLElement);
    els.$product2Image = ((document.querySelector(
        '.js-recommendation-2 .js-image'
    ): any): HTMLElement);
    els.$product2Price = ((document.querySelector(
        '.js-recommendation-2 .js-price'
    ): any): HTMLElement);
    els.$product2Title = ((document.querySelector(
        '.js-recommendation-2 .js-title'
    ): any): HTMLElement);
};

export const init = () => {
    cache();
};
