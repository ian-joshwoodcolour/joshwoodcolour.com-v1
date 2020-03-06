/**
 * @prettier
 * @/flow
 */
import {lerp} from '../services/helpers';

type ScrollToElements = {
    $body?: HTMLElement,
    $scrollToItems?: NodeList<HTMLElement>
};

const els: ScrollToElements = {};

export const scrollTo = (element: HTMLElement, to: number, duration: number = 500): void => {
    if (duration <= 0) {
        return;
    }

    const difference = lerp(to, element.scrollTop, 0.3);
    const perTick = difference / duration * 10;

    setTimeout(() => {
        element.scrollTop = element.scrollTop + perTick;

        if (element.scrollTop > to) {
            return;
        }

        requestAnimationFrame(() => scrollTo(element, to, duration - 10));
    }, 10);
};

const handleItemClick = (event: MouseEvent) => {
    if (
        event.relatedTarget &&
        event.relatedTarget.dataset &&
        event.relatedTarget.dataset.scrollTo
    ) {
        const scrollToElementSelector = event.relatedTarget.dataset.scrollTo;
        const $scrollToElement = ((document.querySelector(
            scrollToElementSelector
        ): any): HTMLElement);

        if ($scrollToElement && els.$body) {
            scrollTo(els.$body, $scrollToElement.getBoundingClientRect().top);

            event.preventDefault();
        }
    }
};

const cache = () => {
    els.$body = ((document.querySelector('body'): any): HTMLElement);
    els.$scrollToItems = ((document.querySelectorAll('.js-scroll-to'): any): NodeList<HTMLElement>);
};

const events = () => {
    if (els.$scrollToItems) {
        [...els.$scrollToItems].map($item =>
            $item.addEventListener('click', handleItemClick, false)
        );
    }
};

const init = () => {
    cache();
    events();
};

export default {init};
