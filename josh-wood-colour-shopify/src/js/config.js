/**
 * @prettier
 * @flow
 */
export const SPACING = 24;
export const SPACING_SMALL = 12;
export const SPACING_TINY = 8;

export const CHAT_BUBBLE_SPRING = {
    damping: 17,
    stiffness: 140
};
export const CHAT_BUBBLE_SLOW_SPRING = {
    damping: 18,
    stiffness: 90
};

export const ANIMATION_DURATION = 600;
export const ANIMATION_EASING = 'easeOutExpo';
export const ANIMATION_ELASTICITY = ANIMATION_DURATION / 3;

export const API_URL = 'https://api.joshwoodcolour.com/';

export const CONSULTATION_LANDING_URL = '/pages/consultation';
export const CONSULTATION_RESULTS_URL = '/pages/consultation-results';
export const CONSULTATION_STORAGE_KEY = 'jwc-consultation-answers';
