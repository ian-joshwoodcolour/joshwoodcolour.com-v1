import React from "react";
import PropTypes from "prop-types";
import withProducts from "../../common/enhancers/withProducts";

import { ProductsContainer, ProductsItemWrap } from "./ProductsSection/styled";
import ProductCard from "./ProductCard";

const mapProductData = data => {
  if (data.loading) {
    return [];
  }

  const products = data.products.edges;

  return products.map(({ node: product }) => {
    const imageSrc = product.images.edges[0].node.transformedSrc;
    const variantID = product.variants.edges[0].node.id;
    const price = product.variants.edges[0].node.price;
    const title = product.title;
    const description = product.description;
    return {
      imageSrc,
      variantID,
      title,
      description,
      price
    };
  });
};

const List = ({ addToCart, data }) => {
  if (data.loading) return "...Loading";

  return mapProductData(data).map(product => (
    <ProductsItemWrap key={product.id}>
      <ProductCard
        title={product.title}
        price={`£${product.price}`}
        description={product.description}
        src={product.imageSrc}
        onAddToCard={() => {
          addToCart(
            atob(product.variantID)
              .split("/")
              .pop(),
            1
          ).then(() => window.location.reload());
        }}
      />
    </ProductsItemWrap>
  ));
};

List.propTypes = {
  data: PropTypes.any
};

const Products = ({ addToCart, searchQuery, render }) => {
  if (!searchQuery) return null;

  const Component = withProducts(searchQuery)(({ data }) => {
    if (typeof render === "function") {
      return render({
        data: mapProductData(data),
        addToCart
      });
    }
    return <List addToCart={addToCart} data={data} />;
  });

  return <Component />;
};

Products.propTypes = {
  searchQuery: PropTypes.string,
  title: PropTypes.string
};

export default Products;
