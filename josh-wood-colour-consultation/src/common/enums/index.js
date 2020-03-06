import enumize from './enumize'
import { CDN } from '../paths'

export const CURRENT_COLOUR_TYPES = enumize({
  ALL_COLOUR: { id: 1, text: 'All over colour' },
  NONE: { id: 2, text: 'None, my colour is natural' },
  BLEACH: { id: 3, text: 'Bleach' },
  HIGHLIGHTS: { id: 4, text: 'Highlights, balayage' },
  NOT_SURE: { id: 5, text: `I'm not sure` },
})

export const ARROW_DIRECTIONS = enumize({
  LEFT: { id: 'left', icon: '<' },
  RIGHT: { id: 'right', icon: '>' },
})

export const SHADES = enumize({
  LB9: {
    id: 1,
    code: '9.0',
    name: 'Lightest Blonde',
    family: 'LIGHT_BLONDE',
    picture: `${CDN}/shades/Level 9.jpg`,
    swatch: `${CDN}/swatches/Swatch 9.0.png`,
    comparisonKey: '9',
  },
  LB85: {
    id: 2,
    code: '8.5',
    name: 'Light Blonde',
    family: 'LIGHT_BLONDE',
    picture: `${CDN}/shades/Level 8.5.jpg`,
    swatch: `${CDN}/swatches/Swatch 8.5.png`,
    comparisonKey: '8.5',
  },
  LB8: {
    id: 3,
    code: '8.0',
    name: 'Light Mid-Blonde',
    family: 'LIGHT_BLONDE',
    picture: `${CDN}/shades/Level 8.jpg`,
    swatch: `${CDN}/swatches/Swatch 8.0.png`,
    comparisonKey: '8',
  },
  DB75: {
    id: 4,
    code: '7.5',
    name: 'Mid Blonde',
    family: 'DARK_BLONDE',
    picture: `${CDN}/shades/Level 7.5.jpg`,
    swatch: `${CDN}/swatches/Swatch 7.5.png`,
    comparisonKey: '7.5',
  },
  DB7: {
    id: 5,
    code: '7.0',
    name: 'Deep Mid-Blonde',
    family: 'DARK_BLONDE',
    picture: `${CDN}/shades/Level 7.jpg`,
    swatch: `${CDN}/swatches/Swatch 7.0.png`,
    comparisonKey: '7',
  },
  DB65: {
    id: 6,
    code: '6.5',
    name: 'Deep Darkest Blonde',
    family: 'DARK_BLONDE',
    picture: `${CDN}/shades/Level 6.5.jpg`,
    swatch: `${CDN}/swatches/Swatch 6.5.png`,
    comparisonKey: '6.5',
  },
  LB6: {
    id: 7,
    code: '6.0',
    name: 'Palest Brown',
    family: 'LIGHT_BROWN',
    picture: `${CDN}/shades/Level 6.jpg`,
    swatch: `${CDN}/swatches/Swatch 6.0.png`,
    comparisonKey: '6',
  },
  LB55: {
    id: 8,
    code: '5.5',
    name: 'Deep Mid-Brown',
    family: 'LIGHT_BROWN',
    picture: `${CDN}/shades/Level 5.5.jpg`,
    swatch: `${CDN}/swatches/Swatch 5.5.png`,
    comparisonKey: '5.5',
  },
  LB5: {
    id: 9,
    code: '5.0',
    name: 'Dark Mid-Brown',
    family: 'LIGHT_BROWN',
    picture: `${CDN}/shades/Level 5.jpg`,
    swatch: `${CDN}/swatches/Swatch 5.0.png`,
    comparisonKey: '5',
  },
  DB4: {
    id: 10,
    code: '4.0',
    name: 'Deep Dark Brown',
    family: 'DARK_BROWN',
    picture: `${CDN}/shades/Level 4.jpg`,
    swatch: `${CDN}/swatches/Swatch 4.0.png`,
    comparisonKey: '4',
  },
  DB3: {
    id: 11,
    code: '3.0',
    name: 'Darkest Brown',
    family: 'DARK_BROWN',
    picture: `${CDN}/shades/Level 3.jpg`,
    swatch: `${CDN}/swatches/Swatch 3.0.png`,
  },
  DB2: {
    id: 12,
    code: '2.0',
    name: 'Natural Black',
    family: 'DARK_BROWN',
    picture: `${CDN}/shades/Level 2.jpg`,
    swatch: `${CDN}/swatches/Swatch 2.0.png`,
  },
})

