import React, { Fragment } from 'react'

import { Subtitle } from '../styled'
import { ProductsContainer, Headline, Wrap } from './styled'

const ProductsSection = ({
  queries = [],
  title,
  subTitle,
  children,
  hasProducts = true,
}) => {
  return (
    <Fragment>
      {hasProducts && (
        <Fragment>
          <Headline>{title}</Headline>
          <Subtitle>{subTitle}</Subtitle>
        </Fragment>
      )}
      <ProductsContainer>{children}</ProductsContainer>
    </Fragment>
  )
}

export default ProductsSection
