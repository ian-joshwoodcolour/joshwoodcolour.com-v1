/**
 * @prettier
 */
import {expect} from 'chai';
import eq from 'lodash/eq';
import filter from 'lodash/filter';
import get from 'lodash/get';
import gte from 'lodash/gte';
import head from 'lodash/head';
import includes from 'lodash/includes';
import map from 'lodash/map';
import size from 'lodash/size';
import {
    formatResults,
    getPermanentReason,
    getConcealerReason,
    getCareReason,
    getPermanentRecommendation,
    getConcealerRecommendation,
    getCareRecommendation,
    consultationResults,
    resetFinalColour,
    setFinalColourDetails,
    setProducts
} from '../../src/js/components/consultation-results';
import {careProducts, concealerProducts, permanentProducts} from '../stubs/consultation-products';

describe('Consultation Results:', () => {
    beforeEach(() => {
        setProducts({
            careProducts,
            concealerProducts,
            permanentProducts
        });

        resetFinalColour();
    });

    it('returns recommendations for Permanent, Concealer and Care products', () => {
        const results = consultationResults([]);
        const actual = Object.keys(results);
        const expected = ['permanent', 'concealer', 'care'];

        expect(actual).to.deep.equal(expected);
    });

    it('returns products and reasons for the recommendations', () => {
        const keys = ['permanent', 'concealer', 'care'];

        keys.map(key => {
            const results = consultationResults([]);
            const actual = Object.keys(results[key]);
            const expected = ['products', 'reason'];

            expect(actual).to.deep.equal(expected);
        });
    });

    describe('Formatting results:', () => {
        it('returns the formatted answer for hair colour type', () => {
            const answers = [{questionId: 2, value: 'Foo bar'}];
            const actual = formatResults(answers);
            const expected = {hairColourType: 'Foo bar'};

            expect(actual).to.include(expected);
        });

        it('returns the formatted answer for current colour', () => {
            const answers = [{questionId: 5, value: 'Foo bar'}];
            const actual = formatResults(answers);
            const expected = {currentColour: 'Foo bar'};

            expect(actual).to.include(expected);
        });

        it('returns the formatted answer for colour shade', () => {
            const answers = [{questionId: 6, value: 'Foo bar'}];
            const actual = formatResults(answers);
            const expected = {currentColourShade: 'Foo bar'};

            expect(actual).to.include(expected);
        });

        it('returns the formatted answer for grey amount', () => {
            const answers = [{questionId: 3, value: 'Foo bar'}];
            const actual = formatResults(answers);
            const expected = {greyAmount: 'Foo bar'};

            expect(actual).to.include(expected);
        });

        it('returns the formatted answer for colour ambition', () => {
            const answers = [{questionId: 8, value: 'Foo bar'}];
            const actual = formatResults(answers);
            const expected = {colourAmbition: 'Foo bar'};

            expect(actual).to.include(expected);
        });

        it('returns the formatted answer for hair texture', () => {
            const answers = [{questionId: 10, value: 'Foo bar'}];
            const actual = formatResults(answers);
            const expected = {careAmbition: 'Foo bar'};

            expect(actual).to.include(expected);
        });
    });

    describe('Permanent product recommendations:', () => {
        it('returns no products for "Henna" colour type', () => {
            const result = {hairColourType: 'Henna'};
            const actual = size(getPermanentRecommendation(result));
            const expected = 0;

            expect(actual).to.equal(expected);
        });

        it('returns no products for "Bleached" colour type', () => {
            const result = {hairColourType: 'Bleached'};
            const actual = size(getPermanentRecommendation(result));
            const expected = 0;

            expect(actual).to.equal(expected);
        });

        it('returns no products for "Balayage" colour type', () => {
            const result = {hairColourType: 'Balayage'};
            const actual = size(getPermanentRecommendation(result));
            const expected = 0;

            expect(actual).to.equal(expected);
        });

        it('returns no products for "Highlights" colour type', () => {
            const result = {hairColourType: 'Highlights'};
            const actual = size(getPermanentRecommendation(result));
            const expected = 0;

            expect(actual).to.equal(expected);
        });

        it('returns the correct colour for the "A lot darker" colour ambition for "Natural" and "All-over" colour', () => {
            const hairColourTypes = ['None, my colour is natural', 'All-over colour'];

            hairColourTypes.map(colourType => {
                const result = {
                    colourAmbition: 'A lot darker',
                    currentColourShade: 'Dark blonde (Shade 6.5)',
                    hairColourType: colourType,
                    regrowthColourShade: 'Dark blonde (Shade 6.5)'
                };
                const actual = getPermanentRecommendation(result)[0].title;
                const expected = 'Permanent Colour 5.5 - Lightest Brown';

                expect(actual).to.equal(expected);
            });
        });

        it('returns the correct colour for the "A bit darker" colour ambition for "Natural" and "All-over" colour', () => {
            const hairColourTypes = ['None, my colour is natural', 'All-over colour'];

            hairColourTypes.map(colourType => {
                const result = {
                    colourAmbition: 'A bit darker',
                    currentColourShade: 'Dark blonde (Shade 6.5)',
                    hairColourType: colourType,
                    regrowthColourShade: 'Dark blonde (Shade 6.5)'
                };
                const actual = getPermanentRecommendation(result)[0].title;
                const expected = 'Permanent Colour 6.0 - Darkest Blonde';

                expect(actual).to.equal(expected);
            });
        });

        it('returns the correct colour for the "A bit lighter" colour ambition for "Natural" and "All-over" colour', () => {
            const hairColourTypes = ['None, my colour is natural', 'All-over colour'];

            hairColourTypes.map(colourType => {
                const result = {
                    colourAmbition: 'A bit lighter',
                    currentColourShade: 'Dark blonde (Shade 6.5)',
                    hairColourType: colourType,
                    regrowthColourShade: 'Dark blonde (Shade 6.5)'
                };
                const actual = getPermanentRecommendation(result)[0].title;
                const expected = 'Permanent Colour 7.0 - Deep Mid-Blonde';

                expect(actual).to.equal(expected);
            });
        });

        it('returns the closest colour for the "A bit darker" colour ambition for "Natural" and "All-over" colour if it cannot go any darker', () => {
            const hairColourTypes = ['None, my colour is natural', 'All-over colour'];

            hairColourTypes.map(colourType => {
                const result = {
                    colourAmbition: 'A lot darker',
                    currentColourShade: 'Darkest brown (Shade 2.0)',
                    hairColourType: colourType,
                    regrowthColourShade: 'Dark brown (Shade 3.0)'
                };
                const actual = getPermanentRecommendation(result)[0].title;
                const expected = 'Permanent Colour 2.0 - Darkest Brown';

                expect(actual).to.equal(expected);
            });
        });

        it('returns the closest colour for the "A bit darker" colour ambition for "Natural" and "All-over" colour if it can only go a little darker', () => {
            const hairColourTypes = ['None, my colour is natural', 'All-over colour'];

            hairColourTypes.map(colourType => {
                const result = {
                    colourAmbition: 'A lot darker',
                    currentColourShade: 'Dark Brown (Shade 3.0)',
                    hairColourType: colourType,
                    regrowthColourShade: 'Dark blonde (Shade 3.0)'
                };
                const actual = getPermanentRecommendation(result)[0].title;
                const expected = 'Permanent Colour 2.0 - Darkest Brown';

                expect(actual).to.equal(expected);
            });
        });

        it('returns the closest colour for the "A bit lighter" colour ambition for "Natural" and "All-over" colour if it cannot go any lighter', () => {
            const hairColourTypes = ['None, my colour is natural', 'All-over colour'];

            hairColourTypes.map(colourType => {
                const result = {
                    colourAmbition: 'A bit lighter',
                    currentColourShade: 'Lightest Blonde (Shade 9.0)',
                    hairColourType: colourType,
                    regrowthColourShade: 'Dark blonde (Shade 9.0)'
                };
                const actual = getPermanentRecommendation(result)[0].title;
                const expected = 'Permanent Colour 9.0 - Lightest Blonde';

                expect(actual).to.equal(expected);
            });
        });

        it('returns no recommendation for "Natural" and "All-over" colour if it is more than 2 shades lighter than grey regrowth colour', () => {
            const hairColourTypes = ['None, my colour is natural', 'All-over colour'];

            hairColourTypes.map(colourType => {
                const result = {
                    colourAmbition: 'A bit lighter',
                    currentColourShade: 'Lightest Blonde (Shade 7.0)',
                    hairColourType: colourType,
                    regrowthColourShade: 'Light Brown (Shade 4.0)'
                };
                const actual = size(getPermanentRecommendation(result));
                const expected = 0;

                expect(actual).to.equal(expected);
            });
        });

        it('returns the same colour for the "Stay the same" colour ambition for "Natural" and "All-over" colour', () => {
            const hairColourTypes = ['None, my colour is natural', 'All-over colour'];

            hairColourTypes.map(colourType => {
                const result = {
                    colourAmbition: 'Stay the same',
                    currentColourShade: 'Light Brown (Shade 5.0)',
                    hairColourType: colourType,
                    regrowthColourShade: 'Dark blonde (Shade 5.0)'
                };
                const actual = getPermanentRecommendation(result)[0].title;
                const expected = 'Permanent Colour 5.0 - Light Brown';

                expect(actual).to.equal(expected);
            });
        });
    });

    describe('Permanent product reasons:', () => {
        it('should return a reason for no product recommendations for "Highlights" hair colour type', () => {
            const result = {hairColourType: 'Highlights'};
            const finalColourDetails = {};
            const actual = getPermanentReason(result, finalColourDetails);
            const expected =
                'Our permanent colours are designed to provide an all-over tint, so we’d always recommend visiting a salon for highlights.';

            expect(actual).to.equal(expected);
        });

        it('should return a reason for no product recommendations for "Bleached" hair colour type', () => {
            const result = {hairColourType: 'Bleached'};
            const finalColourDetails = {};
            const actual = getPermanentReason(result, finalColourDetails);
            const expected = 'We do not have any permanent colours suitable for bleached hair.';

            expect(actual).to.equal(expected);
        });

        it('should return a reason for no product recommendations for "Balayage" hair colour type', () => {
            const result = {hairColourType: 'Balayage'};
            const finalColourDetails = {};
            const actual = getPermanentReason(result, finalColourDetails);
            const expected =
                "Our hair colour provides an all over tint and we'd always recommend going to a salon for balayage.";

            expect(actual).to.equal(expected);
        });

        it('should return a reason for no product recommendations for unsuitable current colour', () => {
            const result = {hairColourType: 'All-over colour'};
            const finalColourDetails = {
                regrowthShadeIndex: 2,
                shadeIndex: 9
            };
            const actual = getPermanentReason(result, finalColourDetails);
            const expected =
                'We do not have any colours which provide lift, so we’d always recommend visiting a salon when your regrowth is significantly darker than the lengths of your hair.';

            expect(actual).to.equal(expected);
        });

        it('should return a reason for no product recommendations for unsuitable regrowth colour', () => {
            const result = {hairColourType: 'All-over colour'};
            const finalColourDetails = {
                currentShadeIndex: 2,
                regrowthShadeIndex: 2,
                shadeIndex: 8
            };
            const actual = getPermanentReason(result, finalColourDetails);
            const expected =
                'We do not have any colours which provide lift, so we’d always recommend visiting a salon when your regrowth is significantly darker than the lengths of your hair.';

            expect(actual).to.equal(expected);
        });

        it('should return a reason for a product recommendation for no/few greys and not sure what colour direction to go in', () => {
            const result = {
                colourAmbition: 'Not sure',
                currentColourShade: 'Light Brown (Shade 5.0)',
                hairColourType: 'All-over colour',
                greyAmount: 'Very few (less than 10%)'
            };
            const finalColourDetails = {
                currentShadeIndex: 3,
                regrowthShadeIndex: 3,
                shadeIndex: 3
            };
            const products = [
                {
                    title: 'Permanent Colour 5.0 - Light Brown',
                    key: 'permanent-colour-5-0-light-brown'
                }
            ];
            const actual = getPermanentReason(result, finalColourDetails, products);
            const expected =
                'With very few greys you don’t need to worry about permanent colour just yet, but if you’d like to change the shade of your hair we think you might like the Light Brown (5.0).';

            expect(actual).to.equal(expected);
        });

        it('should return a reason for a product recommendation for no/few greys, has natural hair colour and wants to stay the same colour', () => {
            const result = {
                colourAmbition: 'Stay the same',
                currentColourShade: 'Light Brown (Shade 5.0)',
                hairColourType: 'None, my colour is natural',
                greyAmount: 'None (0%)'
            };
            const finalColourDetails = {
                currentShadeIndex: 3,
                regrowthShadeIndex: 3,
                shadeIndex: 3
            };
            const products = [
                {
                    title: 'Permanent Colour 5.0 - Light Brown',
                    key: 'permanent-colour-5-0-light-brown'
                }
            ];
            const actual = getPermanentReason(result, finalColourDetails, products);
            const expected =
                'With no greys you don’t need to worry about permanent colour just yet, but if you decide you’d like to change the shade of your natural hair later down the line we think you might like the Light Brown (5.0).';

            expect(actual).to.equal(expected);
        });

        it("should return a reason for a product recommendation for no/few greys, doesn't have natural colour and wants to stay the same colour", () => {
            const result = {
                colourAmbition: 'Stay the same',
                currentColourShade: 'Light Brown (Shade 5.0)',
                hairColourType: 'All-over colour',
                greyAmount: 'Very few (less than 10%)'
            };
            const finalColourDetails = {
                currentShadeIndex: 3,
                regrowthShadeIndex: 3,
                shadeIndex: 3
            };
            const products = [
                {
                    title: 'Permanent Colour 5.0 - Light Brown',
                    key: 'permanent-colour-5-0-light-brown'
                }
            ];
            const actual = getPermanentReason(result, finalColourDetails, products);
            const expected =
                'With very few greys you don’t need to worry about permanent colour just yet, but if you’d like to maintain the shade of your hair we think you might like the Light Brown (5.0).';

            expect(actual).to.equal(expected);
        });

        it('should return a reason for a product recommendation for no/few greys and wants to go a bit lighter in colour', () => {
            const result = {
                colourAmbition: 'A bit lighter',
                currentColourShade: 'Light Brown (Shade 5.0)',
                hairColourType: 'All-over colour',
                greyAmount: 'None (0%)'
            };
            const finalColourDetails = {
                currentShadeIndex: 3,
                regrowthShadeIndex: 3,
                shadeIndex: 3
            };
            const products = [
                {
                    title: 'Permanent Colour 5.0 - Light Brown',
                    key: 'permanent-colour-5-0-light-brown'
                }
            ];
            const actual = getPermanentReason(result, finalColourDetails, products);
            const expected =
                'With no greys you don’t need to worry about permanent colour just yet, but if you’d like your hair to be a bit lighter we think you might like the Light Brown (5.0).';

            expect(actual).to.equal(expected);
        });

        it('should return a reason for a product recommendation for no/few greys and wants to go a bit darker in colour', () => {
            const result = {
                colourAmbition: 'A bit darker',
                currentColourShade: 'Light Brown (Shade 5.0)',
                hairColourType: 'All-over colour',
                greyAmount: 'Very few (less than 10%)'
            };
            const finalColourDetails = {
                currentShadeIndex: 3,
                regrowthShadeIndex: 3,
                shadeIndex: 3
            };
            const products = [
                {
                    title: 'Permanent Colour 5.0 - Light Brown',
                    key: 'permanent-colour-5-0-light-brown'
                }
            ];
            const actual = getPermanentReason(result, finalColourDetails, products);
            const expected =
                'With very few greys you don’t need to worry about permanent colour just yet, but if you’d like your hair to be a bit darker we think you might like the Light Brown (5.0).';

            expect(actual).to.equal(expected);
        });

        it('should return a reason for a product recommendation for no/few greys and wants to go a lot darker in colour', () => {
            const result = {
                colourAmbition: 'A lot darker',
                currentColourShade: 'Light Brown (Shade 5.0)',
                hairColourType: 'All-over colour',
                greyAmount: 'None (0%)'
            };
            const finalColourDetails = {
                currentShadeIndex: 3,
                regrowthShadeIndex: 3,
                shadeIndex: 3
            };
            const products = [
                {
                    title: 'Permanent Colour 5.0 - Light Brown',
                    key: 'permanent-colour-5-0-light-brown'
                }
            ];
            const actual = getPermanentReason(result, finalColourDetails, products);
            const expected =
                'With no greys you don’t need to worry about permanent colour just yet, but if you’d like your hair to be a lot darker we think you might like the Light Brown (5.0). If you’d like to go for something even darker, we’d always recommend visiting a salon.';

            expect(actual).to.equal(expected);
        });

        it('should return a reason for a product recommendation for some, most or all greys and not sure what colour direction to go in', () => {
            const result = {
                colourAmbition: 'Not sure',
                currentColourShade: 'Light Brown (Shade 5.0)',
                hairColourType: 'All-over colour',
                greyAmount: 'Some (10-50%)'
            };
            const finalColourDetails = {
                currentShadeIndex: 3,
                regrowthShadeIndex: 3,
                shadeIndex: 3
            };
            const products = [
                {
                    title: 'Permanent Colour 5.0 - Light Brown',
                    key: 'permanent-colour-5-0-light-brown'
                }
            ];
            const actual = getPermanentReason(result, finalColourDetails, products);
            const expected =
                'If you’re not sure which colour to choose for your hair we think you might like the Light Brown (5.0).';

            expect(actual).to.equal(expected);
        });

        it('should return a reason for a product recommendation for some, most or all greys and wants to stay the same colour', () => {
            const result = {
                colourAmbition: 'Stay the same',
                currentColourShade: 'Light Brown (Shade 5.0)',
                hairColourType: 'All-over colour',
                greyAmount: 'Some (10-50%)'
            };
            const finalColourDetails = {
                currentShadeIndex: 3,
                regrowthShadeIndex: 3,
                shadeIndex: 3
            };
            const products = [
                {
                    title: 'Permanent Colour 5.0 - Light Brown',
                    key: 'permanent-colour-5-0-light-brown'
                }
            ];
            const actual = getPermanentReason(result, finalColourDetails, products);
            const expected =
                'We think you might like the Light Brown (5.0) to cover your regrowth.';

            expect(actual).to.equal(expected);
        });

        it('should return a reason for a product recommendation for some, most or all greys and wants to go a bit lighter', () => {
            const result = {
                colourAmbition: 'A bit lighter',
                currentColourShade: 'Light Brown (Shade 5.0)',
                hairColourType: 'All-over colour',
                greyAmount: 'Some (10-50%)'
            };
            const finalColourDetails = {
                currentShadeIndex: 3,
                regrowthShadeIndex: 3,
                shadeIndex: 3
            };
            const products = [
                {
                    title: 'Permanent Colour 5.0 - Light Brown',
                    key: 'permanent-colour-5-0-light-brown'
                }
            ];
            const actual = getPermanentReason(result, finalColourDetails, products);
            const expected =
                'If you’d like your hair to be a bit lighter take a look at the Light Brown (5.0).';

            expect(actual).to.equal(expected);
        });

        it('should return a reason for a product recommendation for some, most or all greys and wants to go a bit darker', () => {
            const result = {
                colourAmbition: 'A bit darker',
                currentColourShade: 'Light Brown (Shade 5.0)',
                hairColourType: 'All-over colour',
                greyAmount: 'Most (50-80%)'
            };
            const finalColourDetails = {
                currentShadeIndex: 3,
                regrowthShadeIndex: 3,
                shadeIndex: 3
            };
            const products = [
                {
                    title: 'Permanent Colour 5.0 - Light Brown',
                    key: 'permanent-colour-5-0-light-brown'
                }
            ];
            const actual = getPermanentReason(result, finalColourDetails, products);
            const expected =
                'If you’d like your hair to be a bit darker take a look at the Light Brown (5.0).';

            expect(actual).to.equal(expected);
        });

        it('should return a reason for a product recommendation for some, most or all greys and wants to go a lot darker', () => {
            const result = {
                colourAmbition: 'A lot darker',
                currentColourShade: 'Light Brown (Shade 5.0)',
                hairColourType: 'All-over colour',
                greyAmount: 'All (80-100%)'
            };
            const finalColourDetails = {
                currentShadeIndex: 3,
                regrowthShadeIndex: 3,
                shadeIndex: 3
            };
            const products = [
                {
                    title: 'Permanent Colour 5.0 - Light Brown',
                    key: 'permanent-colour-5-0-light-brown'
                }
            ];
            const actual = getPermanentReason(result, finalColourDetails, products);
            const expected =
                'If you’d like your hair to be a lot darker take a look at the Light Brown (5.0). If you’d like to go for something even darker, we’d always recommend visiting a salon.';

            expect(actual).to.equal(expected);
        });
    });

    describe('Concealer product recommendations:', () => {
        describe('by hair colour type or current hair colour:', () => {
            it('returns no products if hair colour type is "Henna"', () => {
                const result = {
                    hairColourType: 'Henna',
                    greyAmount: 'Very few (less than 10%)'
                };
                const actual = size(getConcealerRecommendation(result));
                const expected = 0;

                expect(actual).to.equal(expected);
            });

            it('returns no products if hair colour type is "Bleached"', () => {
                const result = {
                    hairColourType: 'Bleached',
                    greyAmount: 'Very few (less than 10%)'
                };
                const actual = size(getConcealerRecommendation(result));
                const expected = 0;

                expect(actual).to.equal(expected);
            });

            it('returns no Root Smudger products if hair colour type is not "Balayage"', () => {
                const results = [
                    {hairColourType: 'All-over colour'},
                    {hairColourType: 'Bleached'},
                    {hairColourType: 'Henna'},
                    {hairColourType: 'Highlights'},
                    {hairColourType: 'None, my colour is natural'}
                ];

                results.map(result => {
                    const actual = eq(
                        size(
                            filter(getCareRecommendation(result), p =>
                                p.key.includes('root-smudger')
                            )
                        ),
                        0
                    );
                    const expected = true;

                    expect(actual).to.equal(expected);
                });
            });

            it('returns no Root Smudger products if hair colour is "Light blonde"', () => {
                const results = [
                    {
                        currentColourShade: 'Light blonde (Shade 8.0)',
                        hairColourType: 'Balayage'
                    },
                    {
                        currentColourShade: 'Light blonde (Shade 9.0)',
                        hairColourType: 'Balayage'
                    }
                ];

                results.map(result => {
                    const actual = eq(
                        size(
                            filter(getConcealerRecommendation(result), p =>
                                p.key.includes('root-smudger')
                            )
                        ),
                        0
                    );
                    const expected = true;

                    expect(actual).to.equal(expected);
                });
            });

            it('returns no Root Marker products if hair colour type is not "Balayage"', () => {
                const results = [
                    {hairColourType: 'All-over colour'},
                    {hairColourType: 'Bleached'},
                    {hairColourType: 'Henna'},
                    {hairColourType: 'Highlights'},
                    {hairColourType: 'None, my colour is natural'}
                ];

                results.map(result => {
                    const actual = eq(
                        size(
                            filter(getCareRecommendation(result), p =>
                                p.key.includes('root-marker')
                            )
                        ),
                        0
                    );
                    const expected = true;

                    expect(actual).to.equal(expected);
                });
            });

            // it('returns no Root Marker products if hair colour is "Light brown"', () => {
            //     const results = [
            //         {
            //             currentColourShade: 'Light brown (Shade 8)',
            //             hairColourType: 'Balayage'
            //         },
            //         {
            //             currentColourShade: 'Light brown (Shade 9)',
            //             hairColourType: 'Balayage'
            //         }
            //     ];

            //     results.map(result => {
            //         const actual = eq(size(filter(
            //             getConcealerRecommendation(result),
            //             p => p.key.includes('root-marker')
            //         )), 0);
            //         const expected = true;

            //         expect(actual).to.equal(expected);
            //     });
            // });

            it('returns no Blending Brush products if hair colour type is not "Balayage"', () => {
                const results = [
                    {hairColourType: 'All-over colour'},
                    {hairColourType: 'Bleached'},
                    {hairColourType: 'Henna'},
                    {hairColourType: 'Highlights'},
                    {hairColourType: 'None, my colour is natural'}
                ];

                results.map(result => {
                    const actual = eq(
                        size(
                            filter(getCareRecommendation(result), p =>
                                p.key.includes('blending-brush')
                            )
                        ),
                        0
                    );
                    const expected = true;

                    expect(actual).to.equal(expected);
                });
            });

            it('returns no Blending Brush products if hair colour is "Light blonde"', () => {
                const results = [
                    {
                        currentColourShade: 'Light blonde (Shade 8.0)',
                        hairColourType: 'Balayage'
                    },
                    {
                        currentColourShade: 'Light blonde (Shade 9.0)',
                        hairColourType: 'Balayage'
                    }
                ];

                results.map(result => {
                    const actual = eq(
                        size(
                            filter(getConcealerRecommendation(result), p =>
                                p.key.includes('blending-brush')
                            )
                        ),
                        0
                    );
                    const expected = true;

                    expect(actual).to.equal(expected);
                });
            });

            it('returns the correct coloured Tinted Dry Shampoo product if hair colour type is "Highlights", "All-over colour" or "Balayage"', () => {
                const results = [
                    {
                        currentColourShade: 'Dark brown (Shade 4.0)',
                        hairColourType: 'All-over colour',
                        expectedKey: 'darker-brown-tinted-dry-shampoo'
                    },
                    {
                        currentColourShade: 'Dark brown (Shade 2.0)',
                        hairColourType: 'Highlights',
                        expectedKey: 'darker-brown-tinted-dry-shampoo'
                    },
                    {
                        currentColourShade: 'Light brown (Shade 5.5)',
                        hairColourType: 'Balayage',
                        expectedKey: 'lighter-brown-tinted-dry-shampoo'
                    },
                    {
                        currentColourShade: 'Light blonde (Shade 8.0)',
                        hairColourType: 'Balayage',
                        expectedKey: 'lighter-blonde-tinted-dry-shampoo'
                    }
                ];

                results.map(result => {
                    const actual = eq(
                        size(
                            filter(getConcealerRecommendation(result), p =>
                                eq(p.key, result.expectedKey)
                            )
                        ),
                        1
                    );
                    const expected = true;

                    expect(actual).to.equal(expected);
                });
            });

            it('returns no Tinted Dry Shampoo products if hair colour is "Dark blonde"', () => {
                const results = [
                    {
                        currentColourShade: 'Dark blonde (Shade 6.5)',
                        hairColourType: 'Highlights'
                    },
                    {
                        currentColourShade: 'Light blonde (Shade 9.0)',
                        hairColourType: 'Highlights'
                    }
                ];

                results.map(result => {
                    const actual = eq(
                        size(
                            filter(getConcealerRecommendation(result), p =>
                                eq(p.key, result.expectedKey)
                            )
                        ),
                        0
                    );
                    const expected = true;

                    expect(actual).to.equal(expected);
                });
            });
        });

        describe('by grey hair amount:', () => {
            it('returns no products for "None (0%)" grey hair', () => {
                const result = {greyAmount: 'None (0%)'};
                const actual = size(getConcealerRecommendation(result));
                const expected = 0;

                expect(actual).to.equal(expected);
            });

            it('it returns Root Smudger or Blending Brush products for "Very few (less than 10%)" grey hair', () => {
                const result = {
                    currentColourShade: 'Dark brown',
                    hairColourType: 'All-over colour',
                    greyAmount: 'Very few (less than 10%)'
                };
                const actual = eq(
                    size(
                        filter(
                            getConcealerRecommendation(result),
                            p => p.key.includes('blending-brush') || p.key.includes('root-smudger')
                        )
                    ),
                    0
                );
                const expected = false;

                expect(actual).to.equal(expected);
            });

            it('returns Root Marker product for "Very few (less than 10%)" grey hair', () => {
                const result = {
                    currentColourShade: 'Dark brown (Shade 3.0)',
                    hairColourType: 'All-over colour',
                    greyAmount: 'Very few (less than 10%)'
                };
                const actual = eq(
                    size(
                        filter(getConcealerRecommendation(result), p =>
                            p.key.includes('root-marker')
                        )
                    ),
                    1
                );
                const expected = true;

                expect(actual).to.equal(expected);
            });

            it('returns all products for "Most (50-80%)" and "All (80-100%)" grey hair', () => {
                const results = [
                    {
                        currentColourShade: 'Dark brown',
                        hairColourType: 'All-over colour',
                        greyAmount: 'Most (50-80%)'
                    },
                    {
                        currentColourShade: 'Dark brown',
                        hairColourType: 'All-over colour',
                        greyAmount: 'All (80-100%)'
                    }
                ];

                results.map(result => {
                    const expectedProducts = [
                        'root-smudger',
                        'root-marker',
                        'tinted-dry-shampoo',
                        'blending-brush'
                    ];

                    expectedProducts.map(expectedProduct => {
                        const actual = eq(
                            size(
                                filter(getConcealerRecommendation(result), p =>
                                    p.key.includes(expectedProduct)
                                )
                            ),
                            1
                        );
                        const expected = true;

                        expect(actual).to.equal(expected);
                    });
                });
            });

            it('returns only Tinted Dry Shampoo if the new colour is more than 4 shades darker than the current colour', () => {
                const result = {
                    colourAmbition: 'A bit lighter',
                    currentColourShade: 'Light blonde (Shade 8.0)',
                    hairColourType: 'All-over colour',
                    regrowthColourShade: 'Dark brown (Shade 3.0)',
                    greyAmount: 'Some (10-50%)'
                };

                setFinalColourDetails(
                    result.currentColourShade,
                    result.colourAmbition,
                    result.regrowthColourShade
                );

                const actual = getConcealerRecommendation(result).map(p => p.key);
                const expected = ['lighter-blonde-tinted-dry-shampoo'];

                expect(actual).to.have.members(expected);
            });
        });
    });

    describe('Concealer product reasons:', () => {
        it('should return a reason for product recommendations if there is no greys', () => {
            const results = {greyAmount: 'None (0%)'};
            const colourDetails = {colour: 'brown'};
            const products = [
                {
                    title: 'Lighter Brown Tinted Dry Shampoo',
                    key: 'lighter-brown-tinted-dry-shampoo'
                }
            ];
            const actual = getConcealerReason(results, colourDetails, products).includes(
                'If you want to revive your roots in-between your permanent colour, give the Lighter Brown Tinted Dry Shampoo a go for quick and easy coverage and volume.'
            );
            const expected = true;

            expect(actual).to.equal(expected);
        });

        it('should return a reason for product recommendations if there is very few greys', () => {
            const results = {greyAmount: 'Very few (less than 10%)'};
            const colourDetails = {colour: 'brown'};
            const products = [
                {
                    title: 'Darker Brown Tinted Dry Shampoo',
                    key: 'darker-brown-tinted-dry-shampoo'
                },
                {
                    title: 'Darker Brown Root Marker',
                    key: 'darker-brown-root-marker'
                }
            ];
            const actual = getConcealerReason(results, colourDetails, products).includes(
                'Cover stray greys on the go with the Darker Brown Root Marker. You can also try the Darker Brown Tinted Dry Shampoo to add volume and revive your roots in-between your permanent colour.'
            );
            const expected = true;

            expect(actual).to.equal(expected);
        });

        it('should return a reason for product recommendations if there is some greys', () => {
            const results = {greyAmount: 'Some (10-50%)'};
            const colourDetails = {colour: 'brown'};
            const products = [
                {
                    title: 'Darker Brown Blending Brush',
                    key: 'darker-brown-blending-brush'
                },
                {
                    title: 'Darker Brown Tinted Dry Shampoo',
                    key: 'darker-brown-tinted-dry-shampoo'
                },
                {
                    title: 'Darker Brown Root Marker',
                    key: 'darker-brown-root-marker'
                }
            ];
            const actual = getConcealerReason(results, colourDetails, products).includes(
                'Blend in your grey regrowth for up to three shampoos with the Darker Brown Blending Brush. Get quick and easy coverage and revive your roots with the Darker Brown Tinted Dry Shampoo. Cover stray greys on the go with the Darker Brown Root Marker.'
            );
            const expected = true;

            expect(actual).to.equal(expected);
        });

        it('should return a reason for product recommendations if there is mostly all greys', () => {
            const results = {greyAmount: 'Some (50-80%)'};
            const colourDetails = {colour: 'brown'};
            const products = [
                {
                    title: 'Darker Brown Blending Brush',
                    key: 'darker-brown-blending-brush'
                },
                {
                    title: 'Darker Brown Tinted Dry Shampoo',
                    key: 'darker-brown-tinted-dry-shampoo'
                },
                {
                    title: 'Darker Brown Root Marker',
                    key: 'darker-brown-root-marker'
                }
            ];
            const actual = getConcealerReason(results, colourDetails, products).includes(
                'Blend in your grey regrowth for up to three shampoos with the Darker Brown Blending Brush. Get quick and easy coverage and revive your roots with the Darker Brown Tinted Dry Shampoo. Cover stray greys on the go with the Darker Brown Root Marker.'
            );
            const expected = true;

            expect(actual).to.equal(expected);
        });

        it('should return a reason for product recommendations if the regrowth colour is much darker than the current hair colour', () => {
            const results = {greyAmount: 'All (80-100%)'};
            const colourDetails = {
                colour: 'brown',
                regrowthShadeIndex: 2,
                currentShadeIndex: 8
            };
            const products = [
                {
                    title: 'Darker Brown Tinted Dry Shampoo',
                    key: 'darker-brown-tinted-dry-shampoo'
                }
            ];
            const actual = getConcealerReason(results, colourDetails, products).includes(
                'If you want to revive your roots in-between your permanent colour, give the Darker Brown Tinted Dry Shampoo a go for quick and easy coverage and volume.'
            );
            const expected = true;

            expect(actual).to.equal(expected);
        });
    });

    describe('Care product recommendations:', () => {
        // Commented out until new shade shot products are available
        //
        //     it('returns Chestnut Brunette Shade Shot Plus if colour is Light brown and tone ambition is Rich, warm and chocolatey', () => {
        //         const result = {
        //             currentColour: 'Light brown',
        //             toneAmbition: 'Rich, warm and chocolatey'
        //         };
        //         const actual = get(head(getCareRecommendation(result)), 'key');
        //         const expected = 'chestnut-brunette-shade-shot-plus';

        //         expect(actual).to.equal(expected);
        //     });

        //     it('returns Smoky Brunette Shade Shot Plus if colour is Dark brown and tone ambition is Ashy, cool and smoky', () => {
        //         const result = {
        //             currentColour: 'Dark brown',
        //             toneAmbition: 'Ashy, cool and smoky'
        //         };
        //         const actual = get(head(getCareRecommendation(result)), 'key');
        //         const expected = 'smoky-brunette-shade-shot-plus';

        //         expect(actual).to.equal(expected);
        //     });

        //     it('returns Champagne Shade Shot Plus if colour is Light blonde and tone ambition is Soft and sun-kissed', () => {
        //         const result = {
        //             currentColour: 'Light blonde',
        //             toneAmbition: 'Soft and sun-kissed'
        //         };
        //         const actual = get(head(getCareRecommendation(result)), 'key');
        //         const expected = 'champagne-blonde-shade-shot-plus';

        //         expect(actual).to.equal(expected);
        //     });

        //     it('returns Icy Blonde Shade Shot Plus if colour is Light blonde and tone ambition is Cool, ashy and icy', () => {
        //         const result = {
        //             currentColour: 'Dark blonde',
        //             toneAmbition: 'Cool, ashy and icy'
        //         };
        //         const actual = get(head(getCareRecommendation(result)), 'key');
        //         const expected = 'icy-blonde-shade-shot-plus';

        //         expect(actual).to.equal(expected);
        //     });

        it('returns the correct Shampoo for all "Blonde" hair with "Smooth my hair and keep it under control" care ambition', () => {
            const results = [
                {
                    currentColour: 'Light blonde',
                    careAmbition: 'Smooth my hair and keep it under control'
                },
                {
                    currentColour: 'Dark blonde',
                    careAmbition: 'Smooth my hair and keep it under control'
                }
            ];

            results.map(result => {
                const actual = gte(
                    size(
                        filter(getCareRecommendation(result), p =>
                            eq(p.key, 'frizzy-blonde-shampoo')
                        )
                    ),
                    1
                );
                const expected = true;

                expect(actual).to.equal(expected);
            });
        });

        it('returns the correct Shampoo for all "Blonde" hair with "Add some volume and lock in moisture" care ambition', () => {
            const results = [
                {
                    currentColour: 'Light blonde',
                    careAmbition: 'Add some volume and lock in moisture'
                },
                {
                    currentColour: 'Dark blonde',
                    careAmbition: 'Add some volume and lock in moisture'
                }
            ];

            results.map(result => {
                const actual = gte(
                    size(
                        filter(getCareRecommendation(result), p => eq(p.key, 'fine-blonde-shampoo'))
                    ),
                    1
                );
                const expected = true;

                expect(actual).to.equal(expected);
            });
        });

        it('returns the correct Conditioner for all "Blonde" hair with "Smooth my hair and keep it under control" care ambition', () => {
            const results = [
                {
                    currentColour: 'Light blonde',
                    careAmbition: 'Smooth my hair and keep it under control'
                },
                {
                    currentColour: 'Dark blonde',
                    careAmbition: 'Smooth my hair and keep it under control'
                }
            ];

            results.map(result => {
                const actual = gte(
                    size(
                        filter(getCareRecommendation(result), p =>
                            eq(p.key, 'frizzy-blonde-conditioner')
                        )
                    ),
                    1
                );
                const expected = true;

                expect(actual).to.equal(expected);
            });
        });

        it('returns the correct Conditioner for all "Blonde" hair with "Add some volume and lock in moisture" care ambition', () => {
            const results = [
                {
                    currentColour: 'Light blonde',
                    careAmbition: 'Add some volume and lock in moisture'
                },
                {
                    currentColour: 'Dark blonde',
                    careAmbition: 'Add some volume and lock in moisture'
                }
            ];

            results.map(result => {
                const actual = gte(
                    size(
                        filter(getCareRecommendation(result), p =>
                            eq(p.key, 'fine-blonde-conditioner')
                        )
                    ),
                    1
                );
                const expected = true;

                expect(actual).to.equal(expected);
            });
        });

        it('returns the correct Shampoo for all "Brown" hair with "Smooth my hair and keep it under control" care ambition', () => {
            const results = [
                {
                    currentColour: 'Light brown',
                    careAmbition: 'Smooth my hair and keep it under control'
                },
                {
                    currentColour: 'Dark brown',
                    careAmbition: 'Smooth my hair and keep it under control'
                }
            ];

            results.map(result => {
                const actual = gte(
                    size(
                        filter(getCareRecommendation(result), p =>
                            eq(p.key, 'frizzy-brunette-shampoo')
                        )
                    ),
                    1
                );
                const expected = true;

                expect(actual).to.equal(expected);
            });
        });

        it('returns the correct Shampoo for all "Brown" hair with "Add some volume and lock in moisture" care ambition', () => {
            const results = [
                {
                    currentColour: 'Light brown',
                    careAmbition: 'Add some volume and lock in moisture'
                },
                {
                    currentColour: 'Dark brown',
                    careAmbition: 'Add some volume and lock in moisture'
                }
            ];
            results.map(result => {
                const actual = gte(
                    size(
                        filter(getCareRecommendation(result), p =>
                            eq(p.key, 'fine-brunette-shampoo')
                        )
                    ),
                    1
                );
                const expected = true;

                expect(actual).to.equal(expected);
            });
        });

        it('returns the correct Conditioner for all "Brown" hair with "Smooth my hair and keep it under control" care ambition', () => {
            const results = [
                {
                    currentColour: 'Light brown',
                    careAmbition: 'Smooth my hair and keep it under control'
                },
                {
                    currentColour: 'Dark brown',
                    careAmbition: 'Smooth my hair and keep it under control'
                }
            ];

            results.map(result => {
                const actual = gte(
                    size(
                        filter(getCareRecommendation(result), p =>
                            eq(p.key, 'frizzy-brunette-conditioner')
                        )
                    ),
                    1
                );
                const expected = true;

                expect(actual).to.equal(expected);
            });
        });

        it('returns the correct Conditioner for all "Brown" hair with "Add some volume and lock in moisture" care ambition', () => {
            const results = [
                {
                    currentColour: 'Light brown',
                    careAmbition: 'Add some volume and lock in moisture'
                },
                {
                    currentColour: 'Dark brown',
                    careAmbition: 'Add some volume and lock in moisture'
                }
            ];

            results.map(result => {
                const actual = gte(
                    size(
                        filter(getCareRecommendation(result), p =>
                            eq(p.key, 'fine-brunette-conditioner')
                        )
                    ),
                    1
                );
                const expected = true;

                expect(actual).to.equal(expected);
            });
        });

        it('returns Everything Mask regardless of answers', () => {
            const results = [
                {},
                {currentColour: 'Dark brown'},
                {hairColourType: 'Henna', greyAmount: 'None'},
                {hairTexture: 'Fine'},
                {hairTexture: 'Fine', currentColour: 'Red'}
            ];

            results.map(result => {
                const actual = eq(
                    size(filter(getCareRecommendation(result), p => eq(p.key, 'everything-mask'))),
                    1
                );
                const expected = true;

                expect(actual).to.equal(expected);
            });
        });
    });

    describe('Care product reasons:', () => {
        it('should return a reason for fine or flat hair tailored to the hair colour', () => {
            const results = {hairTexture: 'Fine'};
            const colourDetails = {colour: 'blonde'};
            const products = [];
            const actual = getCareReason(results, colourDetails, products).includes(
                'Our blonde care range is designed to maintain your colour, add volume and nourish your hair.'
            );
            const expected = true;

            expect(actual).to.equal(expected);
        });

        it('should return a reason for recommending a Shade Shot for unwanted tones ', () => {
            const results = {
                hairTexture: 'Fine',
                unwantedTone: 'Orange/red'
            };
            const colourDetails = {color: 'blonde'};
            const products = [
                {
                    title: 'Give Me Sun Shade Shot',
                    key: 'give-me-sun-shade-shot'
                }
            ];
            const actual = getCareReason(results, colourDetails, products).includes(
                'Use the Everything Mask as a weekly treatment to lock-in colour, boost shine and deep-condition your hair. You can also mix our Give Me Sun Shade Shot with the Everything Mask to create a shade-refreshing gloss that’ll counteract any orange/red tones.'
            );
            const expected = true;

            expect(actual).to.equal(expected);
        });

        it('should return a generic reason if there is no unwanted tones', () => {
            const results = {unwantedTone: 'None'};
            const colourDetails = {};
            const products = [];
            const actual = getCareReason(results, colourDetails, products).includes(
                'Use the Everything Mask as a weekly treatment to lock-in colour, boost shine and deep-condition your hair.'
            );
            const expected = true;

            expect(actual).to.equal(expected);
        });
    });

    describe('Example answers:', () => {
        /*
        * Will be adding more sets at a later time 
        */
        describe('Set 1 (Light Blonde, very few greys, natural colour, staying the same colour)', () => {
            it('returns the correct results', () => {
                const answers = [
                    {questionId: 2, value: 'None, my colour is natural'},
                    {questionId: 3, value: 'Very few (less than 10%)'},
                    {questionId: 4, value: ''},
                    {questionId: 5, value: 'Dark Blonde'},
                    {questionId: 6, value: 'Dark blonde (Shade 7.0)'},
                    {questionId: 7, value: 'They match'},
                    {questionId: 8, value: 'Stay the same'},
                    {questionId: 9, value: 'Cool, ashy and icy'},
                    {questionId: 10, value: 'Smooth my hair and keep it under control'},
                    {questionId: 11, value: ''},
                    {questionId: 12, value: ''},
                    {questionId: 13, value: ''}
                ];
                const results = consultationResults(answers);
                const actualPermanent = results.permanent.products.map(p => p.key);
                const actualConcealer = results.concealer.products.map(p => p.key);
                const actualCare = results.care.products.map(p => p.key);
                const expectedPermanent = ['permanent-colour-7-0-deep-mid-blonde'];
                const expectedConcealer = [
                    'darker-blonde-blending-brush',
                    'darker-blonde-root-smudger',
                    'darker-blonde-root-marker'
                ];
                const expectedCare = [
                    'frizzy-blonde-shampoo',
                    'frizzy-blonde-conditioner',
                    'shade-shot-plus-icy-blonde',
                    'everything-mask'
                ];
                expect(actualPermanent).to.have.members(expectedPermanent);
                expect(actualConcealer).to.have.members(expectedConcealer);
                expect(actualCare).to.have.members(expectedCare);
            });
        });
    });
});
