/**
 * @prettier
 * @/flow
 */
import lazysizes from 'lazysizes';

type LazyLoadElements = {
    $lazyBackgroundImages?: NodeList<HTMLElement>
};

const els: LazyLoadElements = {};

const handleItemUnveil = event => {
    const image = event.target.getAttribute('data-src');

    if (image) {
        event.target.style.backgroundImage = `url(${image})`;
    }
};

const cache = () => {
    els.$lazyBackgroundImages = ((document.querySelectorAll('.js-lazy-bg'): any): NodeList<
        HTMLElement
    >);
};

const events = () => {
    if (els.$lazyBackgroundImages) {
        document.addEventListener('lazybeforeunveil', handleItemUnveil);
    }
};

const init = () => {
    cache();
    events();
};

export default {init};
