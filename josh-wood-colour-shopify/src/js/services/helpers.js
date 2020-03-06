/**
 * @prettier
 * @/flow
 */
import get from 'lodash/get';
import round from 'lodash/round';

(function(window) {
    if (typeof Event !== 'undefined') {
        try {
            new MouseEvent('test');

            return false;
        } catch (e) {}

        const MouseEvent = function(eventType, params = {bubbles: false, cancelable: false}) {
            const mouseEvent = document.createEvent('MouseEvent');

            mouseEvent.initMouseEvent(
                eventType,
                params.bubbles,
                params.cancelable,
                window,
                0,
                0,
                0,
                0,
                0,
                false,
                false,
                false,
                false,
                0,
                null
            );

            return mouseEvent;
        };

        MouseEvent.prototype = Event.prototype;

        window.MouseEvent = MouseEvent;
    }
})(window);

/**
 * Still figuring out Flow types - will come back to this!
 * - For recursive functions, how do we define return types for a specific value or the function?
 * - How can HTMLElement types reference their 'possibly null' parentNode values?
 */
export const intendedTargetElement = (
    selector: string,
    element: Object
): HTMLElement | intendedTargetElement => {
    if (element && !element.classList.contains(selector)) {
        if (element.parentNode) {
            return intendedTargetElement(selector, element.parentNode);
        }
    }

    return element;
};

export const throttle = (func: Function, wait: number = 100) => {
    let timer = null;

    return (...args: Array<mixed>) => {
        if (timer === null) {
            timer = setTimeout(() => {
                func.apply(this, args);
                timer = null;
            }, wait);
        }
    };
};

export const lerp = (a: number, b: number, f: number = 0.1) => (1 - f) * a + f * b;

export const getPrice = (value: number, currency: string = '£', roundBy: number = 100): string => {
    return `${currency}${round(value / roundBy, 2)}`;
};

export const preloadImages = (images: Array<string> = []): void => {
    images.map(imageURL => {
        if (typeof Image !== undefined) {
            let image = new Image();

            image.src = imageURL;
        }
    });
};

export const triggerMouseEvent = ($element: HTMLElement, eventType: string = 'click') => {
    const event = new MouseEvent(eventType, {
        bubbles: true,
        cancelable: true,
        view: window
    });

    const canceled = !$element.dispatchEvent(event);
};

export const handleFetchErrors = (response: Object) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};

export const getFetchParams = (data: Object, method: string = 'get'): Object => {
    let params = {
        credentials: 'same-origin',
        headers: {Accept: 'application/json', 'content-type': 'application/json'},
        method
    };

    if (data) {
        params = {
            ...params,
            method: 'post',
            body: JSON.stringify(data)
        };
    }

    return params;
};

export const getShadeFromProductName = (title: string = ''): string => {
    const matches = title.match(/[\d\.]+/g);

    if (matches) {
        const match = matches.join('');

        return match;
    }

    return '';
};

export const formatFormDataToJSON = ($form: HTMLFormElement): string => {
    const formData = new FormData($form);
    let formattedData = {};

    for (let pair of formData.entries()) {
        formattedData[pair[0]] = pair[1];
    }

    return JSON.stringify(formattedData);
};

export const formatFormDataToParams = ($form: HTMLFormElement): string => {
    const formData = new FormData($form);
    let formattedData = [];

    for (let pair of formData.entries()) {
        formattedData.push(`${pair[0]}=${pair[1]}`);
    }

    return formattedData.join('&');
};

export const isIE = () => {
    if (typeof navigator !== 'undefined') {
        const userAgent = get(navigator, 'userAgent', '').includes('MSIE');
        const appVersion = get(navigator, 'appVersion', '').includes('Trident/');

        return userAgent || appVersion;
    }
};
