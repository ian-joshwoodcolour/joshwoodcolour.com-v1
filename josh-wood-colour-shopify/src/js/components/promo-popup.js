/**
 * @prettier
 * @flow
 */
import 'formdata-polyfill';
import anime from 'animejs';
import Clipboard from 'clipboard';
import Cookie from 'js-cookie';
import get from 'lodash/get';
import jsonp from 'jsonp';
import select from 'select';
import {closeModal, init as modalInit, openModal, setActiveModal} from './modal';
import {formatFormDataToParams} from '../services/helpers';
import {ANIMATION_DURATION, ANIMATION_EASING, SPACING_SMALL} from '../config';

type PromoPopupElements = {
    $copyDiscountCTA?: HTMLButtonElement,
    $copyDiscountTarget?: HTMLInputElement,
    $closeButtons?: NodeList<HTMLElement>,
    $feedback?: HTMLElement,
    $form?: HTMLFormElement,
    $formContainer?: HTMLElement,
    $formSuccessContainer?: HTMLElement,
    $links?: NodeList<HTMLLinkElement>,
    $primaryCTA?: HTMLElement,
    $secondaryCTA?: HTMLElement,
    $wrapper?: HTMLElement
};

const PROMO_OPTIONS = {
    ...{
        cookieDuration: 365,
        isActive: false,
        isEmailCapture: false,
        modalTimeout: 5000,
        primaryCTAURL: '',
        secondaryCTAURL: '',
        title: ''
    },
    ...get(window, 'globalData.promoPopup', {})
};
const PROMO_MODAL_ID = 'promo-popup';
const PROMO_COOKIE_ID = 'jwc-promo-popup';

const els: PromoPopupElements = {};
let feedback = '';
let clipboard;

const trackAction = (action: string, label: string = '', isNonInteractive: boolean = false) => {
    if (window.ga) {
        window.ga('send', 'event', {
            eventCategory: `Promo PopUp – ${PROMO_OPTIONS.title}`,
            eventAction: action,
            eventLabel: label,
            nonInteraction: isNonInteractive
        });
    }
};

const updateFeedback = (value = '') => {
    feedback = value;

    if (els.$feedback) {
        els.$feedback.innerHTML = feedback;
    }
};

const getCookie = () => Cookie.get(PROMO_COOKIE_ID);

const setCookie = () => {
    Cookie.set(PROMO_COOKIE_ID, PROMO_OPTIONS.title, {
        expires: parseInt(PROMO_OPTIONS.cookieDuration)
    });
};

const handleCopiedToClipboardFallback = () => {
    if (els.$copyDiscountTarget) {
        select(els.$copyDiscountTarget);

        if (els.$copyDiscountCTA) {
            els.$copyDiscountCTA.innerText = 'Sorry, please copy the selected the text';
        }
    }
};

const handleCopiedToClipboard = () => {
    const {$copyDiscountCTA} = els;

    if ($copyDiscountCTA) {
        let copyDiscountCTAText;

        copyDiscountCTAText = $copyDiscountCTA.innerText;
        $copyDiscountCTA.classList.remove('u-color-grey');
        $copyDiscountCTA.innerText = 'Copied!';

        setTimeout(() => {
            $copyDiscountCTA.classList.add('u-color-grey');
            $copyDiscountCTA.innerText = copyDiscountCTAText;
        }, 1500);
    }
};

const handleModalClose = () => {
    setCookie();
    trackAction('Close');
    closeModal();
};

const showPromotion = () => {
    setActiveModal(PROMO_MODAL_ID);
    openModal(true);
    trackAction('Open', '', true);
};

const handleLinkClick = () => {
    trackAction('Info link click', PROMO_OPTIONS.primaryCTAURL);
    setCookie();
};

const handlePrimaryCTAClick = () => {
    trackAction('Primary CTA click', PROMO_OPTIONS.primaryCTAURL);
    setCookie();
};

const handleSecondaryCTAClick = () => {
    trackAction('Secondary CTA click', PROMO_OPTIONS.secondaryCTAURL);
    setCookie();
};

const formatFormAction = (url: string): string => {
    return url.includes('list-manage')
        ? url.replace('subscribe/post?', 'subscribe/post-json?')
        : url;
};

