/**
 * @prettier
 * @flow
 */
import eq from 'lodash/eq';
import get from 'lodash/get';
import {getShadeFromProductName} from '../services/helpers';

type ShadeComparisonElements = {
    $darkBeforeShade?: HTMLElement,
    $mediumBeforeShade?: HTMLElement,
    $lightBeforeShade?: HTMLElement,
    $darkAfterShade?: HTMLElement,
    $mediumAfterShade?: HTMLElement,
    $lightAfterShade?: HTMLElement,
    $shadeColourLightLabel?: HTMLElement,
    $shadeColourMediumLabel?: HTMLElement,
    $shadeColourDarkLabel?: HTMLElement,
    $shadeNumber?: HTMLElement
};

const els: ShadeComparisonElements = {};

const shades = get(window, 'globalData.shadeComparisons');

const setBackgroundImage = ($element: HTMLElement, source: string) => {
    $element.style.backgroundImage = `url(${source})`;
};

export const update = (productTitle: string, productHandle: string): void => {
    const {
        $darkBeforeShade,
        $mediumBeforeShade,
        $lightBeforeShade,
        $darkAfterShade,
        $mediumAfterShade,
        $lightAfterShade,
        $shadeColourLightLabel,
        $shadeColourMediumLabel,
        $shadeColourDarkLabel,
        $shadeNumber
    } = els;

    if (
        $darkBeforeShade &&
        $mediumBeforeShade &&
        $lightBeforeShade &&
        $darkAfterShade &&
        $mediumAfterShade &&
        $lightAfterShade &&
        $shadeColourLightLabel &&
        $shadeColourMediumLabel &&
        $shadeColourDarkLabel
    ) {
        const currentComparison = shades[productHandle];

        if (currentComparison) {
            setBackgroundImage($darkBeforeShade, currentComparison.dark_before_image);
            setBackgroundImage($mediumBeforeShade, currentComparison.medium_before_image);
            setBackgroundImage($lightBeforeShade, currentComparison.light_before_image);
            setBackgroundImage($darkAfterShade, currentComparison.dark_after_image);
            setBackgroundImage($mediumAfterShade, currentComparison.medium_after_image);
            setBackgroundImage($lightAfterShade, currentComparison.light_after_image);

            $shadeColourLightLabel.innerText = currentComparison.light_colour_label;
            $shadeColourMediumLabel.innerText = currentComparison.medium_colour_label;
            $shadeColourDarkLabel.innerText = currentComparison.dark_colour_label;
        }
    }

    if ($shadeNumber) {
        $shadeNumber.innerText = productTitle;
    }
};

const cache = () => {
    els.$darkBeforeShade = ((document.querySelector('.js-shade-dark-before'): any): HTMLElement);
    els.$mediumBeforeShade = ((document.querySelector(
        '.js-shade-medium-before'
    ): any): HTMLElement);
    els.$lightBeforeShade = ((document.querySelector('.js-shade-light-before'): any): HTMLElement);
    els.$darkAfterShade = ((document.querySelector('.js-shade-dark-after'): any): HTMLElement);
    els.$mediumAfterShade = ((document.querySelector('.js-shade-medium-after'): any): HTMLElement);
    els.$lightAfterShade = ((document.querySelector('.js-shade-light-after'): any): HTMLElement);
    els.$shadeColourLightLabel = ((document.querySelector(
        '.js-shade-colour-light'
    ): any): HTMLElement);
    els.$shadeColourMediumLabel = ((document.querySelector(
        '.js-shade-colour-medium'
    ): any): HTMLElement);
    els.$shadeColourDarkLabel = ((document.querySelector(
        '.js-shade-colour-dark'
    ): any): HTMLElement);
    els.$shadeNumber = ((document.querySelector('.js-shade-number'): any): HTMLElement);
};

export const init = () => {
    cache();
};
