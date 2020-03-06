import React from "react";
import PropTypes from "prop-types";
import { Container } from "./styled";
import { Title } from "../../components";
import * as enums from "../../common/enums";
import { CDN } from "../../common/paths";
import { SHADES, COLOUR_FAMILIES, CURRENT_COLOUR_TYPES } from "../../common/enums";
import { SHADE_SHOTS } from "../../common/enums";
import Products from "./products";

import {
  Subtitle,
  ResultPhotos,
  ResultWrap,
  Content,
  Image,
  PreviewSection
} from "./styled";
import ProductsSection from "./ProductsSection";
import FeaturedProduct from "./FeaturedProduct";
import FeaturedProductCart from "./FeaturedProduct/ProductCart";
import VideoSection from "./VideoSection";
import { SectionWrap } from "./ProductsSection/styled";

const TAG_BLACK = "black";
const TAG_RED = "red";
const TAG_BLONDE = "blonde";
const TAG_BROWN = "brown";
const TAG_LIGHTER_BROWN = "lighter brown";
const TAG_LIGHTER_BLONDE = "lighter blonde";
const TAG_DARKER_BLONDE = "darker blonde";
const TAG_DARKER_BROWN = "darker brown";
const TAG_FRIZZY = "frizzy";
const TAG_FINE = "fine";
const TAG_GLOSS = "gloss";

const TYPE_PERMANENT = "Permanent Colour";
const TYPE_SSP = "Permanent Colour and Shade Shot Plus";
const TYPE_SHAMPOO = "Shampoo";
const TYPE_CONDITIONER = "Conditioner";
const TYPE_MARKER = "Root Marker";
const TYPE_SMUDGER = "Root Smudger";
const TYPE_DRY_SHAMPOO = "Tinted Dry Shampoo";
const TYPE_BRUSH = "Blending Brush";
const TYPE_EVERYTHING_MASK = "Everything Mask";

const QUERIES = {
  CARE_RANGE: {
    SHAMPOO_FRIZZY_BLONDE: `(product_type:${TYPE_SHAMPOO}) OR (product_type:${TYPE_CONDITIONER}) AND tag:${TAG_BLONDE} ${TAG_FRIZZY}`,
    SHAMPOO_FINE_BLONDE: `(product_type:${TYPE_SHAMPOO}) OR (product_type:${TYPE_CONDITIONER}) AND tag:${TAG_BLONDE} ${TAG_FINE}`,
    SHAMPOO_FRIZZY_BROWN: `(product_type:${TYPE_SHAMPOO}) OR (product_type:${TYPE_CONDITIONER}) AND tag:${TAG_BROWN} ${TAG_FRIZZY}`,
    SHAMPOO_FINE_BROWN: `(product_type:${TYPE_SHAMPOO}) OR (product_type:${TYPE_CONDITIONER}) AND tag:${TAG_BROWN} ${TAG_FINE}`
  },
  CONCEALERS: {
    CONCEALERS_FEW_LIGHTER_BROWN: `(product_type:${TYPE_DRY_SHAMPOO}) OR (product_type:${TYPE_MARKER}) AND (tag:${TAG_LIGHTER_BROWN})`,
    CONCEALERS_FEW_LIGHTER_BLONDE: `(product_type:${TYPE_DRY_SHAMPOO}) OR (product_type:${TYPE_MARKER}) AND (tag:${TAG_LIGHTER_BLONDE})`,
    CONCEALERS_FEW_DARKER_BLONDE: `(product_type:${TYPE_DRY_SHAMPOO}) OR (product_type:${TYPE_MARKER}) AND (tag:${TAG_DARKER_BLONDE})`,
    CONCEALERS_FEW_DARKER_BROWN: `(product_type:${TYPE_DRY_SHAMPOO}) OR (product_type:${TYPE_MARKER}) AND (tag:${TAG_DARKER_BROWN})`,
    CONCEALERS_MOST_LIGHTER_BROWN: `(product_type:${TYPE_SMUDGER}) OR (product_type:${TYPE_BRUSH}) OR (product_type:${TYPE_DRY_SHAMPOO}) OR (product_type:${TYPE_MARKER}) AND (tag:${TAG_LIGHTER_BROWN})`,
    CONCEALERS_MOST_LIGHTER_BLONDE: `(product_type:${TYPE_SMUDGER}) OR (product_type:${TYPE_BRUSH}) OR (product_type:${TYPE_DRY_SHAMPOO}) OR (product_type:${TYPE_MARKER}) AND (tag:${TAG_LIGHTER_BLONDE})`,
    CONCEALERS_MOST_DARKER_BLONDE: `(product_type:${TYPE_SMUDGER}) OR (product_type:${TYPE_BRUSH}) OR (product_type:${TYPE_DRY_SHAMPOO}) OR (product_type:${TYPE_MARKER}) AND (tag:${TAG_DARKER_BLONDE})`,
    CONCEALERS_MOST_DARKER_BROWN: `(product_type:${TYPE_SMUDGER}) OR (product_type:${TYPE_BRUSH}) OR (product_type:${TYPE_DRY_SHAMPOO}) OR (product_type:${TYPE_MARKER}) AND (tag:${TAG_DARKER_BROWN})`
  }
};

