/**
 * @prettier
 * @flow
 */
type ProductQuoteElements = {
    $container?: HTMLElement,
    $quotee?: HTMLElement,
    $quoteeTitle?: HTMLElement,
    $text?: HTMLElement
};

const els: ProductQuoteElements = {};

export const update = (content: Object = {}): void => {
    const {$container, $quotee, $quoteeTitle, $text} = els;

    if (content) {
        if ($container) {
            $container.style.display = 'block';
        }

        if ($quotee) {
            $quotee.innerText = content.quotee;
        }

        if ($quoteeTitle) {
            $quoteeTitle.innerText = content.quoteeTitle;
            $quoteeTitle.style.display = content.quoteeTitle ? 'inline-block' : 'block';
        }

        if ($text) {
            $text.innerText = content.text;
        }
    }
};

const cache = () => {
    els.$container = ((document.querySelector('.js-quote'): any): HTMLElement);
    els.$quotee = ((document.querySelector('.js-quote-quotee'): any): HTMLImageElement);
    els.$quoteeTitle = ((document.querySelector('.js-quote-quotee-title'): any): HTMLElement);
    els.$text = ((document.querySelector('.js-quote-text'): any): HTMLElement);
};

export const init = () => {
    cache();
};
