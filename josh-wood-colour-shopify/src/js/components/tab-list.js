/**
 * @prettier
 * @flow
 */
import anime from 'animejs';
import eq from 'lodash/eq';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import nth from 'lodash/nth';
import {ANIMATION_DURATION, ANIMATION_EASING, SPACING} from '../config';
import {intendedTargetElement} from '../services/helpers';

type TabListElements = {
    $container?: HTMLElement,
    $panels?: NodeList<HTMLElement>,
    $tabButtons?: NodeList<HTMLButtonElement>
};

const els: TabListElements = {};
let activeTabIndex: number = -1;
let tabInterval;
let isTabbingAutomatically = true;

const trackTabDisplay = (tabComponent: string, tabId: string) => {
    if (window.ga) {
        const label = `${tabComponent} | ${tabId}`;

        window.ga('send', 'event', {
            eventCategory: 'Tab display',
            eventAction: 'Clicked',
            eventLabel: label,
            nonInteraction: isTabbingAutomatically
        });
    }
};

const setIntervalChange = () => {
    if (els.$container) {
        const timeout = parseInt(els.$container.dataset.timeout);

        if (timeout) {
            tabInterval = setInterval(setNextTabActive, timeout);
        }
    }
};

const disableIntervalChange = () => {
    if (tabInterval) {
        clearInterval(tabInterval);
        tabInterval = null;
    }
};

const setPanelInvisible = (index: number) => {
    if (els.$panels) {
        const $panel = nth([...els.$panels], index);

        if ($panel) {
            $panel.style.display = 'none';
        }
    }
};

const setPanelVisible = (index: number) => {
    if (els.$panels) {
        const $panel = nth([...els.$panels], index);

        if ($panel) {
            anime({
                begin() {
                    $panel.style.opacity = '0';
                    $panel.style.display = 'block';
                },
                duration: ANIMATION_DURATION * 2,
                easing: ANIMATION_EASING,
                opacity: [0, 1],
                targets: $panel,
                translateY: [SPACING, 0]
            });

            trackTabDisplay($panel.id, $panel.dataset.component);
        }
    }
};

const setButtonState = (index: number, selected: boolean) => {
    if (els.$tabButtons) {
        const $button = nth([...els.$tabButtons], index);

        if ($button) {
            $button.classList.toggle('c-quote-tabs__tab--active', selected);
            $button.classList.toggle('is-active', selected);
            $button.setAttribute('aria-selected', selected.toString());
        }
    }
};

const getTabIndex = selector => {
    return els.$tabButtons
        ? findIndex([...els.$tabButtons], $button => eq($button.id, `${selector}-tab`))
        : -1;
};

const changeActiveTab = (index: number) => {
    if (activeTabIndex >= 0) {
        setPanelInvisible(activeTabIndex);
        setButtonState(activeTabIndex, false);
    }

    setPanelVisible(index);
    setButtonState(index, true);

    activeTabIndex = index;
};

const handleTabClick = (event: UIEvent) => {
    if (event.target) {
        event.preventDefault();

        const $target: HTMLElement = (intendedTargetElement('js-tab', event.target): any);

        if ($target) {
            const tabIsSelected = $target.getAttribute('aria-selected');
            const targetSelector = $target.getAttribute('aria-controls');

            if (eq(tabIsSelected, 'false') && targetSelector) {
                const targetIndex = getTabIndex(targetSelector);

                if (targetIndex >= 0) {
                    isTabbingAutomatically = false;

                    changeActiveTab(targetIndex);
                    disableIntervalChange();
                }
            }
        }
    }
};

const setActiveTabIndex = () => {
    if (els.$tabButtons) {
        activeTabIndex = findIndex([...els.$tabButtons], $button =>
            eq($button.getAttribute('aria-selected'), 'true')
        );
    }
};

const isTabVisible = ($element: HTMLElement): boolean => {
    const dimensions = $element.getBoundingClientRect();

    return dimensions.width > 0 && dimensions.height > 0;
};

const getNextTabIndex = (skipCount: number = 1): number => {
    let nextTabIndex = -1;

    if (els.$tabButtons && activeTabIndex >= 0) {
        nextTabIndex =
            activeTabIndex + skipCount < [...els.$tabButtons].length
                ? activeTabIndex + skipCount
                : 0;

        const isVisible = isTabVisible(els.$tabButtons[nextTabIndex]);

        if (!isVisible) {
            return getNextTabIndex(skipCount + 1);
        }
    }

    return nextTabIndex;
};

const setNextTabActive = () => {
    const nextTabIndex = getNextTabIndex();

    if (nextTabIndex >= 0) {
        changeActiveTab(nextTabIndex);
    }
};

const cache = () => {
    els.$container = ((document.querySelector('.js-tabs-container'): any): HTMLElement);
    els.$panels = ((document.querySelectorAll('.js-panel'): any): NodeList<HTMLElement>);
    els.$tabButtons = ((document.querySelectorAll('.js-tab'): any): NodeList<HTMLButtonElement>);
};

const events = () => {
    if (els.$panels && els.$tabButtons) {
        [...els.$tabButtons].map($button =>
            $button.addEventListener('click', handleTabClick, false)
        );
    }
};

const init = () => {
    cache();
    events();
    setActiveTabIndex();
    setIntervalChange();
};

export default {init};
