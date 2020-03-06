/**
 * @prettier
 * @flow
 */
import anime from 'animejs';
import Cookie from 'js-cookie';
import {ANIMATION_DURATION, ANIMATION_EASING} from '../config';

type CookieBannerElements = {
    $banner?: HTMLElement,
    $bannerTemplate?: HTMLElement,
    $closeButton?: HTMLElement
};

const els: CookieBannerElements = {};

const COOKIE_NAME = 'jwc-cookie-accept';

const showBanner = () => {
    if (els.$banner) {
        anime({
            duration: ANIMATION_DURATION * 2,
            easing: ANIMATION_EASING,
            targets: els.$banner,
            translateY: [80, 0]
        });
    }
};

const hideBanner = () => {
    if (els.$banner) {
        anime({
            duration: ANIMATION_DURATION * 2,
            easing: ANIMATION_EASING,
            targets: els.$banner,
            translateY: [0, 80]
        });
    }
};

const handleClose = () => {
    Cookie.set(COOKIE_NAME, new Date().getTime(), {expires: 3650});

    hideBanner();
};

const setupBanner = () => {
    const hasCookie = Cookie.get(COOKIE_NAME);

    if (!hasCookie) {
        const {$bannerTemplate} = els;

        if ($bannerTemplate) {
            els.$banner = ((document.querySelector('.js-cookie-banner'): any): HTMLElement);

            if (els.$banner) {
                els.$banner.innerHTML = $bannerTemplate.innerHTML;

                showBanner();

                els.$closeButton = ((document.querySelector(
                    '.js-cookie-close'
                ): any): HTMLButtonElement);

                if (els.$closeButton) {
                    els.$closeButton.addEventListener('click', handleClose, false);
                }
            }
        }
    }
};

const cache = () => {
    els.$bannerTemplate = ((document.querySelector(
        '[data-cookie-banner-template]'
    ): any): HTMLScriptElement);
};

const init = () => {
    cache();
    setupBanner();
};

export default {init};
