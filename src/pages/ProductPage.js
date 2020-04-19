import React from 'react'

import Layout from '../components/Layout'
import Product from '../components/Product'
import Loading from '../components/Loading'

const ProductPage = ({ location }) => {
  const { state = {} } = location
  const { productId } = state
  
  return (
    <Layout>
      {productId ? <Product id={productId} /> : <Loading />}
    </Layout>
  )
}

export default ProductPage;
