/**
 * @prettier
 * @/flow
 */
import React from 'react';
import {render} from 'react-dom';
import ExpertsList from './components/react/ExpertsList';

const init = () => {
    const {content, view} = window.globalData;

    if (view === 'experts-list') {
        render(<ExpertsList content={content} />, document.querySelector('#experts-content'));
    }
};

if (window.isModernBrowser) {
    window.addEventListener('load', init);
}