const pickPermanentColor = (shade, colourFamily, currentColourType) => {
  if (
    colourFamily === enums.COLOUR_FAMILIES.RED.id ||
    currentColourType === enums.CURRENT_COLOUR_TYPES.BLEACH.id
  )
    return null;

  if (colourFamily === enums.COLOUR_FAMILIES.BLACK.id)
    return `(product_type:${TYPE_PERMANENT}) AND (title:2.0)`;

  const pick = Object.keys(enums.SHADES).find(
    key => enums.SHADES[key].id === shade
  );

  if (!pick) return null;

  const code = enums.SHADES[pick].code;

  return `(product_type:${TYPE_PERMANENT}) AND (title:${code})`;
};

const pick = (targetEnum, id) =>
  targetEnum[Object.keys(targetEnum).find(key => targetEnum[key].id === id)];

const pickShadeShotPlus = (shadeShot, colourFamily, currentColourType) => {
  if (
    !shadeShot ||
    colourFamily === enums.COLOUR_FAMILIES.RED.id ||
    currentColourType === enums.CURRENT_COLOUR_TYPES.BLEACH.id ||
    colourFamily === enums.COLOUR_FAMILIES.BLACK.id
  )
    return null;

  const tag = pick(enums.SHADE_SHOTS, shadeShot).tag;

  return `(product_type:${TYPE_SSP}) AND (tag:${tag})`;
};

const pickGloss = (shadeShot, colourFamily, currentColourType, highlights) => {
  if (
    !shadeShot ||
    colourFamily === enums.COLOUR_FAMILIES.RED.id ||
    currentColourType === enums.CURRENT_COLOUR_TYPES.BLEACH.id ||
    colourFamily === enums.COLOUR_FAMILIES.BLACK.id
  )
    return null;

  const tag = highlights
    ? pick(enums.HIGHLIGHTS, highlights).tag
    : pick(enums.SHADE_SHOTS, shadeShot).tag;

  return `tag:${TAG_GLOSS} ${tag}`;
};

const pickShampoo = (isBrown, isFrizzy) => {
  if (isBrown) {
    return isFrizzy
      ? QUERIES.CARE_RANGE.SHAMPOO_FRIZZY_BROWN
      : QUERIES.CARE_RANGE.SHAMPOO_FINE_BROWN;
  }
  return isFrizzy
    ? QUERIES.CARE_RANGE.SHAMPOO_FRIZZY_BLONDE
    : QUERIES.CARE_RANGE.SHAMPOO_FINE_BLONDE;
};

const pickCareRange = (
  shade,
  haircare,
  colourFamily,
  currentColourType,
  highlights
) => {
  if (colourFamily === enums.COLOUR_FAMILIES.RED.id) return null;

  const isFrizzy = haircare === 1;

  if (currentColourType === enums.CURRENT_COLOUR_TYPES.BLEACH.id)
    return pickShampoo(false, isFrizzy);

  if (colourFamily === enums.COLOUR_FAMILIES.BLACK.id)
    return pickShampoo(true, isFrizzy);

  if (highlights) return pickShampoo(false, isFrizzy);

  switch (shade) {
    case enums.SHADES.LB9.id:
    case enums.SHADES.LB85.id:
    case enums.SHADES.LB8.id:
    case enums.SHADES.DB75.id:
    case enums.SHADES.DB7.id:
    case enums.SHADES.DB65.id:
      return pickShampoo(false, isFrizzy);
    case enums.SHADES.LB6.id:
    case enums.SHADES.LB55.id:
    case enums.SHADES.LB5.id:
    case enums.SHADES.DB4.id:
    case enums.SHADES.DB3.id:
    case enums.SHADES.DB2.id:
      return pickShampoo(true, isFrizzy);
    default:
      return null;
  }
};

const pickConcealers = (shade, graysLevel, colourFamily, currentColourType) => {
  if (
    graysLevel === enums.GRAYS_LEVELS.NONE.id ||
    currentColourType === enums.CURRENT_COLOUR_TYPES.BLEACH.id
  )
    return null;

  if (
    colourFamily === enums.COLOUR_FAMILIES.BLACK.id &&
    graysLevel !== enums.GRAYS_LEVELS.NONE.id
  )
    return `(product_type:${TYPE_BRUSH}) AND (tag:${TAG_BLACK})`;

  if (colourFamily === enums.COLOUR_FAMILIES.RED.id)
    return `(product_type:${TYPE_BRUSH}) AND (tag:${TAG_RED})`;

  const grayer =
    graysLevel === enums.GRAYS_LEVELS.MOST.id ||
    graysLevel === enums.GRAYS_LEVELS.ALL.id;

  switch (shade) {
    case enums.SHADES.LB9.id:
    case enums.SHADES.LB85.id:
    case enums.SHADES.LB8.id:
      return grayer
        ? QUERIES.CONCEALERS.CONCEALERS_MOST_LIGHTER_BLONDE
        : QUERIES.CONCEALERS.CONCEALERS_FEW_LIGHTER_BLONDE;
    case enums.SHADES.DB75.id:
    case enums.SHADES.DB7.id:
    case enums.SHADES.DB65.id:
      return grayer
        ? QUERIES.CONCEALERS.CONCEALERS_MOST_DARKER_BLONDE
        : QUERIES.CONCEALERS.CONCEALERS_FEW_DARKER_BLONDE;
    case enums.SHADES.LB6.id:
    case enums.SHADES.LB55.id:
    case enums.SHADES.LB5.id:
      return grayer
        ? QUERIES.CONCEALERS.CONCEALERS_MOST_LIGHTER_BROWN
        : QUERIES.CONCEALERS.CONCEALERS_FEW_LIGHTER_BROWN;
    case enums.SHADES.DB4.id:
    case enums.SHADES.DB3.id:
    case enums.SHADES.DB2.id:
      return grayer
        ? QUERIES.CONCEALERS.CONCEALERS_MOST_DARKER_BROWN
        : QUERIES.CONCEALERS.CONCEALERS_FEW_DARKER_BROWN;
    default:
      return null;
  }
};

