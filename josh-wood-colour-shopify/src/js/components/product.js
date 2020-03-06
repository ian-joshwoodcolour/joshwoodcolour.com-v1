/**
 * @prettier
 * @flow
 */
import anime from 'animejs';
import eq from 'lodash/eq';
import get from 'lodash/get';
import find from 'lodash/find';
import first from 'lodash/first';
import last from 'lodash/last';
import toString from 'lodash/toString';
import Choices from 'choices.js';
import {getPrice, isIE, intendedTargetElement, preloadImages} from '../services/helpers';
import {
    addToCart,
    getCart,
    init as cartInit,
    showCartSummaryModal,
    trackAddToCart,
    updateCartSummary
} from './cart';
import * as productDemo from './product-demo';
import * as productGallery from './product-gallery';
import * as productInfo from './product-information';
import * as productInstructions from './product-instructions';
import * as productQuote from './product-quote';
import * as productPromoBanner from './product-promo-banner';
import * as productRecommendation from './product-recommendation';
import * as productVideo from './product-video';
import * as shadeComparison from './shade-comparison';

type ProductElements = {
    $addButton?: NodeList<HTMLButtonElement>,
    $associatedProductsDropdown?: NodeList<HTMLSelectElement>,
    $careColourSelectors?: NodeList<HTMLButtonElement>,
    $careTypeSelectors?: NodeList<HTMLButtonElement>,
    $preloadInteractions?: NodeList<HTMLElement>,
    $price?: NodeList<HTMLElement>,
    $productImage?: NodeList<HTMLElement>,
    $productImageRepeated?: HTMLElement,
    $productInstructions?: HTMLElement,
    $productName?: NodeList<HTMLElement>,
    $quickAddButtons?: NodeList<HTMLElement>,
    $sspColourSelectors?: NodeList<HTMLButtonElement>
};

type CollectionTypes = {
    isPermanent: boolean,
    isShadeShotPlus: boolean,
    isCare: boolean
};

const els: ProductElements = {};

const ANIMATION_DURATION = 200;
const ANIMATION_ELASTICITY = 200;
const ANIMATION_OFFSET = 40;

const product = get(window, 'globalData.product');
const collectionTypes = get(window, 'globalData.collectionTypes', {});
const associatedProducts = get(window, 'globalData.associatedProducts');
const associatedProductQuotes = get(window, 'globalData.associatedProductQuotes');
const productGalleries = get(window, 'globalData.productGalleries');
const productInformation = get(window, 'globalData.productInformation');
const productInstructionsContent = get(window, 'globalData.productInstructions');
const productPromoBanners = get(window, 'globalData.productPromoBanners');
const productRecommendations = get(window, 'globalData.productRecommendations');
const productVideos = get(window, 'globalData.productVideos');
const productDemos = get(window, 'globalData.productDemos');
const productTrackView = get(window, 'globalData.productTrackView');
const shadeShotPlusProducts = get(window, 'globalData.shadeShotPlusProducts');

let activeProduct = product;
let activeCareProductValues = {
    colour: '',
    type: ''
};
let activeShadeShotPlusColour = '';
let associatedProductsOptions = [];

const trackProductView = (id: number, price: number) => {
    if (window.fbq && id && price) {
        window.fbq('track', 'ViewContent', {
            content_ids: [parseInt(id)],
            content_type: 'product',
            currency: 'GBP',
            value: parseInt(price) / 100
        });
    }
};

const isSoldOut = product => {
    const productAvailable = product.available;
    const variantAvailable = get(product, 'variants[0].available');
    // const variantStock = get(product, 'variants[0].inventory_quantity', 0);

    return !productAvailable | !variantAvailable; // | !variantStock);
};

const lockAddButton = () => {
    if (els.$addButton) {
        [...els.$addButton].map($button => $button.setAttribute('disabled', 'disabled'));
    }
};

const unlockAddButton = () => {
    if (els.$addButton) {
        [...els.$addButton].map($button => $button.removeAttribute('disabled'));
    }
};

