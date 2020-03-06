/**
 * @prettier
 * @flow
 */
import add from 'lodash/add';
import clamp from 'lodash/clamp';
import eq from 'lodash/eq';
import filter from 'lodash/filter';
import find from 'lodash/find';
import get from 'lodash/get';
import includes from 'lodash/includes';
import indexOf from 'lodash/indexOf';
import keyBy from 'lodash/keyBy';
import last from 'lodash/last';
import lowerCase from 'lodash/lowerCase';
import map from 'lodash/map';
import size from 'lodash/size';
import split from 'lodash/split';
import subtract from 'lodash/subtract';
import toLower from 'lodash/toLower';
import {careReasons, concealerReasons, permanentReasons} from './consultation-reasons';
import {getShadeFromProductName} from '../services/helpers';

const SHADE_CHANGE_STEP = 1;

/**
 * The products are pulled directly from the shop and stored in a global variable in the liquid template.
 */
let careProducts = get(window, 'globalData.CarerangeProducts', []);
let concealerProducts = get(window, 'globalData.RootconcealersProducts', []);
let permanentProducts = get(window, 'globalData.PermanentcolourProducts', []);
let finalColourDetails: JWCConsultationFinalColour | null = null;

export const setProducts = (products: Object) => {
    careProducts = products.careProducts;
    concealerProducts = products.concealerProducts;
    permanentProducts = products.permanentProducts;
};

const mapMatchesToProducts = (
    matches: Array<JWCConsultationPossibleMatch>,
    predicate: Function,
    products: Array<JWCConsultationRecommendation>
): Array<*> => {
    /**
     * Take a collection of products and filter against a predicate based on a user's answers
     */
    return filter(matches, predicate)
        .map(match => {
            const matched = find(products, p => p.key.includes(match.key));

            return matched ? matched : {};
        })
        .filter(match => match);
};

export const formatResults = (answers: Array<JWCConsultationAnswer>): JWCConsultationResult => {
    /**
     * Give the questions a better name for referencing later...
     */
    const questionKeys = {
        '2': 'hairColourType',
        '3': 'greyAmount',
        '4': 'greyAim',
        '5': 'currentColour',
        '6': 'currentColourShade',
        '8': 'colourAmbition',
        '9': 'toneAmbition',
        '10': 'careAmbition',
        '12': 'greyPermAmbition',
        '13': 'greyPermAmbitionShade'
    };

    const result = {};

    answers.map(answer => {
        const key = questionKeys[answer.questionId];

        if (key) result[key] = answer.value;
    });

    /**
     * If there is no regrowth, set the regrowth as their current colour
     */
    if (!result.regrowthColourShade) {
        result.regrowthColourShade = result.currentColourShade;
    }

    /**
     *  Sets colour keys grey colour keys if they've selected >80% greys
     */
    if (!result.currentColour && result.greyPermAmbition) {
        result.currentColour = result.greyPermAmbition;
        result.currentColourShade = result.greyPermAmbitionShade;
        result.colourAmbition = 'Stay the same';
        result.regrowthColourShade = result.greyPermAmbitionShade;
    }

    return result;
};

const isRegrowthColourTooDark = (details: JWCConsultationFinalColour | null): boolean => {
    if (details) {
        const {regrowthShadeIndex, currentShadeIndex} = details;

        if (
            typeof currentShadeIndex !== 'undefined' &&
            typeof regrowthShadeIndex !== 'undefined' &&
            regrowthShadeIndex > -1
        ) {
            const shadeDifference = regrowthShadeIndex - currentShadeIndex;
            const maxDifferenceAllowed = SHADE_CHANGE_STEP * 2;

            if (shadeDifference < maxDifferenceAllowed * -1) {
                return true;
            }
        }
    }

    return false;
};

