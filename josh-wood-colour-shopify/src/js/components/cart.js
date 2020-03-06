/**
 * @prettier
 * @flow
 */
import React from 'react';
import {render} from 'react-dom';
import anime from 'animejs';
import eq from 'lodash/eq';
import get from 'lodash/get';
import fromPairs from 'lodash/fromPairs';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import replace from 'lodash/replace';
import {closeModal, init as modalInit, openModal, setActiveModal} from './modal';
import {
    getFetchParams,
    getPrice,
    handleFetchErrors,
    intendedTargetElement,
    triggerMouseEvent
} from '../services/helpers';
import {ANIMATION_DURATION} from '../config';

type CartElements = {
    $cartBundleRemoveCTA?: HTMLButtonElement,
    $cartCollections?: NodeList<HTMLElement>,
    $cartCount?: NodeList<HTMLElement>,
    $cartDiscountTotal?: NodeList<HTMLElement>,
    $cartDiscountTotalContainer?: NodeList<HTMLElement>,
    $cartEmptyMessage?: HTMLElement,
    $cartForm?: HTMLFormElement,
    $cartRemoveItems?: NodeList<HTMLElement>,
    $cartSummary?: HTMLElement,
    $cartSummaryModalItems?: HTMLElement,
    $cartSummaryModalTrigger?: HTMLElement,
    $cartSummaryModalItemTemplate?: HTMLScriptElement,
    $cartTotal?: NodeList<HTMLElement>,
    $itemQuantities?: NodeList<HTMLSelectElement>
};

const els: CartElements = {};

const REFRESH_ON_CHANGE = true;

let cart = get(window, 'globalData.cart');
let cartLocked = false;
let cartSummaryModalItemTemplate;

const lockCart = () => (cartLocked = true);
const unlockCart = () => (cartLocked = false);

const shopifyRequest = (url: string, data?: Object): Promise<*> => {
    return new Promise((resolve, reject) => {
        if (!cartLocked) {
            lockCart();

            fetch(url, getFetchParams(data))
                .then(response => response.json())
                .then(response => {
                    unlockCart();
                    resolve(response);
                })
                .catch(error => {
                    unlockCart();
                    reject(error);
                });
        }
    });
};

const handleCartRefresh = () => window.location.reload();

export const trackAddToCart = (handle: string, id: number, value: string, source: string) => {
    if (window.ga) {
        window.ga('send', 'event', {
            eventCategory: 'Add to cart',
            eventAction: source,
            eventLabel: handle
        });
    }

    if (window.fbq) {
        window.fbq('track', 'AddToCart', {
            content_ids: [parseInt(id)],
            content_type: 'product',
            currency: 'GBP',
            value: parseInt(value) / 100
        });
    }
};

export const getCart = () => shopifyRequest('/cart.js');

export const updateCartSummary = (data: Object) => {
    const {$cartCount, $cartTotal, $cartDiscountTotal, $cartDiscountTotalContainer} = els;

    if ($cartCount) {
        [...$cartCount].map($count => ($count.innerText = data.item_count));
    }

    if ($cartTotal && data.total_price) {
        [...$cartTotal].map($el => ($el.innerText = getPrice(data.total_price)));
    }

    if ($cartDiscountTotal && $cartDiscountTotalContainer) {
        if (data.total_discount > 0) {
            [...$cartDiscountTotalContainer].map($el => ($el.style.display = 'block'));
            [...$cartDiscountTotal].map($el => ($el.innerText = getPrice(data.total_discount)));
        } else {
            [...$cartDiscountTotalContainer].map($el => ($el.style.display = 'none'));
        }
    }
};

const getSmallImage = (url: string): string => {
    let image;

    image = replace(url, '.jpg', '_small.jpg');
    image = replace(url, '.jpeg', '_small.jpeg');
    image = replace(url, '.png', '_small.png');
    image = replace(url, '.gif', '_small.gif');

    return image;
};

const getItemTitle = (title: string, quantity: number): string => {
    const newTitle =
        quantity > 1 ? `${title} <span class="u-font-size-14">(x${quantity})</span>` : title;

    return newTitle;
};

const getItemURL = (handle: string): string => `/products/${handle}`;

const getItemDiscountLabels = (discounts: Array<Object>): string => {
    return discounts.map(discount => `<span class="u-label">${discount.title}</span>`).join(', ');
};

