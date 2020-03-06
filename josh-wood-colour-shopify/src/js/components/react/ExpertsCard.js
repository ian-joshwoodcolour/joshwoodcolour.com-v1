/**
 * @prettier
 * @/flow
 */
import React, {Component} from 'react';
import {Watch} from 'scrollmonitor-react';

type Props = {
    data: Expert,
    isInViewport: boolean,
    offsets: number,
    stopWatcher: Function,
    titlePosition: string
};
type State = {};

export class ExpertsCard extends Component<Props, State> {
    constructor(props?: Props) {
        super(props);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (this.props.isInViewport === false && nextProps.isInViewport === true) {
            this.props.stopWatcher();
        }
    }

    render() {
        const {data, isInViewport, titlePosition} = this.props;

        return (
            <div
                className="c-card c-card--default"
                itemScope
                itemProp="Person"
                itemType="http://schema.org/Person"
            >
                <div
                    className={`c-card__image-wrapper u-fade-intersected ${
                        isInViewport ? 'u-in-viewport' : ''
                    }`}
                >
                    <a
                        href={data.profileLink}
                        className={`c-card__title c-card__title--${titlePosition}`}
                    >
                        <h2 className="u-h3 u-heading" itemProp="name">
                            {data.name}
                        </h2>

                        {data.role ? <span itemProp="jobTitle">{data.role}</span> : <br />}
                    </a>
                    <a
                        href={data.profileLink}
                        style={{
                            backgroundImage: isInViewport ? `url(${data.photo})` : null,
                            backgroundPosition: 'top center'
                        }}
                        className="c-card__image"
                    />

                    <div className="u-hide">
                        <span itemProp="worksFor" itemType="http://schema.org/Organization">
                            Josh Wood Colour
                        </span>
                        <span itemProp="image">{data.photo}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Watch(ExpertsCard);
