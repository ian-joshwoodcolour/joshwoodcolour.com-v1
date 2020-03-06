/**
 * @prettier
 * @flow
 */
import React from 'react';
import {render} from 'react-dom';
import {CONSULTATION_LANDING_URL, CONSULTATION_STORAGE_KEY} from './config';
import {hasConsent} from './services/cookie-consent';
import cart from './components/cart';
import consultationResults from './components/consultation-results';
import ConsultationRecommendations from './components/react/ConsultationRecommendations';

const init = () => {
    if (!hasConsent('necessary')) {
        alert('Sorry – you must enable cookies to retrieve your Consultation results');
        return;
    }

    const answers = JSON.parse(window.localStorage.getItem(CONSULTATION_STORAGE_KEY));

    if (answers) {
        const $container = document.querySelector('#consultation-results-container');

        if ($container) {
            const results = consultationResults(answers);

            render(<ConsultationRecommendations answers={answers} results={results} />, $container);

            cart.init();
        }
    } else if (typeof window !== 'undefined') {
        window.location = CONSULTATION_LANDING_URL;
    }
};

if (window.isModernBrowser) {
    window.addEventListener('load', init);
}