const getItemDiscountsTotal = (discounts: Array<Object>): number => {
    return discounts.map(discount => discount.amount).reduce((prev, cur) => prev + cur, 0);
};

const getItemDiscountPrice = (discounts: Array<Object>): string => {
    const totalDiscounts = getItemDiscountsTotal(discounts);

    return totalDiscounts > 0 ? getPrice(totalDiscounts) : '';
};

const isItemFree = (originalPrice: number, discountPrice: number): boolean =>
    originalPrice === discountPrice;

const getItemPrice = (item: Object): string => {
    const totalDiscounts = getItemDiscountsTotal(item.discounts);

    if (totalDiscounts > 0) {
        if (isItemFree(totalDiscounts, item.original_line_price)) {
            return 'FREE';
        } else {
            return getPrice(item.original_line_price - totalDiscounts);
        }
    }

    return getPrice(item.line_price);
};

const updateCartSummaryModalItems = (items: Array<Object>) => {
    const {$cartSummaryModalItems} = els;

    if ($cartSummaryModalItems) {
        const itemsHTML = items
            .map(item => {
                let html;

                html = replace(cartSummaryModalItemTemplate, '[CART_ITEM_TYPE]', item.product_type);
                html = replace(html, '[CART_ITEM_URL]', getItemURL(item.handle));
                html = replace(html, '[CART_ITEM_URL_2]', getItemURL(item.handle));
                html = replace(html, '[CART_ITEM_PRICE]', getItemPrice(item));
                html = replace(html, '[CART_ITEM_TITLE]', getItemTitle(item.title, item.quantity));
                html = replace(html, '[CART_ITEM_IMAGE]', getSmallImage(item.image));
                html = replace(
                    html,
                    '[CART_ITEM_DISCOUNT_LABEL]',
                    getItemDiscountLabels(item.discounts)
                );
                html = replace(
                    html,
                    '[CART_ITEM_DISCOUNT_PRICE]',
                    `<span class="u-color-grey u-strike">${getItemDiscountPrice(
                        item.discounts
                    )}</span>&nbsp;`
                );

                return html;
            })
            .join('');

        $cartSummaryModalItems.innerHTML = itemsHTML;
    }
};

export const showCartSummaryModal = (data: Object) => {
    if (els.$cartSummaryModalTrigger) {
        updateCartSummaryModalItems(data.items);
        triggerMouseEvent(els.$cartSummaryModalTrigger);
    }
};

export const addToCart = (
    id: number,
    quantity: number = 1,
    properties: Object = {}
): Promise<*> => {
    if (els.$cartCount) {
        const newCount = parseInt(els.$cartCount[0].innerText) + quantity;

        updateCartSummary({item_count: newCount});
    }

    return shopifyRequest('/cart/add.js', {id, quantity, properties});
};

export const updateCartProduct = (products: Array<*>): Promise<*> => {
    return shopifyRequest('/cart/update.js', {
        updates: fromPairs(products)
    });
};

const hideItemInCart = ($element: HTMLElement): Promise<*> => {
    return new Promise(resolve => {
        anime({
            begin() {
                $element.style.overflow = 'hidden';
            },
            complete() {
                $element.remove();
                resolve();
            },
            duration: ANIMATION_DURATION,
            easing: 'easeOutExpo',
            height: 0,
            opacity: [1, 0],
            targets: $element
        });
    });
};

const showEmptyState = (): void => {
    const {$cartEmptyMessage, $cartForm} = els;

    if ($cartEmptyMessage && $cartForm) {
        anime({
            complete() {
                anime({
                    begin() {
                        $cartEmptyMessage.style.display = 'block';
                    },
                    duration: ANIMATION_DURATION,
                    easing: 'easeOutExpo',
                    opacity: [0, 1],
                    targets: els.$cartEmptyMessage
                });
            },
            duration: ANIMATION_DURATION * 2,
            easing: 'easeOutExpo',
            height: 0,
            opacity: 0,
            targets: els.$cartForm
        });
    }
};

