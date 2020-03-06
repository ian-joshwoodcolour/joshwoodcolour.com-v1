import React from "react";
import withProducts from "../../common/enhancers/withProducts";

import ProductCard from "./ProductCard";

const getProduct = data => {
  if (!data.products) {
    return null;
  }

  if (!data.products.edges) {
    return null;
  }

  if (!data.products.edges[0]) {
    return null;
  }

  return data.products.edges[0].node;
};

const Product = ({ data, children }) => {
  //console.log('data', data);

  const products = data.products.edges;

  const mappedProducts = products.map(({ node: product } )=> {
        const imageSrc = product.images.edges[0].node.transformedSrc;
        const variantID = product.variants.edges[0].node.id;
        const title = product.title;
        const description = product.description;
        const price = product.price;
        const id = product.id;

        return {
            imageSrc,
            variantID,
            title,
            description,
            price,
            id
        }
  })

    return children(mappedProducts);

  const product = getProduct(data);

  if (!product) {
    return null;
  }

  const title = product.title;
  const description = product.description;
  const price = product.price;
  const image = product.images.edges[0].node.transformedSrc;

  return (
    <ProductCard
      title={title}
      price="£10"
      description={description}
      src={image}
    />
  );
};

const ProductContainer = ({ searchQuery, children }) => {
  //console.log('searchQuery', searchQuery)
  const Component = withProducts(searchQuery)(Product);

  return children(Component);
};

export default ProductContainer;