const getError = (error, response) => {
    if (error) {
        return error;
    } else if (response.result === 'error') {
        if (!response.msg.includes('is already subscribed to list')) {
            return response.msg;
        }
    }
};

const handlePostError = (message: string) => {
    updateFeedback(message);
};

const handlePostSuccess = (message: string) => {
    trackAction('Form Posted');
    setCookie();
    updateFeedback();

    const {$formContainer, $formSuccessContainer, $wrapper} = els;

    if ($formContainer && $formSuccessContainer && $wrapper) {
        const timeline = anime.timeline();

        timeline
            .add({
                complete() {
                    $formContainer.classList.add('u-hide');
                    $formSuccessContainer.classList.remove('u-hide');
                },
                duration: ANIMATION_DURATION,
                easing: ANIMATION_EASING,
                opacity: [1, 0],
                targets: $wrapper
            })
            .add({
                delay: 50,
                duration: ANIMATION_DURATION * 2,
                easing: ANIMATION_EASING,
                opacity: [0, 1],
                targets: $wrapper
            });
    }
};

const handleFormSubmit = (event: Event) => {
    event.preventDefault();

    const {$form} = els;

    if ($form) {
        const data = formatFormDataToParams($form);
        const action = formatFormAction($form.action);
        const postURL = `${action}${action.includes('?') ? '&' : '?'}${data}`;

        jsonp(postURL, {param: 'c'}, (err, response) => {
            const error = getError(err, response);

            if (error) {
                handlePostError(error);
            } else {
                handlePostSuccess(response.msg);
            }
        });
    }
};

const hasActiveCookie = () => {
    const cookie = getCookie();

    return cookie && cookie === PROMO_OPTIONS.title;
};

const events = () => {
    if (els.$copyDiscountCTA) {
        clipboard = new Clipboard('.js-copy');

        clipboard.on('success', handleCopiedToClipboard);
        clipboard.on('error', handleCopiedToClipboardFallback);
    }

    if (els.$closeButtons) {
        [...els.$closeButtons].map($button =>
            $button.addEventListener('click', handleModalClose, false)
        );
    }

    if (els.$form) {
        els.$form.addEventListener('submit', handleFormSubmit);
    }

    if (els.$links) {
        [...els.$links].map($link => $link.addEventListener('click', handleLinkClick, false));
    }

    if (els.$primaryCTA) {
        els.$primaryCTA.addEventListener('click', handlePrimaryCTAClick, false);
    }

    if (els.$secondaryCTA) {
        els.$secondaryCTA.addEventListener('click', handleSecondaryCTAClick, false);
    }
};

const cache = () => {
    els.$closeButtons = ((document.querySelectorAll('.js-modal-promo-popup-close'): any): NodeList<
        HTMLElement
    >);
    els.$feedback = ((document.querySelector('.js-promo-popup-feedback'): any): HTMLElement);
    els.$links = ((document.querySelectorAll(
        '.js-modal[data-modal="promo-popup"] a:not(.c-button)'
    ): any): NodeList<HTMLLinkElement>);
    els.$primaryCTA = ((document.querySelector('.js-promo-popup-primary-cta'): any): HTMLElement);
    els.$secondaryCTA = ((document.querySelector(
        '.js-promo-popup-secondary-cta'
    ): any): HTMLElement);

    if (PROMO_OPTIONS.isEmailCapture) {
        els.$copyDiscountCTA = ((document.querySelector('.js-copy'): any): HTMLButtonElement);
        els.$copyDiscountTarget = ((document.querySelector(
            '.js-copy-target'
        ): any): HTMLInputElement);
        els.$form = ((document.querySelector('.js-promo-popup-form'): any): HTMLFormElement);
        els.$formContainer = ((document.querySelector(
            '.js-promo-popup-form-container'
        ): any): HTMLFormElement);
        els.$formSuccessContainer = ((document.querySelector(
            '.js-promo-popup-form-success'
        ): any): HTMLFormElement);
        els.$wrapper = ((document.querySelector('.js-promo-popup-wrapper'): any): HTMLElement);
    }
};

const init = () => {
    if (PROMO_OPTIONS.isActive) {
        if (!hasActiveCookie()) {
            modalInit();
            cache();
            events();
            setTimeout(showPromotion, PROMO_OPTIONS.modalTimeout);
        }
    }
};

export default {init};
