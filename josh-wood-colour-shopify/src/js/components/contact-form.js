/**
 * @prettier
 * @/flow
 */
import 'formdata-polyfill';
import anime from 'animejs';
import get from 'lodash/get';
import {ANIMATION_DURATION, ANIMATION_EASING, API_URL} from '../config';
import {formatFormDataToJSON} from '../services/helpers';

type ContactFormElements = {
    $feedbackError?: HTMLElement,
    $feedbackSuccess?: HTMLElement,
    $form?: HTMLFormElement
};

const els: ContactFormElements = {};

let canSubmit = true;
let feedback = {
    error: '',
    success: ''
};

const disableFormSubmit = () => (canSubmit = false);

const enableFormSubmit = () => (canSubmit = true);

const updateFeedback = values => {
    feedback = {...feedback, ...values};

    if (els.$feedbackError) {
        els.$feedbackError.innerHTML = feedback.error;
    }

    if (els.$feedbackSuccess) {
        els.$feedbackSuccess.innerHTML = feedback.success;
    }
};

const hideForm = () => {
    if (els.$form) {
        anime({
            duration: ANIMATION_DURATION,
            easing: ANIMATION_EASING,
            height: 0,
            opacity: 0,
            targets: els.$form
        });
    }
};

const handlePostError = (error: string) => {
    updateFeedback({error, success: ''});
    enableFormSubmit();
};

const handlePostSuccess = (response: Object) => {
    if (response) {
        const successMessage = get(
            window,
            'globalData.contactSuccessMessage',
            'Thanks, we will be in touch soon'
        );

        updateFeedback({error: '', success: successMessage});
        hideForm();
        disableFormSubmit();
    } else {
        updateFeedback({error: response.body, success: ''});
        enableFormSubmit();
    }
};

const handleFormSubmit = (event: Event) => {
    event.preventDefault();

    if (els.$form && canSubmit) {
        const data = formatFormDataToJSON(els.$form);

        disableFormSubmit();

        fetch(`${API_URL}contact/create-ticket`, {
            body: data,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post'
        })
            .then(r => r.json())
            .then(handlePostSuccess, handlePostSuccess)
            .catch(handlePostSuccess);
    }
};

const events = () => {
    if (els.$form) {
        els.$form.addEventListener('submit', handleFormSubmit);
    }
};

const cache = () => {
    els.$feedbackError = ((document.querySelector('.js-contact-feedback-error'): any): HTMLElement);
    els.$feedbackSuccess = ((document.querySelector(
        '.js-contact-feedback-success'
    ): any): HTMLElement);
    els.$form = ((document.querySelector('.js-contact-form'): any): HTMLFormElement);
};

const init = () => {
    cache();
    events();
};

export default {init};