export const COLOUR_FAMILIES = enumize({
  LIGHT_BLONDE: {
    id: 1,
    name: 'Light Blonde',
    picture: `${CDN}/swatches/Swatch 8.5.png`,
  },
  DARK_BLONDE: {
    id: 2,
    name: 'Dark Blonde',
    picture: `${CDN}/swatches/Swatch 7.5.png`,
  },
  LIGHT_BROWN: {
    id: 3,
    name: 'Light Brown',
    picture: `${CDN}/swatches/Swatch 5.5.png`,
  },
  DARK_BROWN: {
    id: 4,
    name: 'Dark Brown',
    picture: `${CDN}/swatches/Swatch 3.0.png`,
  },
  RED: { id: 5, name: 'Red', picture: `${CDN}/swatches/red-swatch.png` },
  BLACK: { id: 6, name: 'Black', picture: `${CDN}/swatches/black-swatch.png` },
  OTHER: { id: 7, name: 'Other', picture: `${CDN}/swatches/other-swatch.png` },
})

export const GRAYS_LEVELS = enumize({
  NONE: {
    id: 0,
    label: 'None',
    percentage: '',
    picture: `${CDN}/grays/none.jpg`,
  },
  FEW: {
    id: 1,
    label: 'Very few',
    percentage: 'less than 10%',
    picture: `${CDN}/grays/few.jpg`,
  },
  SOME: {
    id: 2,
    label: 'Some',
    percentage: '10% - 40%',
    picture: `${CDN}/grays/some.jpg`,
  },
  MOST: {
    id: 3,
    label: 'Most',
    percentage: '40% - 80%',
    picture: `${CDN}/grays/most.jpg`,
  },
  ALL: {
    id: 4,
    label: 'Almost all/All',
    percentage: '80% - 100%',
    picture: `${CDN}/grays/all.jpg`,
  },
})

export const SHADE_SHOTS = enumize({
  CHBL: {
    id: 1,
    name: 'Champagne Blonde',
    tag: 'champagne blonde',
    description:
      'The Shade Shot Plus Champagne Blonde adds a boost of colour to your chosen blonde shade for a soft, creamy, sun-kissed finish.      ',
    families: [COLOUR_FAMILIES.LIGHT_BLONDE.id, COLOUR_FAMILIES.DARK_BLONDE.id],
    picture: `${CDN}/shade-shot-products/JoshWood_ShadeShotPlus_Champagnea.jpg`,
    comparisonKey: 'CB_MINT',
  },
  IBL: {
    id: 2,
    name: 'Icy Blonde',
    tag: 'icy blonde',
    description:
      'The Shade Shot Icy Blonde adds a boost of colour to cool down your chosen blonde shade for an icy blonde without a hint of brassiness.',
    families: [COLOUR_FAMILIES.LIGHT_BLONDE.id, COLOUR_FAMILIES.DARK_BLONDE.id],
    picture: `${CDN}/shade-shot-products/JoshWood_ShadeShotPlus_ice.jpg`,
    comparisonKey: 'IB_PUTTY',
  },
  CHBR: {
    id: 3,
    name: 'Chestnut Brunette',
    tag: 'chestnut brunette',
    description:
      'The Shade Shot Plus Chestnut Brunette adds a boost of colour to warm up your chosen brunette shade for a rich, intense, chocolatey finish.      ',
    shades: [],
    families: [COLOUR_FAMILIES.LIGHT_BROWN.id, COLOUR_FAMILIES.DARK_BROWN.id],
    picture: `${CDN}/shade-shot-products/JoshWood_ShadeShotPlus_Chestnut.jpg`,
    comparisonKey: 'CB_BLUSH',
  },
  SBR: {
    id: 4,
    name: 'Smoky Brunette',
    tag: 'smoky brunette',
    description:
      'The Shade Shot Plus Smoky Brunette adds a boost of colour to cool down your chosen brunette shade and reduce unwanted red tones.',
    shades: [],
    families: [COLOUR_FAMILIES.LIGHT_BROWN.id, COLOUR_FAMILIES.DARK_BROWN.id],
    picture: `${CDN}/shade-shot-products/JoshWood_ShadeShotPlus_Smokey.jpg`,
    comparisonKey: 'SB_BLUE',
  },
})

export const HIGHLIGHTS = enumize({
  CHMP: {
    id: 1,
    name: 'Champagne blonde',
    tag: 'champagne blonde',
    picture: `${CDN}/highlights_chmp.jpg`,
  },
  ICY: {
    id: 2,
    name: 'Icy blonde',
    tag: 'icy blonde',
    picture: `${CDN}/highlights_icy.jpg`,
  },
})