const getCustomDropdownOptions = () => {
    const options = {
        callbackOnCreateTemplates: function(template) {
            const {classNames} = this.config;

            /**
             * Templates are copied from the lib's source:
             * https://github.com/jshjohnson/Choices/blob/67f29c286aa21d88847adfcd6304dc7d068dc01f/assets/scripts/src/choices.js#L1993-L2067
             */
            return {
                item: data => {
                    const swatch = get(
                        find(associatedProducts, p => p.title.includes(data.label)),
                        'swatchImage',
                        ''
                    );
                    const {highlightedState, item, itemSelectable} = classNames;
                    const {active, highlighted, id, value, label, disabled} = data;

                    return template(`<div class="u-flex u-align-items-center ${item} ${
                        data.highlighted ? highlightedState : itemSelectable
                    }" data-item data-id="${id}" data-value="${value}" ${
                        active ? 'aria-selected="true"' : ''
                    } ${disabled ? 'aria-disabled="true"' : ''}>
                        <img src="${swatch}" style="height: 40px; width: 40px; flex: 0 0 40px;" class="u-mr- u-bg-transparent u-transition">
                        <div style="max-width: calc(100% - 40px - 20px); overflow: hidden; text-overflow: ellipsis;">
                            ${label}
                        </div>
                    </div>`);
                },
                choice: data => {
                    const swatch = get(
                        find(associatedProducts, p => p.title.includes(data.label)),
                        'swatchImage',
                        ''
                    );
                    const {item, itemChoice, itemDisabled, itemSelectable} = classNames;
                    const {disabled, id, label, selected, value, groupId} = data;

                    const selectedElementHTML = `<div class="custom-select--selected"><svg width="16" height="13" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path id="a" d="M7.875 14.14875L4.22625 10.5l-1.2425 1.23375L7.875 16.625l10.5-10.5-1.23375-1.23375z"/></defs><g transform="translate(-3 -4)" fill="none" fill-rule="evenodd"><mask id="b" fill="#fff"><use xlink:href="#a"/></mask><use fill="#000" xlink:href="#a"/><g mask="url(#b)" fill="#FFF"><path d="M1.75 1.75h17v17h-17z"/></g></g></svg>
                </div>`;

                    return template(`<div class="u-flex u-align-items-center ${item} ${itemChoice} ${
                        disabled ? itemDisabled : itemSelectable
                    }" data-select-text="${this.config.itemSelectText}" data-choice ${
                        disabled
                            ? 'data-choice-disabled aria-disabled="true"'
                            : 'data-choice-selectable'
                    } data-id="${id}" data-value="${value}" ${
                        groupId > 0 ? 'role="treeitem"' : 'role="option"'
                    }>
                        <div class="u-relative u-mr-" style="border-radius: 100%; overflow: hidden;">
                            <img src="${swatch}" style="flex: 0 0 40px; height: 40px; width: 40px;" class="u-bg-transparent">
                            ${selected ? selectedElementHTML : ''}
                        </div>
                        <div>${label}</div>
                      </div>`);
                }
            };
        },
        itemSelectText: '',
        paste: false,
        removeItems: false,
        searchEnabled: false,
        shouldSort: false
    };

    return options;
};

const customDropdownInit = () => {
    const options = getCustomDropdownOptions();

    if (els.$associatedProductsDropdown) {
        [...els.$associatedProductsDropdown].map($dropdown => {
            /**
             * Workaround for the Choices select not retaining dataset values. We reference this in the event
             * handler.
             */
            associatedProductsOptions = [...$dropdown.options].map($option => ({
                ...{
                    value: $option.value,
                    label: $option.text
                },
                ...$option.dataset
            }));

            new Choices($dropdown, options);
        });
    }
};

/**
 * TODO: Refactor this. It currently is used by all specific 'add' buttons on for a product on a product page,
 *       as well as other 'quick' add buttons.
 */
const updateAddButtonStatus = (product: Object, variantId?: number) => {
    const $addButton = els.$addButton ? els.$addButton : [];
    const $quickAddButtons = els.$quickAddButtons ? els.$quickAddButtons : [];

    if ($addButton || $quickAddButtons) {
        [...$addButton, ...$quickAddButtons]
            .filter($el => $el)
            .filter($el => {
                /**
                 * Filter out buttons that don't have the variant ID that the function was called with
                 */
                if ($el.classList.contains('js-quick-add') || variantId) {
                    return parseInt($el.dataset.variantId) === variantId;
                } else {
                    return true;
                }
            })
            .map($el => {
                if (isSoldOut(product)) {
                    $el.setAttribute('disabled', 'disabled');
                    $el.innerText = 'Sold out';
                    $el.dataset.handle = '';
                    $el.dataset.productId = '';
                    $el.dataset.variantId = '';
                } else {
                    const usedVariantId = variantId
                        ? variantId + ''
                        : get(product, 'variants[0].id');

                    $el.removeAttribute('disabled');
                    $el.innerText = 'Add to cart';
                    $el.dataset.handle = get(product, 'handle');
                    $el.dataset.productId = get(product, 'id');
                    $el.dataset.variantId = usedVariantId;
                }
            });
    }
};

