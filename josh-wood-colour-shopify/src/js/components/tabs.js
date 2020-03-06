/**
 * @prettier
 * @flow
 */
import eq from 'lodash/eq';
import get from 'lodash/get';
import find from 'lodash/find';
import filter from 'lodash/filter';
import last from 'lodash/last';
import toString from 'lodash/toString';

type TabElements = {
    $tabButtons?: NodeList<HTMLButtonElement>,
    $tabPanels?: NodeList<HTMLElement>
};

const els: TabElements = {};
let selectedTab: string = '';

const updateTab = (tabName: string, isSelected: boolean) => {
    if (els.$tabButtons && els.$tabPanels) {
        const $button = find(els.$tabButtons, $button =>
            eq($button.getAttribute('aria-controls'), tabName)
        );
        const $panel = find(els.$tabPanels, $panel =>
            eq($panel.getAttribute('aria-labelledby'), `tab-${tabName}`)
        );

        if ($button && $panel) {
            $button.setAttribute('aria-selected', isSelected);
            $button.setAttribute('tabindex', isSelected ? 0 : -1);
            $panel.setAttribute('aria-hidden', !isSelected);

            if ($panel.children.length) {
                $panel.children[0].focus();
            }
        }
    }
};

const handleTabChange = (event: Event) => {
    event.preventDefault();

    const $target: HTMLElement = (event.target: any);
    const tabName = $target.getAttribute('aria-controls');

    if (tabName) {
        updateTab(selectedTab, false);
        updateTab(tabName, true);

        if (window.ga) {
            window.ga('send', 'event', {
                eventCategory: 'Product information tab',
                eventAction: 'change',
                eventLabel: tabName
            });
        }

        selectedTab = tabName;
    }
};

const setDefaultSelectedTab = () => {
    if (els.$tabButtons) {
        const selected = find(els.$tabButtons, $button =>
            eq($button.getAttribute('aria-selected'), 'true')
        );

        if (selected) {
            selectedTab = selected.getAttribute('aria-controls');
        }
    }
};

const events = () => {
    if (els.$tabButtons) {
        [...els.$tabButtons].map($button => {
            $button.addEventListener('click', handleTabChange);
            $button.addEventListener('keydown', handleTabChange);
        });
    }
};

const cache = () => {
    els.$tabButtons = ((document.querySelectorAll('.js-tab-button'): any): NodeList<
        HTMLButtonElement
    >);
    els.$tabPanels = ((document.querySelectorAll('.js-tab-panel'): any): NodeList<HTMLElement>);
};

const init = () => {
    cache();
    events();
    setDefaultSelectedTab();
};

export default {init};
