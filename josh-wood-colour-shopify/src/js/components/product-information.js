/**
 * @prettier
 * @flow
 */
import get from 'lodash/get';

type ProductInformationElements = {
    $description?: HTMLElement,
    $details?: HTMLElement,
    $detailsPhoto?: HTMLImageElement,
    $ingredients?: HTMLElement,
    $warnings?: HTMLElement
};

const els: ProductInformationElements = {};

const updateReadMoreHeight = () => {
    const $readMoreContainer = document.querySelector('.c-read-more');
    const $readMore = document.querySelector('.js-read-more');

    if ($readMore && $readMoreContainer) {
        if ($readMore.dataset.open === 'true') {
            $readMoreContainer.style.height = 'auto';
            $readMore.style.height = 'auto';
        }
    }
};

export const update = (information: Object | null): void => {
    const {$description, $details, $detailsPhoto, $ingredients, $warnings} = els;

    if (information) {
        if ($description) {
            $description.innerHTML = get(information, 'descriptionText', '');
        }

        if ($detailsPhoto) {
            $detailsPhoto.style.backgroundImage = `url(${get(information, 'photoURL', '')})`;
        }

        if ($details) {
            const detailsList = get(information, 'detailsText', []);

            $details.innerHTML = detailsList.map(detail => `<li>${detail}</li>`).join('');
        }

        if ($ingredients) {
            $ingredients.innerHTML = get(information, 'ingredientsText', '');
        }

        if ($warnings) {
            $warnings.innerHTML = get(information, 'warningsText', '');
        }

        /**
         * Not sure how to handle this. Product's content changing can cause issues with the read more
         * content, so we need to resize the area.
         */
        updateReadMoreHeight();
    }
};

const cache = () => {
    els.$details = ((document.querySelector('.js-product-details'): any): HTMLElement);
    els.$detailsPhoto = ((document.querySelector(
        '.js-product-details-photo .c-card__image'
    ): any): HTMLImageElement);
    els.$description = ((document.querySelector('.js-product-description'): any): HTMLElement);
    els.$ingredients = ((document.querySelector('.js-product-ingredients'): any): HTMLElement);
    els.$warnings = ((document.querySelector('.js-product-warnings'): any): HTMLElement);
};

export const init = () => {
    cache();
};
