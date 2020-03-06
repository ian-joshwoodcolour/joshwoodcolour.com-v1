/**
 * @prettier
 * @flow
 */
import hasJS from './components/has-js';
import cart from './components/cart';
import contactForm from './components/contact-form';
import detectViewportScale from './components/detect-viewport-scale';
import heroBannerCarousel from './components/hero-banner-carousel';
import overlappedImages from './components/overlapped-images';
import overlayNavigation from './components/overlay-navigation';
import modal from './components/modal';
import parallax from './components/parallax';
import promoPopup from './components/promo-popup';
import scrollMonitor from './components/scroll-monitor';
import scrollTo from './components/scroll-to';
import sticky from './components/sticky';
import visibilityToggle from './components/visibility-toggle';
import colourGrid from './colour-grid';
import '../sass/main.scss';

const init = () => {
    hasJS.init();
    detectViewportScale.init();
    heroBannerCarousel.init();
    overlappedImages.init();
    overlayNavigation.init();
    modal.init();
    parallax.init();
    scrollMonitor.init();
    scrollTo.init();
    sticky.init();
    visibilityToggle.init();
    promoPopup.init();
    contactForm.init();
    cart.init();
    colourGrid.init();
};

if (window.isModernBrowser) {
    window.addEventListener('load', init);
}
