import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../../context/shopContext'
import Loading from '../Loading'

import './styles.css'

const Product = (params) => {
  const { id } = params
  const { fetchProductWithId, addItemToCheckout, product } = useContext(ShopContext)

  useEffect(() => {
    fetchProductWithId(id)

    // fetchData()
    return () => {
      // setProduct(null)
    };
  }, [fetchProductWithId, id])

  if (!product.title) return <Loading />

  return (
    <div className="flex flex-wrap">
      <div className="img-product mr-8">
        <img className="w-full object-cover" src={product.images[0].src} alt="" />
      </div>
      <div className="w-2/5">
        <div className="border-b border-gray-400 mb-4 pb-4">
          <h3 className="text-2xl font-semibold">{product.title}</h3>
          <small className="text-gray-600">Código: {product.variants[0].sku}</small>
        </div>
        <div className="flex items-center border-b border-gray-400 mb-4 pb-4">
          <div className="w-1/3">
            <span className="inline-block w-full text-base line-through text-gray-500">R$ {product.variants[0].compareAtPrice}</span>
            <span className="inline-block w-full text-2xl font-medium text-gray-700">R$ {product.variants[0].price}</span>
          </div>
          <div className="flex w-2/3 justify-end">
            <button onClick={() => addItemToCheckout(product.variants[0].id, 1)} class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Comprar
            </button>
          </div>
        </div>
        <div className="border-b border-gray-400 mb-4 pb-4 text-justify text-gray-800">
          {product.description}
        </div>
      </div>
    </div>
  )
};

export default Product;
