/**
 * @prettier
 * @/flow
 */
import throttle from 'lodash/throttle';
import Rellax from 'rellax';

type ParallaxElements = {
    $parallaxEls?: NodeList<HTMLElement>
};

const els: ProductDemoElements = {};
let rellax;

const setupParallax = () => {
    if (els.$parallaxEls.length) {
        if (rellax) {
            rellax.destroy();
        }

        rellax = new Rellax('.u-parallax');
    }
};

const events = () => {
    window.addEventListener('resize', throttle(setupParallax, 300));
};

const cache = () => {
    els.$parallaxEls = ((document.querySelectorAll('.u-parallax'): any): NodeList<HTMLElement>);
};

const init = () => {
    cache();
    events();
    setupParallax();
};

export default {
    init
};