const getProductStatus = (variantId: number, handle: string) => {
    fetch(`/products/${handle}.js`, {
        credentials: 'same-origin',
        headers: {'content-type': 'application/json'}
    })
        .then(response => response.json())
        .then(response => updateAddButtonStatus(response, variantId));
};

const addProductToCart = (
    variantId: number,
    handle: string,
    quantity: number,
    showUpdates: boolean = true,
    lineItemProperties: Object = {}
): Promise<*> => {
    return new Promise(resolve => {
        addToCart(variantId, quantity, lineItemProperties)
            .then(response => {
                if (showUpdates) {
                    if (isIE()) {
                        return (window.location.href = '/cart');
                    }

                    getCart().then(response2 => {
                        console.log(response2);
                        /**
                         * After adding a product to cart we get the latest cart details and reflect them in the site
                         * furniture: cart total, cart modal and `add` buttons
                         */
                        updateCartSummary(response2);
                        showCartSummaryModal(response2);
                        getProductStatus(variantId, handle);
                        resolve();
                    });
                } else {
                    resolve(response);
                }
            })
            .catch(() => {
                /**
                 * If there was an error showing the updated cart we will need to redirect to the cart
                 * page so the user can review there.
                 */
                window.location.href = '/cart';
            });
    });
};

const getSelectedAssociatedProduct = (variantId: number) => {
    const product = find(associatedProducts, p => {
        return eq(get(first(p.variants), 'id'), variantId);
    });

    return product;
};

const getSelectedSSPProductHandle = () => {
    const $button = document.querySelector('.js-ssp-colour-selector.c-button--selected');

    return $button ? $button.dataset.handle : '';
};

const addSSPPermanentProductToCart = (source: string, SSPVariantId: number): Promise<*> => {
    return new Promise((resolve, reject) => {
        if (els.$associatedProductsDropdown) {
            const selectedPermanentProductVariantId = parseInt(
                els.$associatedProductsDropdown[0].value
            );
            const permanentProduct = getSelectedAssociatedProduct(
                selectedPermanentProductVariantId
            );

            if (permanentProduct) {
                const SSPBundleIds = `${SSPVariantId}|${selectedPermanentProductVariantId}`;

                addProductToCart(
                    selectedPermanentProductVariantId,
                    permanentProduct.handle,
                    1,
                    false,
                    {
                        SSPBundleIds
                    }
                ).then(() => {
                    trackAddToCart(
                        permanentProduct.handle,
                        selectedPermanentProductVariantId,
                        permanentProduct.price,
                        source
                    );
                    resolve({SSPBundleIds});
                });
            } else {
                reject('No permanent product found');
            }
        } else {
            reject('No product selector found');
        }
    });
};

const handleQuickAddToCart = (event: Event): void => {
    event.preventDefault();

    const $target: HTMLElement = (event.target: any);

    if ($target) {
        $target.blur();

        const {handle, price, productId, source, variantId} = get($target, 'dataset');

        if (productId && variantId) {
            /**
             * For Shade Shot Plus products we have to ensure both a Permanent and SSP product has been selected
             * before we can add to cart.
             */
            if (collectionTypes.isShadeShotPlus) {
                addSSPPermanentProductToCart(source, variantId).then(SSPBundleIds => {
                    addProductToCart(variantId, handle, 1, true, SSPBundleIds).then(() => {
                        trackAddToCart(handle, variantId, price, source);
                    });
                });
            } else {
                addProductToCart(variantId, handle, 1).then(() => {
                    trackAddToCart(handle, variantId, price, source);
                });
            }
        }
    }
};

const updateURLWithNewProduct = (handle: string): void => {
    if (window && history.pushState) {
        const {protocol, host, pathname} = window.location;
        const URL = `${protocol}//${host}/products/${handle}`;

        window.history.pushState({path: URL}, '', URL);
    }
};

const matchedProduct = (item, handle: string) =>
    item.productURL && item.productURL.includes(handle);

