/**
 * @prettier
 * @flow
 */
const getViewportScale = () => {
    let viewportWidth = 0;

    if (document.documentElement) {
        viewportWidth = document.documentElement.clientWidth;
    }

    if (screen.width > viewportWidth) {
        return 1;
    }

    const screenWidth = screen.width > screen.height ? screen.height : screen.width;
    const viewportScale = screenWidth / window.innerWidth;

    return viewportScale;
};

const trackViewportScale = () => {
    const scale = getViewportScale();

    if (window.ga) {
        window.ga('send', 'event', {
            eventCategory: 'Viewport scale',
            eventAction: 'page load',
            eventLabel: scale,
            nonInteraction: true
        });
    }
};

const init = () => {
    trackViewportScale();
};

export default {init};
