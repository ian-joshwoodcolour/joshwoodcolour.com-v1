/**
 * @prettier
 * @flow
 */
import Flickity from 'flickity-bg-lazyload';
import get from 'lodash/get';
import nth from 'lodash/nth';
import {intendedTargetElement} from '../services/helpers';

type ProductGalleryElements = {
    $carousel?: HTMLElement,
    $carouselPhotos?: NodeList<HTMLElement>,
    $carouselNav?: HTMLElement,
    $carouselNavButtonVideo?: HTMLButtonElement,
    $carouselNavButtons?: NodeList<HTMLButtonElement>,
    $videoWrapper?: HTMLElement
};
type ProductGalleryPhoto = {
    photo: string,
    thumbnail: string,
    caption: string
};
type ProductGalleryData = {
    collectionURL: string,
    photos: Array<ProductGalleryPhoto>,
    sspProductURL: string,
    productURL: string,
    video: string
};

const els: ProductGalleryElements = {};

const CAROUSEL_OPTIONS = {
    bgLazyLoad: true,
    cellSelector: '.js-product-carousel-photo:not(.u-hide)',
    draggable: true,
    friction: 0.75,
    pageDots: false,
    prevNextButtons: false,
    selectedAttraction: 0.1,
    wrapAround: false
};

let flickity;

const setupFlickity = () => {
    const {$carousel} = els;

    if ($carousel) {
        flickity = new Flickity($carousel, CAROUSEL_OPTIONS);

        flickity.select(0, false, true);
        flickity.on('select', handleNewSlideSelect);
    }
};

const setNavigationState = (selectedIndex: number) => {
    const {$carouselNavButtons} = els;

    if ($carouselNavButtons) {
        [...$carouselNavButtons].map($button => {
            $button.classList.toggle(
                'is-active',
                parseInt($button.dataset.index) === selectedIndex
            );
        });
    }
};

const handleNewSlideSelect = () => {
    if (flickity) {
        setNavigationState(flickity.selectedIndex);
    }
};

const handleNavButtonClicked = (event: Event) => {
    event.preventDefault();

    const $target: HTMLElement = (event.target: any);

    if ($target && flickity) {
        $target.blur();
        flickity.selectCell(parseInt($target.dataset.index));
    }
};

const getNewSlide = (photo: ProductGalleryPhoto, lazyLoad: boolean = false) => {
    const $el = document.createElement('li');

    $el.classList.add('c-gallery__item', 'js-product-carousel-photo');

    if (lazyLoad) {
        $el.setAttribute('data-flickity-bg-lazyload', photo.photo);
    } else {
        $el.style.backgroundImage = `url('${photo.photo}')`;
    }

    $el.innerHTML = `<div class="c-gallery__caption ${!photo.caption ? 'u-hide' : ''}">
        ${photo.caption}
    </div>`;

    return $el;
};

export const updateVideo = (videoHTML: string) => {
    if (els.$videoWrapper) {
        els.$videoWrapper.innerHTML = videoHTML;
    }
};

export const update = (data: ProductGalleryData) => {
    const {
        $carousel,
        $carouselNav,
        $carouselNavButtons,
        $carouselPhotos,
        $carouselNavButtonVideo,
        $videoWrapper
    } = els;

    const isVisible = index => index + 1 <= data.photos.length;

    if ($carouselNav) {
        const shouldShowNav = data.photos.length > 1 || data.video !== '';

        if (shouldShowNav) {
            if ($carouselNavButtons) {
                [...$carouselNavButtons].map(($button, index) => {
                    $button.style.display = !isVisible(index) ? 'none' : 'inline-block';

                    if (isVisible(index)) {
                        $button.style.backgroundImage = `url(${data.photos[index].thumbnail})`;
                    }
                });
            }

            if ($carouselNavButtonVideo) {
                $carouselNavButtonVideo.style.display = data.video === '' ? 'none' : 'inline-block';
            }
        }

        $carouselNav.style.display = shouldShowNav ? 'flex' : 'none';
    }

    if ($videoWrapper) {
        $videoWrapper.innerHTML = data.video;
    }

    if (flickity) {
        flickity.remove(flickity.cells.map(c => c.element));
        flickity.prepend(data.photos.map((p, i) => getNewSlide(p, i === 0)));
        flickity.reloadCells();
    }
};

const events = () => {
    if (els.$carouselNavButtons) {
        [...els.$carouselNavButtons].map($button =>
            $button.addEventListener('click', handleNavButtonClicked, false)
        );
    }
};

const cache = () => {
    els.$carousel = ((document.querySelector('.js-product-carousel'): any): HTMLElement);
    els.$carouselPhotos = ((document.querySelectorAll('.js-product-carousel-photo'): any): NodeList<
        HTMLElement
    >);
    els.$carouselNav = ((document.querySelector(
        '.js-product-carousel-nav'
    ): any): HTMLButtonElement);
    els.$carouselNavButtons = ((document.querySelectorAll(
        '.js-product-carousel-button'
    ): any): NodeList<HTMLButtonElement>);
    els.$carouselNavButtonVideo = ((document.querySelector(
        '.js-product-carousel-video'
    ): any): HTMLButtonElement);
    els.$videoWrapper = ((document.querySelector(
        '.js-modal[data-modal="product-gallery-video"] .js-modal-wrapper'
    ): any): HTMLElement);
};

export const init = () => {
    cache();
    events();
    setupFlickity();
};

export default {init};