const isCurrentColourTooLight = (details: JWCConsultationFinalColour | null): boolean => {
    if (details) {
        const {regrowthShadeIndex, shadeIndex} = details;

        if (typeof regrowthShadeIndex !== 'undefined' && typeof shadeIndex !== 'undefined') {
            if (
                regrowthShadeIndex >= 0 &&
                shadeIndex > regrowthShadeIndex &&
                shadeIndex - regrowthShadeIndex > SHADE_CHANGE_STEP
            ) {
                return true;
            }
        }
    }

    return false;
};

export const getPermanentReason = (
    results: JWCConsultationResult,
    colourDetails: JWCConsultationFinalColour | null,
    products: Array<JWCConsultationRecommendation> = []
): string => {
    if (eq('Highlights', results.hairColourType)) {
        return permanentReasons.highlights();
    } else if (eq('Bleached', results.hairColourType)) {
        return permanentReasons.bleached();
    } else if (eq('Balayage', results.hairColourType)) {
        return permanentReasons.balayage();
    } else if (
        colourDetails &&
        (isRegrowthColourTooDark(colourDetails) || isCurrentColourTooLight(colourDetails))
    ) {
        return permanentReasons.unsuitableColour();
    } else {
        const product = find(products, p => p.key.includes('permanent-colour'));

        if (product) {
            const productColour = last(split(product.title, ' - '));
            const productShade = getShadeFromProductName(product.title);

            if (
                eq('None (0%)', results.greyAmount) ||
                eq('Very few (less than 10%)', results.greyAmount)
            ) {
                const greysType = eq('None (0%)', results.greyAmount)
                    ? 'no greys'
                    : 'very few greys';

                if (eq('Not sure', results.colourAmbition)) {
                    return permanentReasons.lowGreysAndNotSure(
                        greysType,
                        productColour,
                        productShade
                    );
                } else if (
                    eq('Stay the same', results.colourAmbition) &&
                    eq('None, my colour is natural', results.hairColourType)
                ) {
                    return permanentReasons.lowGreysAndStayTheSameNatural(
                        greysType,
                        productColour,
                        productShade
                    );
                } else if (
                    eq('Stay the same', results.colourAmbition) &&
                    !eq('None, my colour is natural', results.hairColourType)
                ) {
                    return permanentReasons.lowGreysAndStayTheSameNotNatural(
                        greysType,
                        productColour,
                        productShade
                    );
                } else if (eq('A bit lighter', results.colourAmbition)) {
                    return permanentReasons.lowGreysAndABitLighter(
                        greysType,
                        productColour,
                        productShade
                    );
                } else if (eq('A bit darker', results.colourAmbition)) {
                    return permanentReasons.lowGreysAndABitDarker(
                        greysType,
                        productColour,
                        productShade
                    );
                } else if (eq('A lot darker', results.colourAmbition)) {
                    return permanentReasons.lowGreysAndALotDarker(
                        greysType,
                        productColour,
                        productShade
                    );
                }
            } else {
                if (eq('Not sure', results.colourAmbition)) {
                    return permanentReasons.midHighGreysAndNotSure(productColour, productShade);
                } else if (eq('Stay the same', results.colourAmbition)) {
                    return permanentReasons.midHighGreysAndStayTheSame(productColour, productShade);
                } else if (eq('A bit lighter', results.colourAmbition)) {
                    return permanentReasons.midHighGreysAndABitLighter(productColour, productShade);
                } else if (eq('A bit darker', results.colourAmbition)) {
                    return permanentReasons.midHighGreysAndABitDarker(productColour, productShade);
                } else if (eq('A lot darker', results.colourAmbition)) {
                    return permanentReasons.midHighGreysAndALotDarker(productColour, productShade);
                }
            }
        }
    }

    return '';
};

