import React from 'react';

import withProducts from '../../../common/enhancers/withProducts'

const Container = props => {
    console.log('props', props)
    return <span>Product</span>
}

const Product = ({ searchQuery }) => {
    const Component = withProducts(searchQuery)(Container)
    return <Component />
}

export default Product;