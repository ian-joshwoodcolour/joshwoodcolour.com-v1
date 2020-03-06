/**
 * @prettier
 * @flow
 */
import eq from 'lodash/eq';
import find from 'lodash/find';
import includes from 'lodash/includes';
import lowerCase from 'lodash/lowerCase';
import map from 'lodash/map';
import {getShadeFromProductName} from '../services/helpers';

export const permanentReasons = {
    highlights(): string {
        return 'Our permanent colours are designed to provide an all-over tint, so we’d always recommend visiting a salon for highlights.';
    },
    bleached(): string {
        return 'We do not have any permanent colours suitable for bleached hair.';
    },
    balayage(): string {
        return "Our hair colour provides an all over tint and we'd always recommend going to a salon for balayage.";
    },
    unsuitableColour(): string {
        return 'We do not have any colours which provide lift, so we’d always recommend visiting a salon when your regrowth is significantly darker than the lengths of your hair.';
    },
    lowGreysAndNotSure(greysType: string, productColour: string, productShade: string): string {
        return `With ${greysType} you don’t need to worry about permanent colour just yet, but if you’d like to change the shade of your hair we think you might like the ${productColour} (${productShade}).`;
    },
    lowGreysAndStayTheSameNatural(
        greysType: string,
        productColour: string,
        productShade: string
    ): string {
        return `With ${greysType} you don’t need to worry about permanent colour just yet, but if you decide you’d like to change the shade of your natural hair later down the line we think you might like the ${productColour} (${productShade}).`;
    },
    lowGreysAndStayTheSameNotNatural(
        greysType: string,
        productColour: string,
        productShade: string
    ): string {
        return `With ${greysType} you don’t need to worry about permanent colour just yet, but if you’d like to maintain the shade of your hair we think you might like the ${productColour} (${productShade}).`;
    },
    lowGreysAndABitLighter(greysType: string, productColour: string, productShade: string): string {
        return `With ${greysType} you don’t need to worry about permanent colour just yet, but if you’d like your hair to be a bit lighter we think you might like the ${productColour} (${productShade}).`;
    },
    lowGreysAndABitDarker(greysType: string, productColour: string, productShade: string): string {
        return `With ${greysType} you don’t need to worry about permanent colour just yet, but if you’d like your hair to be a bit darker we think you might like the ${productColour} (${productShade}).`;
    },
    lowGreysAndALotDarker(greysType: string, productColour: string, productShade: string): string {
        return `With ${greysType} you don’t need to worry about permanent colour just yet, but if you’d like your hair to be a lot darker we think you might like the ${productColour} (${productShade}). If you’d like to go for something even darker, we’d always recommend visiting a salon.`;
    },
    midHighGreysAndNotSure(productColour: string, productShade: string): string {
        return `If you’re not sure which colour to choose for your hair we think you might like the ${productColour} (${productShade}).`;
    },
    midHighGreysAndStayTheSame(productColour: string, productShade: string): string {
        return `We think you might like the ${productColour} (${productShade}) to cover your regrowth.`;
    },
    midHighGreysAndABitLighter(productColour: string, productShade: string): string {
        return `If you’d like your hair to be a bit lighter take a look at the ${productColour} (${productShade}).`;
    },
    midHighGreysAndABitDarker(productColour: string, productShade: string): string {
        return `If you’d like your hair to be a bit darker take a look at the ${productColour} (${productShade}).`;
    },
    midHighGreysAndALotDarker(productColour: string, productShade: string): string {
        return `If you’d like your hair to be a lot darker take a look at the ${productColour} (${productShade}). If you’d like to go for something even darker, we’d always recommend visiting a salon.`;
    }
};

const combineArrayToCommaSeparatedSentence = (values: Array<string>): string => {
    return values.reduce((previous, current, index) => {
        return eq(index, 0)
            ? current
            : `${previous}${eq(index, values.length - 1) ? ' and our' : ','} ${current}`;
    }, '');
};

export const concealerReasons = {
    regrowthTooDark(products: Array<*>): string {
        const tintedDryShampooProduct = find(products, p => p.key.includes('tinted-dry-shampoo'));

        if (tintedDryShampooProduct) {
            return `If you want to revive your roots in-between your permanent colour, give the ${
                tintedDryShampooProduct.title
            } a go for quick and easy coverage and volume.`;
        }

        return '';
    },
    noGreys(products: Array<*>): string {
        const tintedDryShampooProduct = find(products, p => p.key.includes('tinted-dry-shampoo'));

        if (tintedDryShampooProduct) {
            return `If you want to revive your roots in-between your permanent colour, give the ${
                tintedDryShampooProduct.title
            } a go for quick and easy coverage and volume.`;
        }

        return '';
    },
    fewGreys(products: Array<*>): string {
        const tintedDryShampooProduct = find(products, p => p.key.includes('tinted-dry-shampoo'));
        const rootMarkerProduct = find(products, p => p.key.includes('root-marker'));

        return [
            rootMarkerProduct
                ? `Cover stray greys on the go with the ${rootMarkerProduct.title}.`
                : '',
            tintedDryShampooProduct
                ? `You can also try the ${
                      tintedDryShampooProduct.title
                  } to add volume and revive your roots in-between your permanent colour.`
                : ''
        ].join(' ');
    },
    someMostAndAllGreys(products: Array<*>): string {
        const blendingBrushProduct = find(products, p => p.key.includes('blending-brush'));
        const rootMarkerProduct = find(products, p => p.key.includes('root-marker'));
        const rootSmudgerProduct = find(products, p => p.key.includes('root-smudger'));
        const tintedDryShampooProduct = find(products, p => p.key.includes('tinted-dry-shampoo'));

        return [
            rootSmudgerProduct
                ? `Use the ${
                      rootSmudgerProduct.title
                  } to fully cover heavy regrowth for up to three shampoos.`
                : '',
            blendingBrushProduct
                ? `Blend in your grey regrowth for up to three shampoos with the ${
                      blendingBrushProduct.title
                  }.`
                : '',
            tintedDryShampooProduct
                ? `Get quick and easy coverage and revive your roots with the ${
                      tintedDryShampooProduct.title
                  }.`
                : '',
            rootMarkerProduct
                ? `Cover stray greys on the go with the ${rootMarkerProduct.title}.`
                : ''
        ].join(' ');
    }
};

export const careReasons = {
    textureAndColour(texture: string, colour: string): string {
        return `Our ${colour} care range is designed to maintain your colour, add volume and nourish your hair.`;
    },
    shadeShot(productTitle: string, unwantedTone: string): string {
        return `You can also mix our ${productTitle} with the Everything Mask to create a shade-refreshing gloss that’ll counteract any ${unwantedTone} tones.`;
    },
    everythingMask(): string {
        return `Use the Everything Mask as a weekly treatment to lock-in colour, boost shine and deep-condition your hair.`;
    }
};
