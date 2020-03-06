/**
 * @prettier
 * @/flow
 */
type FilterNavElements = {
    $filteredContent?: NodeList<HTMLElement>,
    $filterNavButtons?: NodeList<HTMLButtonElement>
};

const els: FilterNavElements = {};
let activeFilter: string = '';

const hideAllContent = () => {
    if (els.$filteredContent) {
        [...els.$filteredContent].map($content => ($content.style.display = 'none'));
    }
};

const showActiveContent = () => {
    if (els.$filteredContent) {
        [...els.$filteredContent]
            .filter($content => $content.dataset.filter === activeFilter)
            .map($content => ($content.style.display = 'block'));
    }
};

const disableAllButtons = () => {
    if (els.$filterNavButtons) {
        [...els.$filterNavButtons].map($button => $button.classList.add('c-button--ghost'));
    }
};

const showActiveButton = () => {
    if (els.$filterNavButtons) {
        [...els.$filterNavButtons]
            .filter($button => $button.dataset.filter === activeFilter)
            .map($button => $button.classList.remove('c-button--ghost'));
    }
};

const updateLocation = () => (window.location.hash = `#${activeFilter}`);

const handlefilterNavClick = (event: UIEvent & {target: HTMLLinkElement}) => {
    if (event.target) {
        activeFilter = event.target.dataset.filter;

        hideAllContent();
        showActiveContent();
        disableAllButtons();
        showActiveButton();
        updateLocation();

        event.preventDefault();
    }
};

const filterDefaultContent = () => {
    const $filterNavButtons = els.$filterNavButtons;
    let defaultFilter = window.location.hash.replace('#', '');

    if ($filterNavButtons) {
        if (!defaultFilter && $filterNavButtons[0]) {
            defaultFilter = $filterNavButtons[0].dataset.filter;
        }

        [...$filterNavButtons]
            .filter($button => $button.dataset.filter === defaultFilter)
            .map($button => $button.click());
    }
};

const events = () => {
    if (els.$filterNavButtons) {
        [...els.$filterNavButtons].map($button => {
            $button.addEventListener('click', handlefilterNavClick, false);
        });
    }
};

const cache = () => {
    els.$filteredContent = ((document.querySelectorAll('.js-filter-content'): any): NodeList<
        HTMLElement
    >);
    els.$filterNavButtons = ((document.querySelectorAll('.js-filter-nav-button'): any): NodeList<
        HTMLButtonElement
    >);
};

const init = () => {
    cache();

    if (els.$filterNavButtons) {
        events();
    }

    if (els.$filteredContent) {
        filterDefaultContent();
    }
};

export default {init};
