/**
 * @prettier
 */
const defaultConsent = {
    consented: false,
    consent: {
        marketing: false,
        necessary: true,
        preferences: false,
        stamp: '0',
        statistics: false
    },
    cookieEnabled: false,
    declined: false
};

const consent =
    typeof window !== 'undefined' && window.CookieConsent ? window.CookieConsent : defaultConsent;

export const hasConsent = category =>
    consent.cookieEnabled && consent.consent.stamp !== '0' && consent.consent[category];

export default consent;