export const getConcealerReason = (
    results: JWCConsultationResult,
    colourDetails: JWCConsultationFinalColour | null,
    products: Array<JWCConsultationRecommendation> = []
): string => {
    let reasons = [];

    if (colourDetails && isRegrowthColourTooDark(colourDetails)) {
        reasons.push(concealerReasons.regrowthTooDark(products));
    } else if (eq(results.greyAmount, 'None (0%)')) {
        reasons.push(concealerReasons.noGreys(products));
    } else if (eq(results.greyAmount, 'Very few (less than 10%)')) {
        reasons.push(concealerReasons.fewGreys(products));
    } else {
        reasons.push(concealerReasons.someMostAndAllGreys(products));
    }

    return reasons.join(' ');
};

export const getCareReason = (
    results: JWCConsultationResult,
    colourDetails: JWCConsultationFinalColour | null,
    products: Array<JWCConsultationRecommendation>
): string => {
    let reasons = [
        careReasons.textureAndColour(
            toLower(get(results, 'hairTexture')),
            toLower(get(colourDetails, 'colour'))
        ),
        careReasons.everythingMask()
    ];

    const shadeShotProduct = find(products, p => p.key.includes('shade-shot'));

    if (shadeShotProduct) {
        reasons.push(
            careReasons.shadeShot(
                get(shadeShotProduct, 'title'),
                toLower(get(results, 'unwantedTone'))
            )
        );
    }

    return reasons.join(' ');
};

/**
 * If their hair is natural there won't be a current colour answer, so use the shade colour instead
 */
const getUseableCurrentColour = ({currentColour, currentColourShade, greyAim}) => {
    if (finalColourDetails && finalColourDetails.shade && finalColourDetails.colour) {
        return `${finalColourDetails.shade} ${finalColourDetails.colour}`;
    }

    if (greyAim && greyAim != `I'm not ready to be grey yet! Let's cover it`) {
        return 'Grey';
    }

    return currentColour && currentColour !== '' ? currentColour : currentColourShade;
};

/**
 * This is an importan function as it sets all the information for a user's current and ambition colour. We use
 * this when calculating their care products, permanent colour, etc.
 */
export const setFinalColourDetails = (
    currentColourShade: string,
    colourAmbition: string = 'Stay the same',
    regrowthColourShade: string
) => {
    /**
     * Define the steps to move up/down for a user's ambition depending on if it's to be darker, lighter, or the same.
     */
    const newShadeCalculations = {
        'A lot darker': [subtract, SHADE_CHANGE_STEP * 2],
        'A bit darker': [subtract, SHADE_CHANGE_STEP],
        'A bit lighter': [add, SHADE_CHANGE_STEP],
        'Stay the same': [add, 0]
    };
    const newShadeCalculation = newShadeCalculations[colourAmbition];

    /**
     * Get all the shades from Permanent products. E.g. 'Permanent Colour 2.0 Darkest Brown' will return '2'.
     */
    const allPermanentProductShades = permanentProducts.map(p => getShadeFromProductName(p.title));

    /**
     * Get the shades for a user's current colour and their regrowth colour. We use these to determine if we can
     * recommend a colour or not.
     */
    const currentShadeNumber = getShadeFromProductName(currentColourShade);
    const regrowthShadeNumber = getShadeFromProductName(regrowthColourShade);

    /**
     * Take the pointer for the current and regrowth products, depending on their shade
     */
    const currentShadeIndex = indexOf(allPermanentProductShades, currentShadeNumber);
    const regrowthShadeIndex = indexOf(allPermanentProductShades, regrowthShadeNumber);

    /**
     * Get their recommended Permanent product. Using `clamp` we make sure it doesn't go too low or too high
     * out of range.
     */
    const newShadeIndex = clamp(
        newShadeCalculation[0].call(null, currentShadeIndex, newShadeCalculation[1]),
        0,
        allPermanentProductShades.length - 1
    );

    /**
     * Return all the final details needed for product recommendations and colour calculations.
     */
    finalColourDetails = {
        allShades: allPermanentProductShades,
        calculation: newShadeCalculations[colourAmbition],
        colour: includes(permanentProducts[newShadeIndex].key, 'blonde') ? 'blonde' : 'brown',
        currentShadeIndex: currentShadeIndex,
        regrowthShadeIndex: regrowthShadeIndex,
        shade: includes(permanentProducts[newShadeIndex].key, 'light') ? 'Light' : 'Dark',
        shadeIndex: newShadeIndex,
        shadeNumber: allPermanentProductShades[newShadeIndex],
        steps: newShadeIndex - currentShadeIndex
    };
};

