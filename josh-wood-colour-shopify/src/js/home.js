/**
 * @prettier
 * @flow
 */
import React from 'react';
import {render} from 'react-dom';
import adviceTeaser from './components/advice-teaser';
import equalHeights from './components/equal-heights';
import tabList from './components/tab-list';

const init = () => {
    adviceTeaser.init();
    equalHeights.init();
    tabList.init();
};

if (window.isModernBrowser) {
    window.addEventListener('load', init);
}