const pickEverythingMask = () => `(product_type:${TYPE_EVERYTHING_MASK})`;

const ResultsPage = ({
  addToCart,
  userName,
  userImage,
  currentColourType,
  colourFamily,
  shade,
  shadeShot,
  graysLevel,
  haircare,
  highlights,
}) => {
  const showFeaturedProducts = currentColourType !== CURRENT_COLOUR_TYPES.BLEACH.id && colourFamily !== COLOUR_FAMILIES.RED.id &&
      (shade !== 0 && (shadeShot !== undefined) || (graysLevel !== undefined));
  let preview = false;

  if (shadeShot >= 0) {
    if (shadeShot) {
      preview = `${CDN}/shades/Level ${shade &&
        SHADES.ids[shade].comparisonKey}.jpg`;
    }

    if (shade && shade !== 0 && shadeShot && shadeShot !== 0) {
      const shadeKey = SHADES.ids[shade].comparisonKey;
      const shadeShotKey = SHADE_SHOTS.ids[shadeShot].comparisonKey;
      preview = `${CDN}/shades/${shadeKey} & ${shadeShotKey}.jpg`;
    }
  }

  return (
    <Container>
      <Content>
        <PreviewSection>
          {(preview || userImage) && (
            <ResultPhotos>
              {preview && (
                <ResultWrap>
                  <Image src={`${preview}`} />
                </ResultWrap>
              )}
              {userImage && (
                <ResultWrap>
                  <Image src={userImage} />
                </ResultWrap>
              )}
            </ResultPhotos>
          )}
          <Title>Nice work {userName}!</Title>
          <Subtitle>
            We think you're amazing, here are the products that will create and
            maintain the right colour for you.
          </Subtitle>
        </PreviewSection>

        <SectionWrap spaceTop={showFeaturedProducts}>
          {showFeaturedProducts && (
            <FeaturedProduct>
              <Products
                addToCart={addToCart}
                searchQuery={pickPermanentColor(
                  shade,
                  colourFamily,
                  currentColourType
                )}
                render={({ data }) => {
                  return data.map(product => (
                    <FeaturedProductCart product={product} />
                  ));
                }}
              />
              <Products
                addToCart={addToCart}
                searchQuery={pickShadeShotPlus(
                  shadeShot,
                  colourFamily,
                  currentColourType
                )}
                render={({ data }) => {
                  return data.map(product => (
                    <FeaturedProductCart product={product} />
                  ));
                }}
              />
            </FeaturedProduct>
          )}
          <ProductsSection
            title={"Root concealers"}
            subTitle={
              "Now you know your shade, here's everything you need to achieve, maintain and care for your colours."
            }
            hasProducts={showFeaturedProducts}
          >
            <Products
              addToCart={addToCart}
              searchQuery={pickConcealers(
                shade,
                graysLevel,
                colourFamily,
                currentColourType
              )}
            />
          </ProductsSection>
          <ProductsSection
            title={"Care range"}
            subTitle={
              "Shade refreshing, shine-boosting care tailored to your hair."
            }
          >
            <Products
              addToCart={addToCart}
              searchQuery={pickGloss(
                shadeShot,
                colourFamily,
                currentColourType,
                highlights
              )}
            />
            <Products
              addToCart={addToCart}
              searchQuery={pickCareRange(
                shade,
                haircare,
                colourFamily,
                currentColourType,
                highlights
              )}
            />
            <Products
              addToCart={addToCart}
              searchQuery={pickEverythingMask()}
            />
          </ProductsSection>
        </SectionWrap>
        <VideoSection />
      </Content>
    </Container>
  );
};

ResultsPage.propTypes = {
  addToCart: PropTypes.func,
  userName: PropTypes.string,
  userImage: PropTypes.string,
  currentColourType: PropTypes.number,
  colourFamily: PropTypes.number,
  shade: PropTypes.number,
  shadeShot: PropTypes.number,
  graysLevel: PropTypes.number,
  haircare: PropTypes.number,
  highlights: PropTypes.number
};

export default ResultsPage;
