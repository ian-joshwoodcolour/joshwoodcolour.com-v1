/**
 * @prettier
 * @flow
 */
import Flickity from 'flickity';
import get from 'lodash/get';
import nth from 'lodash/nth';
import {intendedTargetElement} from '../services/helpers';

type AdviceTeasderElements = {
    $carousel?: HTMLElement,
    $carouselNextButton?: HTMLButtonElement,
    $carouselPrevButton?: HTMLButtonElement,
    $cta?: HTMLLinkElement,
    $product?: HTMLLinkElement,
    $productPrice?: HTMLElement,
    $productTitle?: HTMLElement,
    $title?: HTMLElement
};

const els: AdviceTeasderElements = {};

const CAROUSEL_OPTIONS = {
    cellSelector: '.js-advice-carousel-item',
    draggable: false,
    friction: 1,
    pageDots: false,
    prevNextButtons: false,
    selectedAttraction: 0.1,
    wrapAround: true
};
const adviceContent = get(window, 'globalData.adviceContent');

let flickity;

const setNavigationState = () => {
    const {$carouselNextButton, $carouselPrevButton} = els;

    if ($carouselNextButton && $carouselPrevButton) {
        $carouselNextButton.classList.toggle(
            'is-disabled',
            flickity.selectedIndex === flickity.slides.length - 1
        );
        $carouselPrevButton.classList.toggle('is-disabled', flickity.selectedIndex === 0);
    }
};

const setAdviceContent = ({title, url}) => {
    if (els.$title && els.$cta) {
        els.$title.innerHTML = title;
        els.$cta.href = url;
    }
};

const setRecommendedProduct = ({image, price, title, url}) => {
    const {$productPrice, $productTitle, $product} = els;

    if ($productPrice && $productTitle && $product) {
        if (title && price && url) {
            $productPrice.innerText = price;
            $productTitle.innerText = title;
            $product.href = url;
            $product.style.display = 'block';
        } else {
            $product.style.display = 'none';
        }
    }
};

const setIframeSource = ($element: HTMLIFrameElement) => {
    $element.src = $element.dataset.src;
};

const handleNewSlideSelect = () => {
    if (flickity) {
        const newContent = nth(adviceContent, flickity.selectedIndex);

        if (newContent) {
            setAdviceContent(newContent);
            setRecommendedProduct(newContent.product);
        }

        const $iframe = ((flickity.selectedElement.querySelector(
            'iframe'
        ): any): HTMLIFrameElement);

        if ($iframe && !$iframe.src) {
            setIframeSource($iframe);
        }
    }
};

const handleCarouselNavClick = (event: UIEvent) => {
    if (event.target) {
        event.preventDefault();

        const $target: HTMLSelectElement = intendedTargetElement(
            'js-advice-carousel-nav',
            event.target
        );

        const direction = $target.classList.contains('js-advice-carousel-nav-next')
            ? 'next'
            : 'previous';

        if (flickity) {
            if (direction === 'next') {
                flickity.next();
            } else {
                flickity.previous();
            }

            setNavigationState();
        }
    }
};

const setup = () => {
    const {$carousel} = els;

    if ($carousel) {
        flickity = new Flickity($carousel, CAROUSEL_OPTIONS);

        flickity.resize();
        flickity.on('select', handleNewSlideSelect);

        $carousel.classList.remove('c-advice-teaser__carousel--loading');

        const $iframe = (($carousel.querySelector('iframe'): any): HTMLIFrameElement);

        if ($iframe) {
            setTimeout(() => setIframeSource($iframe), 1000);
        }
    }
};

const events = () => {
    if (els.$carouselNextButton) {
        els.$carouselNextButton.addEventListener('click', handleCarouselNavClick);
    }

    if (els.$carouselPrevButton) {
        els.$carouselPrevButton.addEventListener('click', handleCarouselNavClick);
    }
};

const cache = () => {
    els.$carousel = ((document.querySelector('.js-advice-carousel'): any): HTMLElement);
    els.$carouselNextButton = ((document.querySelector(
        '.js-advice-carousel-nav-next'
    ): any): HTMLButtonElement);
    els.$carouselPrevButton = ((document.querySelector(
        '.js-advice-carousel-nav-prev'
    ): any): HTMLButtonElement);
    els.$cta = ((document.querySelector('.js-advice-cta'): any): HTMLLinkElement);
    els.$productPrice = ((document.querySelector('.js-advice-product-price'): any): HTMLElement);
    els.$productTitle = ((document.querySelector('.js-advice-product-title'): any): HTMLElement);
    els.$product = ((document.querySelector('.js-advice-product'): any): HTMLLinkElement);
    els.$title = ((document.querySelector('.js-advice-title'): any): HTMLElement);
};

const init = () => {
    cache();
    events();
    setup();
};

export default {init};
