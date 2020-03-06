/**
 * @prettier
 * @flow
 */
import React, {Component} from 'react';
import eq from 'lodash/eq';
import find from 'lodash/find';
import get from 'lodash/get';
import flatMap from 'lodash/flatMap';
import map from 'lodash/map';
import upperFirst from 'lodash/upperFirst';
import {
    addToCart,
    getCart,
    showCartSummaryModal,
    trackAddToCart,
    updateCartProduct,
    updateCartSummary
} from '../cart';
import ConsultationPermanentRecommendation from './ConsultationPermanentRecommendation';
import ConsultationCareAndConcealerRecommendation from './ConsultationCareAndConcealerRecommendation';
import ConsultationResultsProductSelection from './ConsultationResultsProductSelection';

type Props = {
    answers: Array<JWCConsultationAnswer>,
    results: JWCConsultationRecommendations
};

type State = {
    allProducts: Array<JWCConsultationRecommendation>,
    HAS_PERMANENT: boolean,
    HAS_CONCEALER: boolean,
    HAS_CARE: boolean,
    name: string,
    selectedProducts: Array<number>
};

class ConsultationRecommendations extends Component<Props, State> {
    $permanentWrapper: ?HTMLElement;

    constructor(props: Props) {
        super(props);

        const name = find(this.props.answers, a => eq(a.name, 'NAME'));
        const allProducts = flatMap(this.props.results, collection => collection.products);
        const selectedProducts = map(allProducts, product => product.variantId);

        const hasProducts = key => this.props.results[key].products.length > 0;

        this.state = {
            allProducts,
            HAS_PERMANENT: hasProducts('permanent'),
            HAS_CONCEALER: hasProducts('concealer'),
            HAS_CARE: hasProducts('care'),
            name: name ? upperFirst(name.value) : '',
            selectedProducts
        };

        (this: any).handleAddAllProductsToCart = this.handleAddAllProductsToCart.bind(this);
        (this: any).handleAddSelectedProductsToCart = this.handleAddSelectedProductsToCart.bind(
            this
        );
        (this: any).handleAddSingleProductToCart = this.handleAddSingleProductToCart.bind(this);
        (this: any).handleProductSelection = this.handleProductSelection.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            if (this.$permanentWrapper) {
                this.$permanentWrapper.classList.add('t-grey-lightest');
            }
        }, 10);
    }

    trackProductsAddedToCart(variantIds: Array<number> = [], source: string) {
        const trackedData = this.state.allProducts
            .filter(product => variantIds.includes(product.variantId))
            .map(product => {
                return {
                    handle: product.handle,
                    id: product.variantId,
                    value: product.price
                };
            });

        if (trackedData.length) {
            trackedData.map(data => trackAddToCart(data.handle, data.id, data.value, source));
        }
    }

    addProductsToCart(variantIds: Array<*>) {
        getCart()
            .then(cart => {
                const mergedProducts = variantIds.map(variantId => {
                    const existingQuantity = get(
                        find(cart.items, {id: parseInt(variantId)}),
                        'quantity'
                    );
                    const quantity = existingQuantity ? existingQuantity + 1 : 1;

                    return [variantId, quantity];
                });

                return updateCartProduct(mergedProducts);
            })
            .then(response => {
                updateCartSummary(response);
                showCartSummaryModal(response);

                this.deselectProducts(variantIds.map(v => v[0]));
            })
            .catch(console.error);
    }

    deselectProducts(variantIds: Array<number>) {
        this.setState({
            selectedProducts: this.state.selectedProducts.filter(v => !variantIds.includes(v))
        });
    }

    handleAddAllProductsToCart() {
        this.addProductsToCart(this.state.allProducts.map(p => [p.variantId, 1]));
        this.trackProductsAddedToCart(
            this.state.allProducts.map(p => p.variantId),
            'Consultation results - all products CTA'
        );
    }

    handleAddSelectedProductsToCart() {
        this.addProductsToCart(this.state.selectedProducts.map(p => [p, 1]));
        this.trackProductsAddedToCart(
            this.state.selectedProducts,
            'Consultation results - product list'
        );
    }

    handleAddSingleProductToCart(variantId: number) {
        addToCart(variantId)
            .then(getCart)
            .then(response => {
                updateCartSummary(response);
                showCartSummaryModal(response);
            });

        this.deselectProducts([variantId]);
        this.trackProductsAddedToCart([variantId], 'Consultation results - single product CTA');
    }

    handleProductSelection(isSelected: boolean, variantId: number) {
        const productIsSelected = this.state.selectedProducts.includes(variantId);

        this.setState({
            selectedProducts: isSelected
                ? [...this.state.selectedProducts, variantId]
                : this.state.selectedProducts.filter(v => !eq(v, variantId))
        });
    }

    getPermanentBoxImage(product: JWCConsultationRecommendation) {
        const boxImages = get(window, 'globalData.PermanentcolourBoxImages', []);

        if (boxImages) {
            const boxImage = find(boxImages, i => eq(i.key, product.key));

            return boxImage ? boxImage.image : product.image;
        } else {
            return product.image;
        }
    }

    render() {
        const {
            allProducts,
            HAS_PERMANENT,
            HAS_CONCEALER,
            HAS_CARE,
            name,
            selectedProducts
        } = this.state;
        const {results} = this.props;

        return (
            <section className="qa-recommendations u-pt+@mobile u-pt0@desktop">
                <div
                    className="u-remove-nav-spacer u-transition-06"
                    ref={el => {
                        this.$permanentWrapper = el;
                    }}
                >
                    <section className="o-section o-wrapper u-fade-in u-pb+ u-pb++@mobile">
                        <header className="u-align-center@mobile u-m-auto">
                            <h1 className="u-heading u-h3 u-mb qa-name">
                                {name ? <span>{name}, here are your perfect products</span> : null}
                                {!name ? <span>Here are your perfect products</span> : null}
                            </h1>

                            <p className="u-lead">
                                We know everyone is different. Here is everything you need to have
                                the great hair you deserve:
                            </p>
                        </header>

                        {HAS_PERMANENT ? (
                            <ConsultationPermanentRecommendation
                                boxImage={this.getPermanentBoxImage(results.permanent.products[0])}
                                handleClick={this.handleAddSingleProductToCart}
                                product={results.permanent.products[0]}
                                reason={results.permanent.reason}
                            />
                        ) : null}
                        {!HAS_PERMANENT && results.permanent.reason ? (
                            <p className="u-mt u-mt+@mobile u-align-center@mobile">
                                {results.permanent.reason}.
                            </p>
                        ) : null}

                        <ConsultationResultsProductSelection
                            handleAddToCart={this.handleAddSelectedProductsToCart}
                            handleProductSelection={this.handleProductSelection}
                            products={allProducts}
                            selectedProducts={selectedProducts}
                        />
                    </section>
                </div>

                {HAS_CONCEALER ? (
                    <ConsultationCareAndConcealerRecommendation
                        handleClick={this.handleAddSingleProductToCart}
                        products={results.concealer.products}
                        reason={results.concealer.reason}
                        subtitle={get(
                            window,
                            'globalData.concealerSubtitle',
                            'Easy to use touch-up products designed to cover unwanted grey hair'
                        )}
                        title={get(window, 'globalData.concealerTitle', 'Root concealers')}
                    />
                ) : null}

                {HAS_CARE ? (
                    <ConsultationCareAndConcealerRecommendation
                        handleClick={this.handleAddSingleProductToCart}
                        products={results.care.products}
                        reason={results.care.reason}
                        subtitle={get(
                            window,
                            'globalData.careSubtitle',
                            'Products created to protect and refresh your colour'
                        )}
                        title={get(window, 'globalData.careTitle', 'Care range')}
                    />
                ) : null}
            </section>
        );
    }
}

export default ConsultationRecommendations;