const matchedSSPProduct = (item, handle: string) => {
    return (
        (item.productURL &&
            item.productURL.includes(handle) &&
            (item.sspProductURL && item.sspProductURL.includes(handle))) ||
        (item.url && item.url.includes(handle))
    );
};

const matchedSSPAndPermanentProduct = (item, sspHandle) => {
    const $dropdown = (document.querySelector('.js-associated-products-dropdown'): any);

    if ($dropdown) {
        const permanentHandle = get(
            find(
                associatedProductsOptions,
                p => p.value === $dropdown.options[$dropdown.selectedIndex].value
            ),
            'handle'
        );

        return item.sspProductURL.includes(sspHandle) && item.productURL.includes(permanentHandle);
    }
};

const getActiveProductGallery = (product, handle: string) => {
    if (collectionTypes.isShadeShotPlus) {
        if (handle.includes('permanent')) {
            handle = getSelectedSSPProductHandle();
        }

        return find(productGalleries, item => matchedSSPAndPermanentProduct(item, handle));
    } else {
        return find(productGalleries, item => matchedProduct(item, handle));
    }
};

const updateProductGallery = newProduct => {
    if (newProduct) {
        const newProductGallery = getActiveProductGallery(newProduct, newProduct.handle);

        if (newProductGallery) {
            productGallery.update(newProductGallery);
        }
    }
};

const updateProductInformation = newProduct => {
    if (newProduct) {
        const newProductInformation = find(productInformation, item =>
            matchedProduct(item, newProduct.handle)
        );

        if (newProductInformation) {
            productInfo.update({
                ...newProductInformation,
                ...{descriptionText: newProduct.description}
            });
        } else {
            productInfo.update(null);
        }
    }
};

const updateProductInstructions = newProduct => {
    if (newProduct) {
        const newProductInstructions = find(productInstructionsContent, item =>
            matchedProduct(item, newProduct.handle)
        );

        if (newProductInstructions) {
            productInstructions.update(newProductInstructions);
        } else {
            productInstructions.update(null);
        }
    }
};

const updateProductVideo = newProduct => {
    if (newProduct) {
        const newProductVideos = find(productVideos, item =>
            matchedProduct(item, newProduct.handle)
        );

        if (newProductVideos) {
            productVideo.update(newProductVideos);
        } else {
            productVideo.update(null);
        }
    }
};

const updateProductRecommendations = newProduct => {
    if (newProduct) {
        const newProductRecommendations = find(productRecommendations, item =>
            matchedProduct(item, newProduct.handle)
        );

        if (newProductRecommendations) {
            productRecommendation.update(newProductRecommendations);
        }
    }
};

const updateProductInfo = newProduct => {
    if (newProduct) {
        const {
            $associatedProductsDropdown,
            $productImage,
            $productImageRepeated,
            $productName,
            $price,
            $addButton
        } = els;

        activeProduct = newProduct;

        const activeProductQuote = find(associatedProductQuotes, item =>
            matchedProduct(item, activeProduct.handle)
        );
        const activeProductRecommendations = find(productRecommendations, item =>
            matchedProduct(item, activeProduct.handle)
        );
        const activeProductDemo = find(get(productDemos, 'products'), item =>
            matchedProduct(item, activeProduct.handle)
        );
        const activeProductPromoBanner = collectionTypes.isShadeShotPlus
            ? find(productPromoBanners, item => matchedSSPProduct(item, activeProduct.handle))
            : find(productPromoBanners, item => matchedProduct(item, activeProduct.handle));

        /**
         * If there is a `variant` dropdown, update its selected value to reflect the new
         * active product.
         */
        if ($associatedProductsDropdown) {
            [...$associatedProductsDropdown].map(
                $el => ($el.value = get(activeProduct, 'variants[0].id'))
            );
        }

        /**
         * Update product images shown next to the product details.
         */
        if ($productImage) {
            [...$productImage].map($el => {
                /**
                 * Permanent products have a different image layout from other products
                 */
                const newImage =
                    activeProduct.is_permanent_collection && get(activeProduct, 'box_image')
                        ? get(activeProduct, 'box_image')
                        : get(activeProduct, 'featured_image');

                if (eq($el.tagName, 'IMG')) {
                    $el.setAttribute('src', newImage);
                } else {
                    $el.style.backgroundImage = `url(${newImage})`;
                }
            });
        }

        /**
         * Update the smaller, 'repeated' buy/description images at the bottom of the product page.
         */
        if ($productImageRepeated) {
            $productImageRepeated.style.backgroundImage = `url(${get(
                activeProduct,
                'featured_image'
            )})`;
        }

        /**
         * Update all instances of the product name shown on the page.
         */
        if ($productName) {
            [...$productName].map($el => ($el.innerText = activeProduct.title));
        }

        /**
         * Update the product demo (currently only shown on Shade Shot pages), showing a 'before/after' state
         * when using the product.
         */
        if (activeProductDemo) {
            productDemo.updateNew(activeProductDemo);
        }

        if (productTrackView) {
            trackProductView(get(first(activeProduct.variants), 'id'), activeProduct.price);
        }

        /**
         * SSP changes are handled by colour, not permanent product type. See `handleSSPColourChange()`.
         */
        if (!collectionTypes.isShadeShotPlus) {
            /**
             * Update add buttons to show their availability.
             */
            if ($addButton) {
                updateAddButtonStatus(activeProduct);
            }

            productPromoBanner.update(activeProductPromoBanner || null);
        }

        updateProductInformation(activeProduct);
        updateProductInstructions(activeProduct);
        updateProductVideo(activeProduct);
        updateProductGallery(activeProduct);
        updateProductRecommendations(activeProduct);
        // productQuote.update(activeProductQuote);
        shadeComparison.update(activeProduct.title, activeProduct.handle);

        /**
         * We can't let dropdown changes edit the URL, as the dropdown is the 'seconadry' product and the
         * SSP selectors are the main products.
         */
        if (!collectionTypes.isShadeShotPlus) {
            updateURLWithNewProduct(activeProduct.handle);
        }
    }
};

