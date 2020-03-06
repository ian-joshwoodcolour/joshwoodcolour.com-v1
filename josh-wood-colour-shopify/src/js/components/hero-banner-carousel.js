/**
 * @prettier
 * @flow
 */
import Flickity from 'flickity';

type HeroBannerCarouselElements = {
    $carousel?: HTMLElement,
    $banners?: NodeList<HTMLElement>
};

const els: HeroBannerCarouselElements = {};

const CAROUSEL_OPTIONS = {
    autoPlay: 8000,
    cellSelector: '.js-hero-banner-carousel .c-hero-banner',
    draggable: false,
    pageDots: true,
    prevNextButtons: true,
    wrapAround: true
};
let flickity;

const setup = () => {
    const {$carousel} = els;

    if ($carousel) {
        flickity = new Flickity($carousel, CAROUSEL_OPTIONS);

        flickity.resize();
    }
};

const cache = () => {
    els.$carousel = ((document.querySelector('.js-hero-banner-carousel'): any): HTMLElement);
    els.$banners = ((document.querySelectorAll(
        '.js-hero-banner-carousel .c-hero-banner'
    ): any): NodeList<HTMLElement>);
};

const init = () => {
    cache();

    if (els.$banners && els.$banners.length > 1) {
        setup();
    }
};

export default {init};