const getPermanentMatch = (): Array<*> => {
    if (finalColourDetails && !isCurrentColourTooLight(finalColourDetails)) {
        const {allShades, shadeIndex} = finalColourDetails;

        /**
         * Filter all Permanent products to find the one that matches a user's current colour number
         */
        if (typeof allShades !== 'undefined' && typeof shadeIndex !== 'undefined') {
            return permanentProducts.filter(p => p.title.includes(allShades[shadeIndex]));
        }
    }

    return [];
};

export const getPermanentRecommendation = (results: JWCConsultationResult) => {
    let products = [];

    /**
     * If we have the required information to set a user's colour detail, set that before getting their
     * recommende product.
     */
    if (
        results.currentColourShade &&
        (results.colourAmbition || results.greyPermColourAmbition) &&
        results.regrowthColourShade
    ) {
        setFinalColourDetails(
            results.currentColourShade,
            results.colourAmbition,
            results.regrowthColourShade
        );
    }

    /**
     * Permanent Colour products can only be recommended to these 2 hair colour types
     */
    if (includes(['All-over colour', 'None, my colour is natural'], results.hairColourType)) {
        products = getPermanentMatch();
    }

    return products;
};

const getBlendingBrushMatches = (results: JWCConsultationResult) => {
    const possibleMatches = [
        {
            colourShade: 'Dark brown',
            key: 'darker-brown-blending-brush'
        },
        {
            colourShade: 'Light brown',
            key: 'lighter-brown-blending-brush'
        },
        {
            colourShade: 'Dark blonde',
            key: 'darker-blonde-blending-brush'
        }
    ];
    /**
     * Compare all Concealer products against possible Blending Brush products, depending on a user's current
     * hair colour.
     */
    return mapMatchesToProducts(
        possibleMatches,
        match => includes(getUseableCurrentColour(results), match.colourShade),
        concealerProducts
    );
};

const getRootMarkerMatches = (results: JWCConsultationResult) => {
    const possibleMatches = [
        {
            colourShade: 'Dark brown',
            key: 'darker-brown-root-marker'
        },
        {
            colourShade: 'Dark blonde',
            key: 'darker-blonde-root-marker'
        },
        {
            colourShade: 'Light blonde',
            key: 'lighter-blonde-root-marker'
        }
    ];

    /**
     * Compare all Concealer products against possible Root Marker products, depending on a user's current hair colour.
     */
    return mapMatchesToProducts(
        possibleMatches,
        match => includes(getUseableCurrentColour(results), match.colourShade),
        concealerProducts
    );
};

const getRootSmudgerMatches = (results: JWCConsultationResult) => {
    const possibleMatches = [
        {
            colourShade: 'Light brown',
            key: 'lighter-brown-root-smudger'
        },
        {
            colourShade: 'Dark brown',
            key: 'darker-brown-root-smudger'
        },
        {
            colourShade: 'Dark blonde',
            key: 'darker-blonde-root-smudger'
        }
    ];

    /**
     * Compare all Concealer products against possible Root Smudger products, depending on a user's current
     * hair colour.
     */
    return mapMatchesToProducts(
        possibleMatches,
        match => includes(getUseableCurrentColour(results), match.colourShade),
        concealerProducts
    );
};