const removeItem = (variantId, $targetItem) => {
    updateCartProduct([[variantId, 0]])
        .then(response => {
            if (REFRESH_ON_CHANGE) {
                handleCartRefresh();
            } else {
                const cartIsEmpty = eq(response.item_count, 0);

                if (cartIsEmpty) {
                    updateCartSummary(response);
                    showEmptyState();
                } else {
                    updateCartSummary(response);
                    updateItemPrices(response);
                    updateItemDiscounts(response);
                    hideItemInCart($targetItem).then(() => {
                        updateCartHeadings();

                        if (cartIsEmpty) {
                            showEmptyState();
                        }
                    });
                }
            }
        })
        .catch(console.trace);
};

const removeBundleItem = (variantId, variantIds): Promise<*> => {
    return new Promise((resolve, reject) => {
        let line;

        cart.items.map((item, index) => {
            const isVariantMatch = eq(item.variant_id, parseInt(variantId));
            const isBundleMatch = eq(get(item, 'properties.SSPBundleIds'), variantIds);

            if (isVariantMatch && isBundleMatch) {
                line = index + 1;
            }
        });

        if (typeof line !== 'undefined') {
            shopifyRequest('/cart/change.js', {
                line,
                quantity: 0
            }).then(response => {
                cart = response;
                window.globalData.cart = response;

                resolve();
            });
        } else {
            reject('Could not find both bundle items');
        }
    });
};

const handleRemoveBundleItems = (event: Event) => {
    event.preventDefault();

    const $target: HTMLSelectElement = (event.target: any);

    if ($target) {
        const SSPBundleIdsCombined = get($target, 'dataset.bundleIds', '');
        const SSPBundleIds = SSPBundleIdsCombined.split('|').filter(i => i !== '|');

        removeBundleItem(SSPBundleIds[0], SSPBundleIdsCombined)
            .then(() => removeBundleItem(SSPBundleIds[1], SSPBundleIdsCombined))
            .then(handleCartRefresh)
            .catch(e =>
                alert('Sorry, there was an error removing the products. Please try again.')
            );
    }
};

/**
 * TODO: Handle these if/els better...
 * This function is not currently used, but could do with cleaning up if was to be...
 */
const handleRemoveItem = (event: Event) => {
    event.preventDefault();

    const $target = intendedTargetElement('js-remove', event.target);

    if ($target) {
        const variantId = get($target, 'dataset.variantId');

        if (variantId) {
            const $targetItem = document.querySelector(
                `.js-cart-item[data-variant-id="${variantId}"]`
            );

            if ($targetItem) {
                /**
                 * We should only show the SSP warning when removing a product would result in the SSP product
                 * being left without a matched Permanent product.
                 */
                if ($target.dataset.title.includes('Permanent Colour')) {
                    let properties = get($target, 'dataset.properties', []);

                    /**
                     * If there is properties for this item, parse the data to something we can work with
                     */
                    if (properties) {
                        properties = fromPairs(JSON.parse(properties));
                    }

                    /**
                     * If there are properties, see if we need to validate against them
                     */
                    if (!isEmpty(properties)) {
                        const SSPBundleIdsProp = get(properties, 'SSPBundleIds', '');
                        const SSPBundleIds = SSPBundleIdsProp.split('|').filter(i => i !== '|');

                        /**
                         * Shade Shot Plus 'bundles' require different validation from the standard confirmation dialog
                         */
                        if (SSPBundleIds.length >= 1) {
                            /**
                             * If there are more than 1 of a product which is used in a 'bundle', sometimes the 'other'
                             * product is deleted instead of the 'bundle' product. This means that if the 'other'
                             * Let's check if the correct amount of bundle products exist first.
                             */
                            const $bundleProducts = document.querySelectorAll(
                                `.js-remove[data-properties*="${SSPBundleIdsProp}"]`
                            );

                            if ($bundleProducts.length >= 2 && els.$cartBundleRemoveCTA) {
                                els.$cartBundleRemoveCTA.setAttribute(
                                    'data-bundle-ids',
                                    SSPBundleIdsProp
                                );

                                setActiveModal('ssp-bundle-warning');
                                openModal(true);

                                return;
                            }
                        }
                    }
                }

                if (confirm('Are you sure you want to remove this item?')) {
                    return removeItem(variantId, $targetItem);
                }
            }
        }
    }
};

const handleFormSubmit = event => {
    const submittedByButton =
        document.activeElement && document.activeElement.classList.contains('js-cart-submit');

    if (!submittedByButton) {
        // event.preventDefault();
    }
};

