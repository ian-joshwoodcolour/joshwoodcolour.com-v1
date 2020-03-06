/**
 * @prettier
 * @flow
 */
type ProductVideoElements = {
    $container?: HTMLElement,
    $text?: HTMLElement,
    $title?: HTMLElement,
    $videoCode?: HTMLElement
};

const els: ProductVideoElements = {};

export const update = (data: Object | null) => {
    const {$container, $text, $title, $videoCode} = els;

    if ($container && $text && $title && $videoCode) {
        if (data) {
            $container.style.display = 'none';
            $text.innerText = data.text;
            $title.innerText = data.title;
            $videoCode.innerHTML = data.videoCode;
        } else {
            $container.style.display = 'none';
        }
    }
};

const cache = () => {
    els.$container = ((document.querySelector('.js-product-video'): any): HTMLElement);
    els.$text = ((document.querySelector('.js-product-video-text'): any): HTMLElement);
    els.$title = ((document.querySelector('.js-product-video-title'): any): HTMLElement);
    els.$videoCode = ((document.querySelector('.js-product-video-code'): any): HTMLElement);
};

export const init = () => {
    cache();
};

export default {init};
