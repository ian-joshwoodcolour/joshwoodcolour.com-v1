/**
 * @prettier
 * @flow
 */
import anime from 'animejs';
import get from 'lodash/get';
import {preloadImages} from '../services/helpers';
import {ANIMATION_DURATION, ANIMATION_ELASTICITY, SPACING_SMALL} from '../config';

type ProductDemoElements = {
    $newLabel?: HTMLElement,
    $newPane?: HTMLElement,
    $newProduct?: HTMLImageElement,
    $originalLabel?: HTMLElement,
    $originalPane?: HTMLElement
};

const els: ProductDemoElements = {};

const productDemos = get(window, 'globalData.productDemos');

const animateLabelChange = ($element: HTMLElement) => {
    let animationConfig = {
        duration: ANIMATION_DURATION * 2,
        elasticity: ANIMATION_ELASTICITY,
        opacity: [0, 1],
        targets: $element,
        translateY: [SPACING_SMALL, 0]
    };

    anime(animationConfig);
};

export const updateNew = (product: Object): void => {
    const {$newLabel, $newPane, $newProduct} = els;

    if ($newLabel) {
        $newLabel.innerText = get(product, 'label');

        animateLabelChange($newLabel);
    }

    if ($newPane) {
        $newPane.style.backgroundImage = `url(${get(product, 'image')})`;
    }

    if ($newProduct) {
        $newProduct.style.backgroundImage = `url(${get(product, 'productImage')})`;
    }
};

export const updateOriginal = (demo: Object, colour: string): void => {
    const {$originalLabel, $originalPane} = els;

    if ($originalLabel && $originalPane) {
        $originalPane.style.backgroundImage = `url(${get(
            demo,
            `originalImageB${colour.slice(1)}`
        )})`;
        $originalLabel.innerText = get(demo, `originalLabelB${colour.slice(1)}`);

        animateLabelChange($originalLabel);
    }
};

const preloadDemoImages = () => {
    if (productDemos) {
        const imagesToPreload = [
            ...[productDemos.originalImageBlonde, productDemos.originalImageBrown],
            ...productDemos.products.map(p => p.image)
        ];

        if (imagesToPreload.length) {
            preloadImages(imagesToPreload);
        }
    }
};

const cache = () => {
    els.$newLabel = ((document.querySelector('.js-product-demo-new-label'): any): HTMLElement);
    els.$newPane = ((document.querySelector('.js-product-demo-new-pane'): any): HTMLElement);
    els.$newProduct = ((document.querySelector(
        '.js-product-demo-new-product'
    ): any): HTMLImageElement);
    els.$originalLabel = ((document.querySelector(
        '.js-product-demo-original-label'
    ): any): HTMLElement);
    els.$originalPane = ((document.querySelector(
        '.js-product-demo-original-pane'
    ): any): HTMLElement);
};

export const init = () => {
    cache();

    setTimeout(preloadDemoImages, 2000);
};
