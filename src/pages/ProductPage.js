import React, { useState, useEffect } from 'react'

import Layout from '../components/Layout'
import Product from '../components/Product'
import Loading from '../components/Loading'

const ProductPage = ({ location }) => {
  const [product, setProdut] = useState()

  if (location.state) {
    console.log(location.state)
    const { state = {} } = location
    const { productId } = state
    localStorage.setItem('productId', productId)
  }

  useEffect(() => {
    setProdut(localStorage.getItem('productId'))
  }, [])

  return (
    <Layout>
      {product ? <Product id={product} /> : <Loading />}
    </Layout>
  )
}

export default ProductPage;
