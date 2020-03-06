/**
 * @prettier
 * @flow
 */
import get from 'lodash/get';

type ProductPromoBannerElements = {
    $banner?: HTMLElement,
    $badge?: HTMLElement,
    $text?: HTMLElement
};

const els: ProductPromoBannerElements = {};

export const update = (content: Object | null): void => {
    const {$banner, $badge, $text} = els;

    if (content) {
        if ($banner) {
            $banner.style.backgroundColor = get(content, 'backgroundColour');
            $banner.style.backgroundImage = `url(${get(content, 'backgroundImage', '')})`;
            $banner.style.display = 'block';
        }

        if ($badge) {
            $badge.setAttribute('data-theme', get(content, 'badgeTheme'));
            $badge.innerText = get(content, 'badgeText', '');
        }

        if ($text) {
            $text.setAttribute('data-colour', get(content, 'textColour'));
            $text.innerText = get(content, 'text', '');
        }
    } else {
        if ($banner) {
            $banner.style.display = 'none';
        }
    }
};

const cache = () => {
    els.$banner = ((document.querySelector('.js-product-promo-banner'): any): HTMLElement);
    els.$badge = ((document.querySelector('.js-product-promo-banner-badge'): any): HTMLElement);
    els.$text = ((document.querySelector('.js-product-promo-banner-text'): any): HTMLElement);
};

export const init = () => {
    cache();
};