const getTintedDryShampooMatches = (results: JWCConsultationResult) => {
    const possibleMatches = [
        {
            colourShade: 'Dark brown',
            key: 'darker-brown-tinted-dry-shampoo'
        },
        {
            colourShade: 'Light brown',
            key: 'lighter-brown-tinted-dry-shampoo'
        },
        {
            colourShade: 'Light blonde',
            key: 'lighter-blonde-tinted-dry-shampoo'
        }
    ];

    /**
     * Compare all Concealer products against possible Tinted Dry Shampoo products, depending on a user's
     * current hair colour.
     */
    return mapMatchesToProducts(
        possibleMatches,
        match => includes(getUseableCurrentColour(results), match.colourShade),
        concealerProducts
    );
};

export const getConcealerRecommendation = (results: JWCConsultationResult) => {
    let products = [];

    /**
     * We can only recommend Concealer products if a user has some grey hair, _or_ they have a
     * compatible colour type.
     */
    if (
        !eq('None (0%)', results.greyAmount) &&
        !includes(['Henna', 'Bleached'], results.hairColourType)
    ) {
        const regrowthTooDark = isRegrowthColourTooDark(finalColourDetails);

        let blendingBrushProducts = [];
        let rootSmudgerProducts = [];
        let rootMarkerProducts = [];
        let tintedDryShampooProducts = [];

        if (!regrowthTooDark) {
            const canRecommendBlendingBrush = !includes(['None (0%)'], results.greyAmount);
            const canRecommendRootSmudger = !includes(['None (0%)'], results.greyAmount);
            const canRecommendRootMarker = includes(
                ['None, my colour is natural', 'All-over colour'],
                results.hairColourType
            );

            if (canRecommendBlendingBrush) {
                blendingBrushProducts = getBlendingBrushMatches(results);
            }

            if (canRecommendRootSmudger) {
                rootSmudgerProducts = getRootSmudgerMatches(results);
            }

            if (canRecommendRootMarker) {
                rootMarkerProducts = getRootMarkerMatches(results);
            }
        }

        const canRecommendTintedDryShampoo = includes(
            ['All-over colour', 'None, my colour is natural', 'Highlights', 'Balayage'],
            results.hairColourType
        );

        if (canRecommendTintedDryShampoo) {
            tintedDryShampooProducts = getTintedDryShampooMatches(results);
        }

        /**
         * Return the final collection of all possible recommendations for Concealer products.
         */
        products = [
            ...blendingBrushProducts,
            ...rootSmudgerProducts,
            ...rootMarkerProducts,
            ...tintedDryShampooProducts
        ];
    }

    return products;
};

/**
 * Recommend a Shampoo based on hair colour and hair texture
 */
const getShampooMatches = (results: JWCConsultationResult) => {
    const possibleMatches = [
        {
            key: 'fine-blonde-shampoo',
            texture: ['Add some volume and lock in moisture'],
            colour: ['Light blonde', 'Dark blonde', 'Grey']
        },
        {
            key: 'frizzy-blonde-shampoo',
            texture: ['Smooth my hair and keep it under control'],
            colour: ['Light blonde', 'Dark blonde', 'Grey']
        },
        {
            key: 'fine-brunette-shampoo',
            texture: ['Add some volume and lock in moisture'],
            colour: ['Light brown', 'Dark brown']
        },
        {
            key: 'frizzy-brunette-shampoo',
            texture: ['Smooth my hair and keep it under control'],
            colour: ['Light brown', 'Dark brown']
        }
    ];

    /**
     * Compare all Care products against possible Shampoo products, depending on a user's selected hair texture
     * and current hair colour. Multiple hair textures can map to a single product. E.g. 'fine' and 'flat' can both
     * match to a 'fine' shampoo.
     */
    return mapMatchesToProducts(
        possibleMatches,
        match =>
            includes(match.colour, getUseableCurrentColour(results)) &&
            includes(match.texture, results.careAmbition),
        careProducts
    );
};

/**
 * Recommend a Conditioner based on hair colour and hair texture
 */
