/**
 * @prettier
 * @flow
 */
import anime from 'animejs';
import eq from 'lodash/eq';
import get from 'lodash/get';
import throttle from 'lodash/throttle';
import {intendedTargetElement} from '../services/helpers';

type ModalElements = {
    $body?: HTMLElement,
    $html?: HTMLElement,
    $modalCloseButton?: NodeList<HTMLButtonElement>,
    $modalOpenButton?: NodeList<HTMLButtonElement>,
    $modalContainer?: HTMLElement,
    $modalWrapper?: HTMLElement
};

const els: ModalElements = {};
const ANIMATION_DURATION = 200;
const ANIMATION_OFFSET = 40;

const setDisplayStyle = () => {
    const {$modalContainer, $modalWrapper} = els;

    if ($modalContainer && $modalWrapper) {
        $modalContainer.style.visibility = 'hidden';

        const modalIsTallerThanWindow =
            $modalWrapper.getBoundingClientRect().height > window.innerHeight;

        $modalContainer.classList.toggle('c-modal--no-flex', modalIsTallerThanWindow);
        $modalContainer.style.visibility = 'visible';
    }
};

const addOutsideClickEvents = () => {
    document.addEventListener('click', handleOutsideClickEvents, false);
};
const removeOutsideClickEvents = () => {
    document.removeEventListener('click', handleOutsideClickEvents, false);
};

export const closeModal = (): void => {
    const {$body, $html, $modalCloseButton, $modalContainer, $modalWrapper} = els;

    if ($body && $modalContainer && $modalWrapper && $html) {
        removeOutsideClickEvents;

        anime
            .timeline()
            .add({
                duration: ANIMATION_DURATION / 2,
                easing: 'easeInExpo',
                opacity: [1, 0],
                targets: $modalCloseButton,
                translateY: [0, ANIMATION_OFFSET / 2]
            })
            .add({
                duration: ANIMATION_DURATION * 2.5,
                easing: 'easeInExpo',
                offset: '-=100',
                opacity: [1, 0],
                targets: $modalWrapper,
                translateY: [0, ANIMATION_OFFSET]
            })
            .add({
                complete() {
                    $body.classList.remove('u-no-scroll');
                    $html.classList.remove('u-no-scroll');
                    $modalContainer.classList.add('u-hide');
                },
                duration: ANIMATION_DURATION * 2,
                easing: 'easeInExpo',
                offset: '-=100',
                opacity: [1, 0],
                targets: $modalContainer
            });
    }
};

export const openModal = (isNonInteractive: boolean = false): void => {
    const {$body, $html, $modalCloseButton, $modalContainer, $modalWrapper} = els;

    if ($modalContainer && $body && $modalWrapper && $html) {
        $body.classList.add('u-no-scroll');
        $html.classList.add('u-no-scroll');
        $modalContainer.classList.remove('u-hide');

        addOutsideClickEvents();
        setDisplayStyle();
        // window.scrollTo(0, 0);

        anime
            .timeline()
            .add({
                duration: ANIMATION_DURATION * 2,
                easing: 'easeInExpo',
                opacity: [0, 1],
                targets: $modalContainer
            })
            .add({
                duration: ANIMATION_DURATION * 4,
                elasticity: ANIMATION_DURATION * 2,
                opacity: [0, 1],
                targets: $modalWrapper,
                translateY: [ANIMATION_OFFSET, 0]
            })
            .add({
                duration: ANIMATION_DURATION,
                easing: 'easeInExpo',
                offset: '-=800',
                opacity: [0, 1],
                targets: $modalCloseButton,
                translateY: [ANIMATION_OFFSET / 2, 0]
            });

        if (window.ga) {
            window.ga('send', 'event', {
                eventCategory: 'Overlay',
                eventAction: 'click',
                eventLabel: `Opened ${get($modalContainer, 'dataset.modal')}`,
                nonInteraction: isNonInteractive
            });
        }
    }
};

export const setActiveModal = (id: string) => {
    const $targetModal = document.querySelector(`.js-modal[data-modal="${id}"]`);

    if ($targetModal) {
        els.$modalContainer = $targetModal;
        els.$modalWrapper = (($targetModal.querySelector('.js-modal-wrapper'): any): HTMLElement);
    }
};

const handleOutsideClickEvents = (event: Event) => {
    const $target: HTMLElement = (event.target: any);
    const expectedClass = 'c-modal';

    if ($target && $target.classList.contains(expectedClass)) {
        closeModal();
    }
};

const handleOpenModal = (event: Event) => {
    event.preventDefault();

    const $target: HTMLElement = (intendedTargetElement('js-modal-open', event.target): any);

    if ($target) {
        const targetModal = get($target, 'dataset.modal');

        if (targetModal) {
            setActiveModal(targetModal);
            openModal();
        }
    }
};

const handleCloseModal = (event: Event) => {
    event.preventDefault();

    const $target: HTMLElement = (intendedTargetElement('js-modal-close', event.target): any);

    if ($target) {
        const targetModal = get($target, 'dataset.modal');
        const closeMatchesTarget = eq(get(els, '$modalContainer.dataset.modal'), targetModal);

        if (closeMatchesTarget) {
            closeModal();
        }
    }
};

const detectEscapeKeyUp = event => {
    if (event.keyCode === 27) {
        closeModal();
    }
};

const events = () => {
    if (els.$modalOpenButton) {
        [...els.$modalOpenButton].map($button =>
            $button.addEventListener('click', handleOpenModal, false)
        );
    }

    if (els.$modalCloseButton) {
        [...els.$modalCloseButton].map($button =>
            $button.addEventListener('click', handleCloseModal, false)
        );
    }

    window.addEventListener('keyup', detectEscapeKeyUp, false);
    window.addEventListener('resize', throttle(setDisplayStyle, 250), false);
};

const cache = () => {
    els.$body = ((document.body: any): HTMLElement);
    els.$html = ((document.querySelector('html'): any): HTMLElement);
    els.$modalCloseButton = ((document.querySelectorAll('.js-modal-close'): any): NodeList<
        HTMLButtonElement
    >);
    els.$modalOpenButton = ((document.querySelectorAll('.js-modal-open'): any): NodeList<
        HTMLButtonElement
    >);
};

export const init = () => {
    cache();
    events();
};

export default {init};
