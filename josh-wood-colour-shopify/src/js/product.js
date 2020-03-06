/**
 * @prettier
 * @flow
 */
import product from './components/product';
import readMore from './components/read-more';
import tabs from './components/tabs';
import tabList from './components/tab-list';

const init = () => {
    product.init();
    readMore.init();
    tabs.init();
    tabList.init();
};

if (window.isModernBrowser) {
    window.addEventListener('load', init);
}
