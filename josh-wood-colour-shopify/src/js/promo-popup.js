/**
 * @prettier
 * @flow
 */
import promoPopup from './components/promo-popup';

const init = () => {
    promoPopup.init();
};

/**
 * Don't show the popup when in Shopify admin as it causes continual refreshes when editing, which is sloooow.
 * There's no tag or anything for knowing if we're in the admin, but it does the site within an iframe so
 * let's check for that.
 */
const isInIframe = window.self !== window.top;

if (window.isModernBrowser && !isInIframe) {
    window.addEventListener('load', init);
}
