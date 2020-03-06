/**
 * @prettier
 * @flow
 */
import anime from 'animejs';

type OverlayNavigationElements = {
    $body?: HTMLElement,
    $overlay?: HTMLElement,
    $overlayInner?: HTMLElement,
    $pageHeader?: HTMLElement,
    $toggleButton?: HTMLElement
};

const els: OverlayNavigationElements = {};
let isVisible: boolean = false;

const hideOverlay = () => {
    const {$body, $overlay, $overlayInner, $pageHeader, $toggleButton} = els;

    if ($body && $overlay && $overlayInner && $pageHeader && $toggleButton) {
        anime({
            begin() {
                if ($body.classList.contains('_s-hero')) {
                    $body.classList.remove('s-no-hero');
                }

                $body.classList.remove('u-no-scroll');
                $toggleButton.classList.remove('c-hamburger--active');
            },
            complete() {
                isVisible = false;
                $overlay.style.display = 'none';
            },
            delay: 100,
            duration: 200,
            easing: 'linear',
            opacity: [1, 0],
            targets: $overlay
        });

        anime({
            duration: 200,
            opacity: [1, 0],
            targets: $overlayInner,
            translateY: [0, 24]
        });
    }
};

const showOverlay = () => {
    const {$body, $overlay, $overlayInner, $pageHeader, $toggleButton} = els;

    if ($body && $overlay && $overlayInner && $pageHeader && $toggleButton) {
        anime({
            begin() {
                isVisible = true;
                $overlay.style.display = 'flex';

                if ($body.classList.contains('s-hero')) {
                    $body.classList.add('s-no-hero', '_s-hero');
                }

                $body.classList.add('u-no-scroll');
                $toggleButton.classList.add('c-hamburger--active');
            },
            complete() {
                anime({
                    duration: 1000,
                    elasticity: 100,
                    opacity: [0, 1],
                    targets: $overlayInner,
                    translateY: [48, 0]
                });
            },
            duration: 200,
            easing: 'linear',
            opacity: [0, 1],
            targets: $overlay
        });
    }
};

const handleHamburgerClick = (event: Event) => {
    const $pageHeader = els.$pageHeader;
    const $toggleButton = els.$toggleButton;

    if ($pageHeader && $toggleButton) {
        if (isVisible === false) {
            showOverlay();
        } else {
            hideOverlay();
        }
    }

    event.preventDefault();
};

const events = () => {
    if (els.$toggleButton) {
        els.$toggleButton.addEventListener('click', handleHamburgerClick, false);
    }
};

const cache = () => {
    els.$body = ((document.querySelector('body'): any): HTMLElement);
    els.$pageHeader = ((document.querySelector('.js-page-header'): any): HTMLElement);
    els.$overlay = ((document.querySelector('.js-overlay-nav'): any): HTMLElement);
    els.$overlayInner = ((document.querySelector('.js-overlay-nav-inner'): any): HTMLElement);
    els.$toggleButton = ((document.querySelector('.js-overlay-nav-toggle'): any): HTMLElement);
};

const init = () => {
    cache();
    events();
};

export default {init};
