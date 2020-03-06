/**
 * @prettier
 * @flow
 */
import React, {Component} from 'react';
import {getPrice, preloadImages} from '../../services/helpers';
import AddToCartButton from './AddToCartButton';
import {Watch} from 'scrollmonitor-react';

type Props = {
    handleClick: Function,
    isInViewport: boolean,
    reason: string,
    products: Array<JWCConsultationRecommendation>,
    stopWatcher: Function,
    subtitle: string,
    title: string
};

export class ConsultationCareAndConcealerRecommendation extends Component<Props, null> {
    componentDidMount() {
        const images = this.props.products.map(product => product.image);

        setTimeout(() => preloadImages(images), 2000);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (this.props.isInViewport === false && nextProps.isInViewport === true) {
            this.props.stopWatcher();
        }
    }

    render() {
        const {handleClick, isInViewport, reason, products, subtitle, title} = this.props;

        return (
            <section className="o-section o-wrapper">
                <div className="u-6/12@mobile u-4/12@desktop">
                    <h3 className="u-heading u-mb qa-title">{title}</h3>
                    <h4 className="u-heading u-h6 u-mb u-spacing-0 qa-subtitle">{subtitle}</h4>

                    <p className="qa-reason">{reason}</p>
                </div>

                <div
                    className="o-layout o-layout--huge o-layout--products2 o-layout--left-right-cols u-text-right u-stack-layout@mobile u-mt+"
                    data-size={products.length}
                >
                    {products.map((product, index) => (
                        <div
                            className={`o-layout__item u-4/12@mobile u-text-center u-fade-intersected ${
                                isInViewport ? 'u-in-viewport' : ''
                            }`}
                            key={`product-${index}`}
                        >
                            <a href={`/products/${product.key}`} target="noopener">
                                <div className="c-card c-card--hover c-card--default c-card--no-max u-mb">
                                    <div className="c-card__image-wrapper">
                                        <div
                                            className="c-card__image qa-image"
                                            style={{
                                                backgroundImage: isInViewport
                                                    ? `url(${product.image})`
                                                    : null,
                                                backgroundPosition: 'center center'
                                            }}
                                        />
                                    </div>
                                </div>
                            </a>

                            <a
                                href={`/products/${product.key}`}
                                className="u-mb-- qa-url u-weight-bold qa-heading2"
                                target="noopener"
                            >
                                {product.title}
                            </a>
                            <br />

                            <div className="u-weight-bold qa-price">{getPrice(product.price)}</div>

                            <AddToCartButton
                                handleClick={handleClick}
                                size="small u-mt-"
                                variantId={product.variantId}
                            />
                        </div>
                    ))}
                </div>
            </section>
        );
    }
}

export default Watch(ConsultationCareAndConcealerRecommendation);
