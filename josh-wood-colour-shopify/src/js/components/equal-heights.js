/**
 * @prettier
 * @flow
 */
type EqualHeightsElements = {
    $items?: NodeList<HTMLElement>,
    $itemsContainer?: HTMLElement
};

const els: EqualHeightsElements = {};

const getPanelHeights = () => {
    if (els.$items) {
        const heights = [...els.$items].map($panel => {
            const isActive = $panel.classList.contains('is-active');

            if (!isActive) {
                $panel.style.visibility = 'hidden';
                $panel.style.display = 'block';
            }

            const height = $panel.getBoundingClientRect().height;

            if (!isActive) {
                $panel.style.display = 'none';
                $panel.style.visibility = 'visible';
            }

            return height;
        });

        return heights;
    }
};

const setEqualPanelHeights = height => {
    if (els.$items && els.$itemsContainer) {
        [...els.$items, ...[els.$itemsContainer]].map(
            $element => ($element.style.height = `${height}px`)
        );
    }
};

const equalise = () => {
    const heights = getPanelHeights();

    if (heights) {
        const sortedHeights = heights.sort((a, b) => a - b).reverse();
        const tallest = sortedHeights[0];

        setEqualPanelHeights(tallest);
    }
};

const cache = () => {
    els.$items = ((document.querySelectorAll('.js-equal-height'): any): NodeList<HTMLElement>);
    els.$itemsContainer = ((document.querySelector(
        '.js-equal-height-container'
    ): any): HTMLElement);
};

const init = () => {
    cache();
    equalise();
};

export default {init};
