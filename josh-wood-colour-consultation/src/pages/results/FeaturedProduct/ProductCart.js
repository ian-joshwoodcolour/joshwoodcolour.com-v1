import React from "react";

import {
  AddToCardButton,
  ImageWrap,
  Description,
  DescriptionWrap,
  Price,
  Title,
  Content
} from "./styled";
import { Image } from "../../../components/image";

const ProductCart = ({ product }) => (
  <Content>
    <ImageWrap>
      <Image src={product.imageSrc} alt={"Featured product"} />
    </ImageWrap>
    <DescriptionWrap>
      <Title>{product.title}</Title>
      <Price>£{product.price}</Price>
      <Description>{product.description}</Description>
      <AddToCardButton>Add to cart</AddToCardButton>
    </DescriptionWrap>
  </Content>
);

export default ProductCart;
