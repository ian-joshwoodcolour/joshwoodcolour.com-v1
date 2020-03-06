/**
 * @prettier
 */
import React from 'react';
import {render} from 'react-dom';
import ColourGrid from './components/react/ColourGrid';

const init = () => {
    const {view} = window.globalData;
    if (view === 'consultation-tool-intro') {
        render(<ColourGrid />, document.querySelector('#colour-grid'));
    }
};

export default {init};
