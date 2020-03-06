/**
 * @prettier
 * @flow
 */
const init = () => {
    const $html = document.querySelector('html');

    if ($html) {
        $html.classList.remove('no-js');
        $html.classList.add('has-js');
    }
};

export default {init};
