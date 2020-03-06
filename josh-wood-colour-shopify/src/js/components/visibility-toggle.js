/**
 * @prettier
 * @flow
 */
import anime from 'animejs';
import {intendedTargetElement} from '../services/helpers';
import {ANIMATION_DURATION, ANIMATION_EASING, SPACING_SMALL} from '../config';

type VisibilityToggleElements = {
    // $visibilityToggleItems: NodeList<HTMLElement> | null
    $visibilityToggleItems: Object | null
};

const els: VisibilityToggleElements = {
    $visibilityToggleItems: null
};

const trackToggleDisplay = (toggleLabel: string, toggleId: string, isVisible: boolean) => {
    if (window.ga) {
        const label = `${toggleLabel} | ${toggleId}`;

        window.ga('send', 'event', {
            eventCategory: 'Element display toggle',
            eventAction: isVisible ? 'Visible' : 'Hidden',
            eventLabel: label
        });
    }
};

export const setItemInvisible = ($toggle: Object, targetSelector: string) => {
    const $target = document.querySelector(targetSelector);

    if ($target && $toggle) {
        anime({
            complete: () => {
                $toggle.setAttribute('aria-expanded', 'false');
                $target.setAttribute('aria-hidden', 'true');
                $target.setAttribute('style', '');
            },
            duration: ANIMATION_DURATION / 3,
            easing: ANIMATION_EASING,
            height: 0,
            opacity: 0,
            targets: $target
        });
    }
};

export const setItemVisible = ($toggle: Object, targetSelector: string) => {
    const $target = document.querySelector(targetSelector);

    if ($target && $toggle) {
        $target.style.visibility = 'hidden';
        $target.style.display = 'block';

        const elementHeight = $target.getBoundingClientRect().height;

        $target.style.visibility = 'visible';
        $target.style.height = '0px';

        $toggle.setAttribute('aria-expanded', 'true');
        $target.setAttribute('aria-hidden', 'false');

        anime({
            duration: ANIMATION_DURATION / 2,
            easing: 'easeOutExpo',
            height: elementHeight,
            opacity: 1,
            round: true,
            targets: $target,
            translateY: [SPACING_SMALL, 0]
        });

        trackToggleDisplay($toggle.innerText, $toggle.id, true);
    }
};

const hideItem = (selector: string) => {
    if (selector) {
        const $targets = document.querySelectorAll(selector);

        if ($targets) {
            anime({
                duration: ANIMATION_DURATION / 3,
                easing: 'easeOutExpo',
                height: 0,
                opacity: 0,
                round: true,
                targets: $targets
            });
        }
    }
};

const handleVisibilityToggleClick = (event: UIEvent) => {
    if (event.target) {
        event.preventDefault();

        const $target: HTMLSelectElement = (event.target: any);
        const $toggle = intendedTargetElement('js-visibility-toggle', $target);

        if ($toggle) {
            const toggleIsExpanded = $toggle.getAttribute('aria-expanded');
            const targetSelector = $toggle.getAttribute('aria-controls');
            const targetHides = $toggle.dataset.hides;

            if (targetSelector) {
                if (toggleIsExpanded === 'false') {
                    setItemVisible($toggle, `#${targetSelector ? targetSelector : ''}`);

                    if (targetHides) {
                        hideItem(targetHides);
                    }
                } else {
                    setItemInvisible($toggle, `#${targetSelector ? targetSelector : ''}`);
                }
            }
        }
    }
};

const cache = () => {
    els.$visibilityToggleItems = document.querySelectorAll('.js-visibility-toggle');
};

const events = () => {
    if (els.$visibilityToggleItems) {
        [...els.$visibilityToggleItems].map($toggle => {
            $toggle.addEventListener('click', handleVisibilityToggleClick, false);
        });
    }
};

const init = () => {
    cache();
    events();
};

export default {init};
