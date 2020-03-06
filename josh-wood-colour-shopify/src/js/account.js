/**
 * @prettier
 */
import account from './components/account';

const init = () => {
    account.init();
};

if (window.isModernBrowser) {
    window.addEventListener('load', init);
}
