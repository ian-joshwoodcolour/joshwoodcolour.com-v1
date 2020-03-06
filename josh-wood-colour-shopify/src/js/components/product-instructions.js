/**
 * @prettier
 * @flow
 */
import get from 'lodash/get';

type ProductInstructionsElements = {
    $productInstructions1?: HTMLElement,
    $productInstructions1CTALabel?: HTMLElement,
    $productInstructions1CTALink?: HTMLElement,
    $productInstructions1Photo?: HTMLElement,
    $productInstructions1Text?: HTMLElement,
    $productInstructions1Title?: HTMLElement,
    $productInstructions2?: HTMLElement,
    $productInstructions2CTALabel?: HTMLElement,
    $productInstructions2CTALink?: HTMLElement,
    $productInstructions2Photo?: HTMLElement,
    $productInstructions2Text?: HTMLElement,
    $productInstructions2Title?: HTMLElement,
    $productInstructions3?: HTMLElement,
    $productInstructions3CTALabel?: HTMLElement,
    $productInstructions3CTALink?: HTMLElement,
    $productInstructions3Photo?: HTMLElement,
    $productInstructions3Text?: HTMLElement,
    $productInstructions3Title?: HTMLElement
};

const els: ProductInstructionsElements = {};

const toggleProductInstruction = (instructionNumber: number, isVisible: boolean) => {
    const $instruction = els[`$productInstructions${instructionNumber}`];

    if ($instruction) {
        if (isVisible) {
            $instruction.removeAttribute('style');
        } else {
            $instruction.setAttribute('style', 'display: none !important');
        }
    }
};

const updateProductInstruction = (instructionNumber: number, instructions: Object | null) => {
    const $instruction = els[`$productInstructions${instructionNumber}`];

    if ($instruction && instructions) {
        const ctaLabel = instructions[`ctaLabel${instructionNumber}`];
        const ctaURL = instructions[`ctaURL${instructionNumber}`];
        const photo = instructions[`photo${instructionNumber}`];
        const text = instructions[`text${instructionNumber}`];
        const title = instructions[`title${instructionNumber}`];

        if (photo !== '' || text !== '' || title !== '') {
            toggleProductInstruction(instructionNumber, true);

            if (
                ctaLabel &&
                els[`$productInstructions${instructionNumber}CTALabel`] &&
                ctaURL &&
                els[`$productInstructions${instructionNumber}CTALink`]
            ) {
                els[`$productInstructions${instructionNumber}CTALink`].style.display =
                    'inline-block';
                els[`$productInstructions${instructionNumber}CTALink`].href = ctaURL;
                els[`$productInstructions${instructionNumber}CTALabel`].innerText = ctaLabel;
            } else if (els[`$productInstructions${instructionNumber}CTALink`]) {
                els[`$productInstructions${instructionNumber}CTALink`].style.display = 'none';
            }

            if (photo && els[`$productInstructions${instructionNumber}Photo`]) {
                els[
                    `$productInstructions${instructionNumber}Photo`
                ].style.backgroundImage = `url(${photo})`;
            }

            if (text && els[`$productInstructions${instructionNumber}Text`]) {
                els[`$productInstructions${instructionNumber}Text`].innerText = text;
            }

            if (title && els[`$productInstructions${instructionNumber}Title`]) {
                els[`$productInstructions${instructionNumber}Title`].innerText = title;
            }
        } else {
            toggleProductInstruction(instructionNumber, false);
        }
    }
};

export const update = (information: Object | null): void => {
    const {
        $productInstructions1,
        $productInstructions1CTALabel,
        $productInstructions1CTALink,
        $productInstructions1Photo,
        $productInstructions1Text,
        $productInstructions1Title,
        $productInstructions2,
        $productInstructions2CTALabel,
        $productInstructions2CTALink,
        $productInstructions2Photo,
        $productInstructions2Text,
        $productInstructions2Title,
        $productInstructions3,
        $productInstructions3CTALabel,
        $productInstructions3CTALink,
        $productInstructions3Photo,
        $productInstructions3Text,
        $productInstructions3Title
    } = els;

    if (information) {
        [1, 2, 3].map(i => updateProductInstruction(i, information));
    } else {
        [1, 2, 3].map(i => toggleProductInstruction(i, false));
    }
};

const cache = () => {
    [1, 2, 3].map(i => {
        els[`$productInstructions${i}`] = ((document.querySelector(
            `.js-instructions-${i}`
        ): any): HTMLElement);
        els[`$productInstructions${i}CTALabel`] = ((document.querySelector(
            `.js-instructions-${i}-cta-label`
        ): any): HTMLElement);
        els[`$productInstructions${i}CTALink`] = ((document.querySelector(
            `.js-instructions-${i}-cta-link`
        ): any): HTMLElement);
        els[`$productInstructions${i}Photo`] = ((document.querySelector(
            `.js-instructions-${i}-photo .js-image`
        ): any): HTMLElement);
        els[`$productInstructions${i}Text`] = ((document.querySelector(
            `.js-instructions-${i}-text`
        ): any): HTMLElement);
        els[`$productInstructions${i}Title`] = ((document.querySelector(
            `.js-instructions-${i}-title`
        ): any): HTMLElement);
    });
};

export const init = () => {
    cache();
};
