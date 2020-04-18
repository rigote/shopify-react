import React from 'react'

import Layout from '../components/Layout'
import Product from '../components/Product'

const ProductPage = ({ location }) => {
  return (
    <Layout>
      <Product id={location.state.productId} />
    </Layout>
  )
}

export default ProductPage;