const setProductDetails = () => {
    const activeProductInformation = find(productInformation, item =>
        matchedProduct(item, activeProduct.handle)
    );

    if (activeProductInformation) {
        productInfo.update({
            ...activeProductInformation,
            ...{descriptionText: activeProduct.description}
        });
    }
};

const handleProductChange = (event: Event) => {
    event.preventDefault();

    let $target: HTMLSelectElement = (event.target: any);

    if ($target) {
        let $option;
        let newProductId;

        /**
         * If the event is from a Choices dropdown, need to find the values...
         */
        if (event.detail) {
            newProductId = get(
                find(associatedProductsOptions, {value: $target.value}),
                'productId'
            );
        } else {
            $option =
                $target.tagName === 'SELECT'
                    ? get($target, `options[${get($target, 'selectedIndex')}]`)
                    : $target;
            newProductId = parseInt(get($option, 'dataset.productId'));
        }

        if (!activeProduct || activeProduct.id !== newProductId) {
            const newProduct = find(associatedProducts, {id: parseInt(newProductId)});

            if (newProduct) {
                updateProductInfo(newProduct);
            }
        }
    }
};

const toggleSSPProductSelectedOption = (productId: number): void => {
    if (els.$sspColourSelectors) {
        [...els.$sspColourSelectors].map($element => {
            const elementProductId = parseInt($element.dataset.productId);

            $element.classList.toggle('c-button--selected', elementProductId === productId);
            $element.classList.toggle('c-button--selectable', elementProductId !== productId);
        });
    }
};

const handleSSPColourChangeForBanner = (product: Object) => {
    const newPromoBanner = find(productPromoBanners, i => i.productURL.includes(product.handle));

    productPromoBanner.update(newPromoBanner || null);
};

const setActiveSSPProduct = (isOnLoadSelection: boolean = false) => {
    if (els.$sspColourSelectors) {
        [...els.$sspColourSelectors]
            .filter($element => $element.style.display !== 'none')
            .map(($element, index) => {
                let isSelected;

                if (
                    isOnLoadSelection &&
                    parseInt($element.dataset.productId) === activeProduct.id
                ) {
                    isSelected = true;
                } else if (index === 0) {
                    isSelected = true;
                }

                if (isSelected) {
                    handleSSPColourChange({target: $element});
                }
            });
    }
};

