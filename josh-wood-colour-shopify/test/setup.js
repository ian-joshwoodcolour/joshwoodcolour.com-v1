/**
 * @prettier
 *
 * Example setup file taken from:
 * - https://github.com/lelandrichardson/enzyme-example-mocha
 * - https://github.com/airbnb/enzyme/issues/942
 */

const jsdom = require('jsdom');
const configure = require('enzyme').configure;
const Adapter = require('enzyme-adapter-react-16');

configure({adapter: new Adapter()});

const {JSDOM} = jsdom;
const {document} = new JSDOM('').window;

global.document = document;
global.window = document.defaultView;

const exposedProperties = ['window', 'navigator', 'document'];

Object.keys(document.defaultView).forEach(property => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js'
};

global.HTMLElement = () => {};

global.window.localStorage = {
    getItem(key) {
        return this[key];
    },
    setItem(key, value) {
        this[key] = value;
    }
};

global.Image = window.Image;