const updateItemDiscounts = (data: Object): void => {
    if (data.items.length) {
        data.items.map(item => {
            const $discount = document.querySelector(`.js-discounts-${item.id}`);

            if ($discount) {
                $discount.innerHTML = getItemDiscountLabels(item.discounts);
            }
        });
    }
};

const updateItemPrices = (data: Object): void => {
    if (data.items.length) {
        data.items.map(item => {
            const $price = document.querySelector(`.js-price-${item.id}`);

            if ($price) {
                $price.innerText = getItemPrice(item);
            }
        });
    }
};

const handleQuantityChange = (event: Event) => {
    event.preventDefault();

    const $target: HTMLSelectElement = (event.target: any);

    if ($target) {
        const variantId = get($target, 'dataset.variantId');
        const newQuantity = parseInt($target.value);

        updateCartProduct([[variantId, newQuantity]])
            .then(response => {
                if (REFRESH_ON_CHANGE) {
                    handleCartRefresh();
                } else {
                    updateCartSummary(response);
                    updateItemPrices(response);
                    updateItemDiscounts(response);
                }
            })
            .catch(console.trace);
    }
};

const updateCartHeadings = () => {
    if (els.$cartCollections) {
        [...els.$cartCollections].map($collection => {
            const $heading = $collection.querySelector('.js-heading');

            if ($heading) {
                const $items = $collection.querySelectorAll('.js-cart-item');
                const isVisible = $heading && $items.length > 0;

                $heading.classList.toggle('u-hide', !isVisible);
                $heading.classList.toggle('u-fade-in', isVisible);
            }
        });
    }
};

const setCartModalItemTemplate = () => {
    if (els.$cartSummaryModalItemTemplate) {
        cartSummaryModalItemTemplate = els.$cartSummaryModalItemTemplate.innerText;
    }
};

const cache = () => {
    els.$cartBundleRemoveCTA = ((document.querySelector(
        '.js-ssp-removal-remove'
    ): any): HTMLButtonElement);
    els.$cartCollections = ((document.querySelectorAll('.js-cart-collection'): any): NodeList<
        HTMLElement
    >);
    els.$cartCount = ((document.querySelectorAll('.js-cart-count'): any): NodeList<HTMLElement>);
    els.$cartDiscountTotal = ((document.querySelectorAll('.js-cart-discount-total'): any): NodeList<
        HTMLElement
    >);
    els.$cartDiscountTotalContainer = ((document.querySelectorAll(
        '.js-cart-discount-total-container'
    ): any): NodeList<HTMLElement>);
    els.$cartEmptyMessage = ((document.querySelector('.js-cart-empty-message'): any): HTMLElement);
    els.$cartForm = ((document.querySelector('.js-cart-form'): any): HTMLFormElement);
    els.$cartRemoveItems = ((document.querySelectorAll('.js-remove'): any): NodeList<HTMLElement>);
    els.$cartSummary = ((document.querySelector('.js-cart-summary'): any): HTMLElement);
    els.$cartSummaryModalItems = ((document.querySelector(
        '.js-cart-summary-modal-items'
    ): any): HTMLElement);
    els.$cartSummaryModalTrigger = ((document.querySelector(
        '.js-modal-open[data-modal="cart-summary"]'
    ): any): HTMLElement);
    els.$cartSummaryModalItemTemplate = ((document.querySelector(
        '[data-cart-summary-template]'
    ): any): HTMLScriptElement);
    els.$cartTotal = ((document.querySelectorAll('.js-cart-total'): any): NodeList<HTMLElement>);
    els.$itemQuantities = ((document.querySelectorAll('.js-item-quantity'): any): NodeList<
        HTMLSelectElement
    >);
};

const events = () => {
    if (els.$cartForm) {
        els.$cartForm.addEventListener('submit', handleFormSubmit, false);
    }

    if (els.$cartRemoveItems) {
        [...els.$cartRemoveItems].map($item =>
            $item.addEventListener('click', handleRemoveItem, false)
        );
    }

    if (els.$itemQuantities) {
        [...els.$itemQuantities].map($item =>
            $item.addEventListener('change', handleQuantityChange, false)
        );
    }

    if (els.$cartBundleRemoveCTA) {
        els.$cartBundleRemoveCTA.addEventListener('click', handleRemoveBundleItems, false);
    }
};

export const init = () => {
    cache();
    events();
    updateCartHeadings();
    setCartModalItemTemplate();
};

export default {init};
