/**
 * @prettier
 * @flow
 */
import React from 'react';
import last from 'lodash/last';
import replace from 'lodash/replace';
import split from 'lodash/split';
import {Motion, spring} from 'react-motion';
import {getPrice} from '../../services/helpers';
import {CHAT_BUBBLE_SPRING, SPACING} from '../../config';
import {getShadeFromProductName} from '../../services/helpers';
import AddToCartButton from './AddToCartButton';

type Props = {
    boxImage: string,
    handleClick: Function,
    reason: string,
    product: JWCConsultationRecommendation
};

const ConsultationPermanentRecommendation = ({boxImage, handleClick, reason, product}: Props) => (
    <section className="c-consultation u-mt+ u-mt--@tablet">
        <div className="o-layout u-flex@mobile u-align-items-center c-product__permanent-recommendation">
            <div className="o-layout__item u-5/12 u-7/12@mobile u-text-center u-align-right@mobile">
                <Motion
                    defaultStyle={{
                        opacity: 0,
                        x: SPACING * 5
                    }}
                    style={{
                        opacity: spring(1, {damping: 14, stiffness: 40}),
                        x: spring(0, {damping: 14, stiffness: 40})
                    }}
                >
                    {({opacity, x}) => (
                        <div
                            className="u-heading c-consultation__permanent-shade qa-shade"
                            dangerouslySetInnerHTML={{
                                __html: replace(
                                    getShadeFromProductName(product.title),
                                    '.',
                                    '<div class="c-consultation__permanent-shade-dot"></div>'
                                )
                            }}
                            style={{
                                opacity,
                                transform: `translateX(${x}px)`
                            }}
                        />
                    )}
                </Motion>
            </div>
            <div className="o-layout__item u-7/12 u-2/12@mobile">
                <a href={`/products/${product.key}`} target="noopener">
                    <img
                        src={boxImage}
                        alt=""
                        className="c-consultation__permanent-box u-shadow qa-image"
                    />
                </a>
            </div>
            <div className="o-layout__item u-6/12@mobile">
                <a
                    href={`/products/${product.key}`}
                    className="u-heading u-h3 qa-title u-block qa-url"
                    target="noopener"
                >
                    {product.title}
                </a>
                <div className="u-heading u-weight-bold u-h5 u-mt-- u-mb qa-price">
                    {getPrice(product.price)}
                </div>

                <p className="u-mb qa-reason">{reason}</p>

                {/*<AddToCartButton handleClick={handleClick} variantId={product.variantId} /> */}
            </div>
        </div>
    </section>
);

export default ConsultationPermanentRecommendation;
