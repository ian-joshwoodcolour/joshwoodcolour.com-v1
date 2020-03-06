import React from "react";

import { Image } from "../../../components/image";

import {
  Wrap,
  Title,
  Metadata,
  Price,
  ImageWrap,
  Description,
  TextDescription,
  AddToCartButton
} from "./styled";

const ProductCard = ({ title, price, description, src, onAddToCard }) => (
  <Wrap>
    <ImageWrap>
      <Image src={src} alt={title} />
      <Description>{description}</Description>
    </ImageWrap>
    <Metadata>
      <Title>{title}</Title>
      <Price>{price}</Price>
    </Metadata>
    <TextDescription>{description}</TextDescription>
    <AddToCartButton spread bordered onClick={onAddToCard}>
      Add to cart
    </AddToCartButton>
  </Wrap>
);

export default ProductCard;
