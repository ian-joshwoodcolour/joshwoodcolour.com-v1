/**
 * @prettier
 * @flow
 */
import throttle from 'lodash/throttle';

type StickyElements = {
    $stickyItem?: HTMLElement,
    $stickyPlaceholder?: HTMLElement,
    $stickyThreshold?: HTMLElement
};

const els: StickyElements = {};
const stickyClass: string = 'u-is-stuck';
const stickyScrollOffset: number = 50;
let stickyThresholdValue: number = 35;
let isStuck: boolean = false;

const addSticky = () => {
    if (els.$stickyItem) {
        els.$stickyItem.classList.add(stickyClass);
        isStuck = true;
    }
};

const removeSticky = () => {
    if (els.$stickyItem) {
        els.$stickyItem.classList.remove(stickyClass);
        isStuck = false;
    }
};

const handleStickyChange = () => {
    const offset: number = window.pageYOffset;

    if (offset > stickyThresholdValue && !isStuck) {
        addSticky();
    } else if (isStuck && offset <= stickyThresholdValue + stickyScrollOffset) {
        removeSticky();
    }
};
const handleWindowScroll = throttle(handleStickyChange, 500);

export const destroySticky = () => {
    removeSticky();

    window.removeEventListener('scroll', handleWindowScroll);
    window.removeEventListener('touchmove', handleWindowScroll);
};

const setStickyPlaceholderHeight = () => {
    if (els.$stickyPlaceholder && els.$stickyItem) {
        els.$stickyPlaceholder.style.height = `${els.$stickyItem.offsetHeight}px`;

        if (els.$stickyThreshold) {
            stickyThresholdValue =
                els.$stickyThreshold.getBoundingClientRect().height - stickyScrollOffset;
        }
    }
};

const cache = () => {
    els.$stickyItem = ((document.querySelector('.js-sticky'): any): HTMLElement);
    els.$stickyPlaceholder = ((document.querySelector('.js-sticky-placeholder'): any): HTMLElement);
    els.$stickyThreshold = ((document.querySelector('.js-sticky-threshold'): any): HTMLElement);
};

const events = () => {
    window.addEventListener('scroll', handleWindowScroll, false);
    window.addEventListener('touchmove', handleWindowScroll, false);
};

const init = () => {
    cache();

    if (els.$stickyItem) {
        events();
        setStickyPlaceholderHeight();
        handleStickyChange();
    }
};

export default {init};