const handleSSPColourChange = (event: Event | Object) => {
    if (event.preventDefault) {
        event.preventDefault();
    }

    const $target: HTMLElement = intendedTargetElement('js-ssp-colour-selector', event.target);
    const product = find(shadeShotPlusProducts, p => eq(p.id, parseInt($target.dataset.productId)));

    if (product) {
        toggleSSPProductSelectedOption(product.id);
        handleSSPColourChangeForBanner(product);
        updateAddButtonStatus(product);
        updateProductInformation(product);
        updateProductInstructions(product);
        updateProductVideo(product);
        updateProductGallery(product);
        updateProductRecommendations(product);
        updateURLWithNewProduct(product.handle);

        const gallery = getActiveProductGallery(product, product.handle);

        if (gallery) {
            productGallery.update(gallery);
        }

        activeShadeShotPlusColour = $target.dataset.colour;
    }
};

const handleSSPPermanentChange = (event: Event) => {
    const {$sspColourSelectors} = els;
    const $target: HTMLSelectElement = (event.target: any);
    const associatedProduct = find(associatedProductsOptions, {value: $target.value});

    if (associatedProduct) {
        /**
         * SSP's 6.0 "blonde" permanent colour uses "brown" SSP colour so if the user has selected this
         * colour we have to override the permanent colour's colour type and set it to brown.
         */
        const colour = associatedProduct.label.includes('6.0') ? 'brown' : associatedProduct.colour;

        if (colour !== activeShadeShotPlusColour && $sspColourSelectors) {
            [...$sspColourSelectors].map($element => {
                $element.classList.remove('c-button--selected');
                $element.classList.add('c-button--selectable');
                $element.style.display = $element.dataset.tags.includes(colour)
                    ? 'inline-block'
                    : 'none';
            });

            setActiveSSPProduct();
        }

        return false;
    }
};

const toggleCareProductsVisible = (colour: string): void => {
    if (els.$careTypeSelectors) {
        [...els.$careTypeSelectors].map($selector => {
            $selector.style.display = $selector.dataset.tags.includes(colour)
                ? 'inline-block'
                : 'none';
        });
    }
};

const toggleCareProductSelectedOption = (key: string, value: string): void => {
    const secondTargetSelector = eq(key, 'colour')
        ? `[data-colour="${value}"]`
        : `[data-product-type="${value}"]`;
    const $targetElements = document.querySelectorAll(
        `.js-care-${key}-selector${secondTargetSelector}`
    );
    const $allKeysElements = eq(key, 'colour') ? els.$careColourSelectors : els.$careTypeSelectors;

    if ($allKeysElements) {
        [...$allKeysElements].map($element => {
            $element.classList.remove('c-button--selected');
            $element.classList.add('c-button--selectable');
        });
    }

    if ($targetElements) {
        [...$targetElements].map($element => {
            $element.classList.remove('c-button--selectable');
            $element.classList.add('c-button--selected');
        });
    }

    activeCareProductValues[key] = value;
};

const handleCareColourChange = (event: Event) => {
    event.preventDefault();

    const $target: HTMLElement = intendedTargetElement('js-care-colour-selector', event.target);
    const colour = $target.dataset.colour;
    const isShadeShot = activeProduct.title.includes('Shade Shot');
    const defaultTypeProduct = find(associatedProducts, p => {
        if (isShadeShot) {
            return p.tags.includes(colour);
        } else {
            return p.tags.includes(colour) && p.title.includes(activeCareProductValues.type);
        }
    });

    if (defaultTypeProduct) {
        const $newSelectedType = find(els.$careTypeSelectors, $selector => {
            return parseInt(get($selector, 'dataset.productId')) === defaultTypeProduct.id;
        });

        if ($newSelectedType) {
            toggleCareProductSelectedOption('colour', colour);
            toggleCareProductSelectedOption('type', get($newSelectedType, 'dataset.productType'));
            toggleCareProductsVisible(colour);
            updateProductInfo(defaultTypeProduct);
            productDemo.updateOriginal(productDemos, colour);
        }
    }
};

const handleCareTypeChange = (event: Event) => {
    event.preventDefault();

    const $target: HTMLElement = (event.target: any);
    const product = find(associatedProducts, p => eq(p.id, parseFloat($target.dataset.productId)));

    if (product) {
        toggleCareProductSelectedOption('type', get($target, 'dataset.productType'));
        updateProductInfo(product);
    }
};

const setActiveCareProductOptions = () => {
    const $colour = document.querySelector('.js-care-colour-selector.c-button--selected');
    const $type = document.querySelector('.js-care-type-selector.c-button--selected');

    if ($colour) {
        activeCareProductValues.colour = get($colour, 'dataset.colour');
    }

    if ($type) {
        activeCareProductValues.type = get($type, 'dataset.productType');
    }
};

