/**
 * @prettier
 * @flow
 */
import React from 'react';
import {render} from 'react-dom';
import get from 'lodash/get';
import map from 'lodash/map';
import anime from 'animejs';
import Consultation from 'consultation';
import {questions} from './components/consultation-questions';
import {hasConsent} from './services/cookie-consent';
import {preloadImages} from './services/helpers';
import {
    ANIMATION_DURATION,
    API_URL,
    CONSULTATION_RESULTS_URL,
    CONSULTATION_STORAGE_KEY,
    SPACING
} from './config';
import {addToCart} from './components/cart';

type ConsultationElements = {
    $consultationErrorMessage?: HTMLElement,
    $openButton?: HTMLButtonElement,
    $retrieveContainer?: HTMLElement,
    $retrieveButton?: HTMLLinkElement,
    $retrieveErrorMessage?: HTMLElement,
    $retrieveForm?: HTMLFormElement,
    $retrieveInput?: HTMLInputElement
};

const els: ConsultationElements = {};

const preloadSwatchImages = () => {
    const images = get(window, 'globalData.shadeSwatchImages');

    if (images) {
        preloadImages(Object.values(images));
    }
};

const showRetrieveErrorMessage = (message: string) => {
    if (els.$retrieveErrorMessage) {
        els.$retrieveErrorMessage.innerText = message;
    }
};

const handleRetrieveError = (response: Object) => {
    if (response.errors && response.errors[0].title === 'Resource Not Found') {
        showRetrieveErrorMessage("Sorry, we can't find that email address in our records.");
    } else {
        showRetrieveErrorMessage(
            'Sorry, there was an error retrieving your recommendations. Please try again.'
        );
    }
};

const handleRetrieveSuccess = (response: Object) => {
    let questionId = 0;

    const formattedResponse = map(response, (value, name) => {
        questionId++;

        return {
            questionId,
            name: name,
            value: value
        };
    });

    window.localStorage.setItem(CONSULTATION_STORAGE_KEY, JSON.stringify(formattedResponse));
    window.location = CONSULTATION_RESULTS_URL;
};

const handleRetrieveFormSubmit = (event: Event) => {
    event.preventDefault();

    if (els.$retrieveInput) {
        const email = els.$retrieveInput.value;

        fetch(`${API_URL}consultation/retrieve`, {
            body: JSON.stringify({email}),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post'
        })
            .then(response => response.json())
            .then((response: Object) => {
                if (!response.errors) {
                    handleRetrieveSuccess(response);
                } else {
                    handleRetrieveError(response);
                }
            })
            .catch(showRetrieveErrorMessage);
    } else {
        showRetrieveErrorMessage(
            'Sorry, there was an error reading your email address. Please try again.'
        );
    }
};

const handleRetrieveFormShow = (event: MouseEvent) => {
    event.preventDefault();

    const {$retrieveButton, $retrieveForm} = els;

    if ($retrieveForm && $retrieveButton) {
        $retrieveButton.style.display = 'none';

        anime({
            begin() {
                $retrieveForm.style.height = 'auto';
            },
            duration: ANIMATION_DURATION,
            easing: 'easeOutExpo',
            opacity: [0, 1],
            targets: $retrieveForm,
            translateY: [SPACING, 0]
        });
    }
};

const setRetrieveCTAAction = () => {
    if (!hasConsent('necessary')) {
        if (els.$retrieveContainer) {
            els.$retrieveContainer.style.display = 'none';
        }
    } else {
        if (window) {
            const hasResultsInBrowser = window.localStorage.getItem(CONSULTATION_STORAGE_KEY);

            if (hasResultsInBrowser && els.$retrieveButton) {
                els.$retrieveButton.href = CONSULTATION_RESULTS_URL;
            } else if (els.$retrieveButton) {
                els.$retrieveButton.addEventListener('click', handleRetrieveFormShow, false);
            }
        }
    }
};

const setButtonContinueState = () => {
    const $openButton = els.$openButton;

    if ($openButton) {
        setTimeout(() => {
            const CTALabelDefaultText = get(
                window,
                'globalData.consultationCTALabel',
                'Start your consultation'
            );

            $openButton.innerHTML = $openButton.innerHTML.replace(
                CTALabelDefaultText,
                'Continue consultation'
            );
            $openButton.blur();
        }, 1000);
    }
};

const openConsultation = () => {
    if (!hasConsent('necessary')) {
        if (els.$consultationErrorMessage) {
            els.$consultationErrorMessage.innerHTML =
                'Sorry – you must enable cookies to have your Consultation. To change your cookie preferences view our <a href="/pages/cookie-policy" class="u-underline">cookie policy</a>.';
        }

        return;
    }

    const $container = document.querySelector('#consultation-container');

    console.log(Consultation, $container);

    if ($container) {
        Consultation($container, addToCart);

        setButtonContinueState();
    }
};

const handleConsentAccept = () => {
    if (els.$openButton) {
        els.$openButton.dataset.modal = 'consultation';
    }

    if (els.$consultationErrorMessage) {
        els.$consultationErrorMessage.innerText = '';
    }
};

const setConsentBehaviour = () => {
    if (!hasConsent('necessary')) {
        if (els.$openButton) {
            els.$openButton.dataset.modal = '';
        }

        window.handleConsentAccept = handleConsentAccept;
    }
};

const events = () => {
    if (els.$openButton) {
        els.$openButton.addEventListener('click', openConsultation, false);
    }

    if (els.$retrieveForm) {
        els.$retrieveForm.addEventListener('submit', handleRetrieveFormSubmit, false);
    }
};

const cache = () => {
    els.$consultationErrorMessage = ((document.querySelector(
        '.js-consultation-error'
    ): any): HTMLElement);
    els.$openButton = ((document.querySelector('.js-consultation-open'): any): HTMLButtonElement);
    els.$retrieveContainer = ((document.querySelector('.js-retrieve-container'): any): HTMLElement);
    els.$retrieveButton = ((document.querySelector(
        '.js-consultation-retrieve'
    ): any): HTMLLinkElement);
    els.$retrieveErrorMessage = ((document.querySelector('.js-retrieve-error'): any): HTMLElement);
    els.$retrieveForm = ((document.querySelector('.js-retrieve-form'): any): HTMLFormElement);
    els.$retrieveInput = ((document.querySelector('.js-retrieve-input'): any): HTMLInputElement);
};

const init = () => {
    cache();
    events();
    setConsentBehaviour();
    setRetrieveCTAAction();
    preloadSwatchImages();
    openConsultation();
};

if (window.isModernBrowser) {
    window.addEventListener('load', init);
}

export default {init};
