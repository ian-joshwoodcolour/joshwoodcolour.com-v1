/**
 * @prettier
 * @flow
 */
import React from 'react';
import get from 'lodash/get';
import {getPrice} from '../../services/helpers';
import AddToCartButton from './AddToCartButton';
import Checkbox from './Checkbox';

type Props = {
    handleAddToCart: Function,
    handleProductSelection: Function,
    products: Array<JWCConsultationRecommendation>,
    selectedProducts: Array<number>
};

const ConsultationResultsProductSelection = ({
    handleAddToCart,
    handleProductSelection,
    products,
    selectedProducts
}: Props) => (
    <div className="o-layout o-layout--huge u-stack-layout@mobile u-pt+">
        <div className="o-layout__item u-4/12@mobile">
            <h3 className="u-heading u-mb">
                {get(window, 'globalData.addAllTitle', 'Your personal Josh Wood Colour products')}
            </h3>
            <p>
                Now you know your shade, here's everything you need to achieve, maintain and care
                for your colour.
            </p>
        </div>
        <div className="o-layout__item u-1/12@mobile u-2/12@tablet" />
        <div className="o-layout__item u-7/12@mobile u-6/12@tablet">
            <ul className="o-ui-list">
                {products.map((product, index) => (
                    <li
                        className="o-ui-list__item u-pv-- u-flex u-align-items-center"
                        key={`product-${index}`}
                        style={{
                            opacity: selectedProducts.includes(product.variantId) ? 1 : 0.4
                        }}
                    >
                        <Checkbox
                            handleClick={handleProductSelection}
                            isSelected={selectedProducts.includes(product.variantId)}
                            value={product.variantId}
                        />

                        <div className="o-flag u-flex u-align-items-center u-ml-- u-ml-@mobile">
                            <div
                                className="o-flag__image c-product__image--cart t-grey-lightest u-p- u-text-center"
                                style={{height: 'auto'}}
                            >
                                <a href={`/products/${product.key}`}>
                                    <div
                                        className="u-square"
                                        style={{
                                            backgroundImage: `url(${product.imageSmall})`,
                                            backgroundPosition: 'center center',
                                            backgroundSize: 'cover'
                                        }}
                                    />
                                </a>
                            </div>
                            <div className="o-flag__body u-pl@mobile u-1/1">
                                <div className="o-layout u-flex u-align-items-top">
                                    <div className="o-layout__item u-9/12@mobile">
                                        <a href={`/products/${product.key}`}>
                                            <strong className="u-heading u-h6 u-spacing-0">
                                                {product.type}
                                            </strong>
                                        </a>
                                    </div>
                                    <div className="o-layout__item u-3/12 u-text-right">
                                        <strong className="u-font-size-14 u-spacing-0">
                                            {getPrice(product.price)}
                                        </strong>
                                    </div>
                                </div>

                                <div className="u-weight-light">{product.title}</div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <button
                className="c-button c-button--black u-mt u-1/1"
                onClick={handleAddToCart}
                disabled={selectedProducts.length === 0}
            >
                {`Add ${selectedProducts.length} product${
                    selectedProducts.length === 1 ? '' : 's'
                } to cart`}
            </button>
        </div>
    </div>
);

export default ConsultationResultsProductSelection;