const preloadAssociatedProductImages = () => {
    if (associatedProducts) {
        const images = associatedProducts.map(product => product.featured_image);

        preloadImages(images);
    }
};

const setDefaultGalleryVideo = () => {
    const defaultGallery = getActiveProductGallery(product, product.handle);

    if (defaultGallery && defaultGallery.video !== '') {
        productGallery.updateVideo(defaultGallery.video);
    }
};

const events = () => {
    if (els.$addButton) {
        [...els.$addButton].map($button => $button.addEventListener('click', handleQuickAddToCart));
    }

    if (els.$associatedProductsDropdown) {
        [...els.$associatedProductsDropdown].map($select =>
            $select.addEventListener('change', event => {
                handleProductChange(event);

                if (collectionTypes.isShadeShotPlus) {
                    handleSSPPermanentChange(event);
                }
            })
        );
    }

    if (els.$quickAddButtons) {
        [...els.$quickAddButtons].map($button =>
            $button.addEventListener('click', handleQuickAddToCart)
        );
    }

    if (collectionTypes.isShadeShotPlus) {
        if (els.$sspColourSelectors) {
            [...els.$sspColourSelectors].map($selector => {
                $selector.addEventListener('click', handleSSPColourChange);
            });
        }
    } else if (collectionTypes.isCare) {
        if (els.$careColourSelectors) {
            [...els.$careColourSelectors].map($selector => {
                $selector.addEventListener('click', handleCareColourChange);
            });
        }

        if (els.$careTypeSelectors) {
            [...els.$careTypeSelectors].map($selector => {
                $selector.addEventListener('click', handleCareTypeChange);
            });
        }
    }
};

const cache = () => {
    els.$addButton = ((document.querySelectorAll('.js-add'): any): NodeList<HTMLButtonElement>);
    els.$associatedProductsDropdown = ((document.querySelectorAll(
        '.js-associated-products-dropdown'
    ): any): NodeList<HTMLSelectElement>);

    els.$preloadInteractions = ((document.querySelectorAll(
        '.js-preload-interaction'
    ): any): NodeList<HTMLElement>);
    els.$price = ((document.querySelectorAll('.js-price'): any): NodeList<HTMLElement>);
    els.$productImage = ((document.querySelectorAll('.js-product-image'): any): NodeList<
        HTMLElement
    >);
    els.$productImageRepeated = ((document.querySelector(
        '.js-product-image-repeated'
    ): any): HTMLElement);
    els.$productInstructions = ((document.querySelector(
        '.js-product-instructions'
    ): any): HTMLElement);
    els.$productName = ((document.querySelectorAll('.js-product-name'): any): NodeList<
        HTMLElement
    >);
    els.$quickAddButtons = ((document.querySelectorAll('.js-quick-add'): any): NodeList<
        HTMLElement
    >);

    if (collectionTypes.isShadeShotPlus) {
        els.$sspColourSelectors = ((document.querySelectorAll(
            '.js-ssp-colour-selector'
        ): any): NodeList<HTMLButtonElement>);
    } else if (collectionTypes.isCare) {
        els.$careColourSelectors = ((document.querySelectorAll(
            '.js-care-colour-selector'
        ): any): NodeList<HTMLButtonElement>);
        els.$careTypeSelectors = ((document.querySelectorAll(
            '.js-care-type-selector'
        ): any): NodeList<HTMLButtonElement>);
    }
};

const init = () => {
    cache();
    events();
    preloadAssociatedProductImages();

    if (collectionTypes.isPermanent || collectionTypes.isShadeShotPlus) {
        customDropdownInit();
    }

    if (collectionTypes.isPermanent) {
        shadeComparison.init();
        shadeComparison.update(activeProduct.title, activeProduct.handle);
    }

    if (collectionTypes.isShadeShotPlus) {
        setActiveSSPProduct(true);
    }

    if (collectionTypes.isCare) {
        setActiveCareProductOptions();
    }

    if (productTrackView && activeProduct) {
        // trackProductView(activeProduct.id, activeProduct.price);
    }

    cartInit();
    productDemo.init();
    productGallery.init();
    productInfo.init();
    productInstructions.init();
    productQuote.init();
    productPromoBanner.init();
    productRecommendation.init();
    productVideo.init();

    setProductDetails();
    setDefaultGalleryVideo();
};

export default {init};