const getConditionerMatches = (
    results: JWCConsultationResult
): Array<JWCConsultationRecommendation | Object> => {
    const possibleMatches = [
        {
            key: 'fine-blonde-conditioner',
            texture: ['Add some volume and lock in moisture'],
            colour: ['Light blonde', 'Dark blonde', 'Grey']
        },
        {
            key: 'frizzy-blonde-conditioner',
            texture: ['Smooth my hair and keep it under control'],
            colour: ['Light blonde', 'Dark blonde', 'Grey']
        },
        {
            key: 'fine-brunette-conditioner',
            texture: ['Add some volume and lock in moisture'],
            colour: ['Light brown', 'Dark brown']
        },
        {
            key: 'frizzy-brunette-conditioner',
            texture: ['Smooth my hair and keep it under control'],
            colour: ['Light brown', 'Dark brown']
        }
    ];
    /**
     * Compare all Care products against possible Conditioner products, depending on a user's selected hair texture
     * and current hair colour. Multiple hair textures can map to a single product. E.g. 'fine' and 'flat' can both
     * match to a 'fine' conditioner.
     */
    return mapMatchesToProducts(
        possibleMatches,
        match =>
            includes(match.colour, getUseableCurrentColour(results)) &&
            includes(match.texture, results.careAmbition),
        careProducts
    );
};

/**
 * Recommend a Shade Shot based on the unwanted tones
 */
const getShadeShotMatches = (
    results: JWCConsultationResult
): Array<JWCConsultationRecommendation> => {
    const possibleMatches = [
        {
            key: 'shade-shot-plus-chestnut-brunette',
            tone: 'Rich, warm and chocolatey'
        },
        {
            key: 'shade-shot-plus-smoky-brunette',
            tone: 'Ashy, cool and smoky'
        },
        {
            key: 'shade-shot-plus-champagne-blonde',
            tone: 'Soft and sun-kissed'
        },
        {
            key: 'shade-shot-plus-icy-blonde',
            tone: 'Cool, ashy and icy'
        }
    ];

    /**
     * Compare all Care products against possible Shade Shot products, depending on a user's selected tone ambition
     * and current hair colour.
     */
    return mapMatchesToProducts(
        possibleMatches,
        match => eq(match.tone, results.toneAmbition),
        careProducts
    );
};

export const getCareRecommendation = (
    results: JWCConsultationResult
): Array<JWCConsultationRecommendation> => {
    const shampooProducts = getShampooMatches(results);
    const conditionerProducts = getConditionerMatches(results);

    /**
     * We don't need to find a match for the Everything Mask as everyone should be recommended that so we just
     * need to pick it out from the Care product collection.
     */
    const everythingMaskProduct = filter(careProducts, p => eq('everything-mask', p.key));

    let shadeShotProducts = [];

    /**
     * Shade Shot products are incompatible with the `Henna` hair type, so only include them if a user's hair
     * is not Henna.
     */
    if (!eq('Henna', results.hairColourType)) {
        shadeShotProducts = getShadeShotMatches(results);
    }

    /**
     * Return the final collection of all possible recommendations for Care products.
     */
    const products = [
        ...shadeShotProducts,
        ...shampooProducts,
        ...conditionerProducts,
        ...everythingMaskProduct
    ];

    return products;
};

/**
 * This is the main function called to get the results for all collections.
 */
export const consultationResults = (
    answers: Array<JWCConsultationAnswer>
): JWCConsultationRecommendations => {
    const results = formatResults(answers);
    const permanentProducts = getPermanentRecommendation(results);
    const concealerProducts = getConcealerRecommendation(results);
    const careProducts = getCareRecommendation(results);

    const recommendations = {
        permanent: {
            products: permanentProducts,
            reason: getPermanentReason(results, finalColourDetails, permanentProducts)
        },
        concealer: {
            products: concealerProducts,
            reason: getConcealerReason(results, finalColourDetails, concealerProducts)
        },
        care: {
            products: careProducts,
            reason: getCareReason(results, finalColourDetails, careProducts)
        }
    };

    return recommendations;
};

export const resetFinalColour = () => (finalColourDetails = null);

export default consultationResults;
