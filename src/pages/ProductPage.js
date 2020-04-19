import React, { useState, useEffect } from 'react'

import Layout from '../components/Layout'
import Product from '../components/Product'
import Loading from '../components/Loading'

const ProductPage = ({ location }) => {
  const [product, setProdut] = useState()

  useEffect(() => {
    if (location.state) {
      const { state = {} } = location
      const { productId } = state

      if(productId){
        localStorage.setItem('productId', productId)
        setProdut(productId)
      }else{
        setProdut(localStorage.getItem('productId'))
      }
    }else{
      setProdut(localStorage.getItem('productId'))
    }
  }, [])

  return (
    <Layout>
      {product ? <Product id={product} /> : <Loading />}
    </Layout>
  )
}

export default ProductPage;
