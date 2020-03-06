/**
 * @prettier
 * @flow
 */
import scrollMonitor from 'scrollmonitor';

type ScrollMonitorElements = {
    $items?: NodeList<HTMLElement>
};

const els: ScrollMonitorElements = {};

export const SCROLL_MONITOR_OFFSET = -150;

const handleItemEnterViewport = (event, item) => {
    const element = item.watchItem;

    element.classList.add('u-in-viewport');

    if (element.tagName === 'IMG') {
        element.src = element.dataset.src;
    }
};

const createMonitors = () => {
    if (els.$items) {
        [...els.$items].map($item => {
            const monitor = scrollMonitor.create($item, SCROLL_MONITOR_OFFSET);

            monitor.enterViewport(handleItemEnterViewport);
        });
    }
};

const cache = () => {
    els.$items = ((document.querySelectorAll('.js-monitor'): any): NodeList<HTMLElement>);
};

const init = () => {
    cache();
    createMonitors();
};

export default {init};
