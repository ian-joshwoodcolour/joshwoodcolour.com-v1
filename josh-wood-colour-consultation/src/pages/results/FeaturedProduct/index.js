import React from "react";

import {
  Wrap,
  InvisibleWrap,
  InnerWrap
} from "./styled";

const FeaturedProduct = ({ children }) => (
  <InvisibleWrap>
    <Wrap>
      <InnerWrap>
          {children}
      </InnerWrap>
    </Wrap>
  </InvisibleWrap>
);

export default FeaturedProduct;
