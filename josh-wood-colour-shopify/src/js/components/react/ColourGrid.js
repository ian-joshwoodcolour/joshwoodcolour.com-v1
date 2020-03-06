/**
 * @prettier
 */
import React from 'react';
import Masonry from 'react-masonry-component';
import ReactTooltip from 'react-tooltip';

import {colourGridConf} from '../colour-grid-conf';

const ColourGrid = () => (
    <div>
        <Masonry onLayoutComplete={() => ReactTooltip.rebuild()}>
            {colourGridConf.map((image, i) => (
                <div className="u-4/12@mobile u-6/12" data-tip={image.tooltipText}>
                    <img className="u-1/1" src={image.imageUrl} />
                </div>
            ))}
        </Masonry>
        <ReactTooltip place="top" type="dark" effect="float" />
    </div>
);

export default ColourGrid;
