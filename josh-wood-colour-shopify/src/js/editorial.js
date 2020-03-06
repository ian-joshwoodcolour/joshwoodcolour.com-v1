/**
 * @prettier
 * @flow
 */
import relatedContent from './components/related-content';
import responsiveVideo from './components/responsive-video';

const init = () => {
    relatedContent.init();
    responsiveVideo.init();
};

if (window.isModernBrowser) {
    window.addEventListener('load', init);
}
