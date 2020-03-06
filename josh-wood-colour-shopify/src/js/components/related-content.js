/**
 * @prettier
 * @flow
 */
type RelatedContentElements = {
    $articles?: NodeList<HTMLElement>,
    $articlesContainer?: NodeList<HTMLElement>,
    $products?: NodeList<HTMLElement>,
    $productsContainer?: NodeList<HTMLElement>
};

const els: RelatedContentElements = {};

const showContainer = ($container: HTMLElement) => {
    if ($container) {
        $container.classList.remove('u-hide');
    }
};

const checkForContent = () => {
    if (els.$articlesContainer && els.$articles && els.$articles.length > 0) {
        [...els.$articlesContainer].map(showContainer);
    }

    if (els.$productsContainer && els.$products && els.$products.length > 0) {
        [...els.$productsContainer].map(showContainer);
    }
};

const cache = () => {
    els.$articles = ((document.querySelectorAll('.js-related-article'): any): NodeList<
        HTMLElement
    >);
    els.$articlesContainer = ((document.querySelectorAll('.js-related-articles'): any): NodeList<
        HTMLElement
    >);
    els.$products = ((document.querySelectorAll('.js-related-product'): any): NodeList<
        HTMLElement
    >);
    els.$productsContainer = ((document.querySelectorAll('.js-related-products'): any): NodeList<
        HTMLElement
    >);
};

const init = () => {
    cache();
    checkForContent();
};

export default {init};
