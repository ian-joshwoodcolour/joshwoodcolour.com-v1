/**
 * @prettier
 * @flow
 */
import anime from 'animejs';
import {ANIMATION_DURATION, ANIMATION_EASING} from '../config';

type ReadMoreElements = {
    $toggles?: NodeList<HTMLButtonElement>
};

const els: ReadMoreElements = {};

const showDetails = ($toggle: HTMLButtonElement) => {
    if ($toggle) {
        const $targetParent = document.querySelector(
            `[data-read-more="${$toggle.dataset.target}"]`
        );

        if ($targetParent) {
            const $teaser = $targetParent.querySelector('.js-read-more-teaser');
            const $actual = $targetParent.querySelector('.js-read-more');

            if ($teaser && $actual) {
                const teaserHeight = $teaser.getBoundingClientRect().height;
                let actualHeight;

                $teaser.setAttribute('data-open', 'true');
                $actual.setAttribute('data-open', 'true');
                $teaser.setAttribute('data-original-height', `${teaserHeight}`);

                $targetParent.style.height = `${teaserHeight}px`;
                $actual.style.height = 'auto';

                actualHeight = $actual.getBoundingClientRect().height;
                $actual.style.height = `${teaserHeight}px`;
                $targetParent.style.height = `${actualHeight}px`;
                $teaser.style.display = 'none';

                [$actual, $targetParent].map($el => {
                    anime({
                        duration: ANIMATION_DURATION / 2,
                        easing: ANIMATION_EASING,
                        height: [teaserHeight, actualHeight],
                        targets: $el
                    });
                });
            }
        }
    }
};

const hideDetails = ($toggle: HTMLButtonElement) => {
    if ($toggle) {
        const $targetParent = document.querySelector(
            `[data-read-more="${$toggle.dataset.target}"]`
        );

        if ($targetParent) {
            const $teaser = $targetParent.querySelector('.js-read-more-teaser');
            const $actual = $targetParent.querySelector('.js-read-more');

            if ($teaser && $actual) {
                const teaserHeight = $teaser.getBoundingClientRect().height;
                const originalHeight = $teaser.dataset.originalHeight;

                $teaser.setAttribute('data-open', 'false');
                $actual.setAttribute('data-open', 'false');

                [$actual, $targetParent].map($el => {
                    anime({
                        begin() {
                            $teaser.style.display = 'block';
                            $actual.style.height = '0px';
                        },
                        duration: ANIMATION_DURATION,
                        easing: ANIMATION_EASING,
                        height: [teaserHeight, originalHeight],
                        targets: $el
                    });
                });
            }
        }
    }
};

const handleToggleClick = (event: MouseEvent) => {
    event.preventDefault();

    const $target: HTMLButtonElement = (event.target: any);

    if ($target) {
        const action = $target.dataset.action;

        if (action === 'more') {
            showDetails($target);
        } else {
            hideDetails($target);
        }
    }
};

const events = () => {
    if (els.$toggles) {
        [...els.$toggles].map($toggle =>
            $toggle.addEventListener('click', handleToggleClick, false)
        );
    }
};

const cache = () => {
    els.$toggles = ((document.querySelectorAll('.js-read-more-cta'): any): NodeList<
        HTMLButtonElement
    >);
};

const init = () => {
    cache();
    events();
};

export default {init};
