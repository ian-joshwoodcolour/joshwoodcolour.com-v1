/**
 * @prettier
 * @flow
 */
type ResponsiveVideoElements = {
    $iframes?: NodeList<HTMLElement>
};

const els: ResponsiveVideoElements = {};

const wrap = ($element: HTMLElement) => {
    const $wrapper = document.createElement('div');

    if ($element.parentNode) {
        $element.parentNode.insertBefore($wrapper, $element);

        $wrapper.classList.add('c-responsive-video');
        $wrapper.appendChild($element);
    }
};

const addWrappers = () => {
    if (els.$iframes) {
        [...els.$iframes].map(wrap);
    }
};

const cache = () => {
    els.$iframes = ((document.querySelectorAll('.js-iframe-container iframe'): any): NodeList<
        HTMLElement
    >);
};

const init = () => {
    cache();
    addWrappers();
};

export default {init};
