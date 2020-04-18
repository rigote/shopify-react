import React, { useContext, useEffect } from 'react'
import { Link } from 'gatsby'

import { ShopContext } from '../../context/shopContext'
import Loading from '../Loading'

import './styles.css'

const ProductList = () => {
  const { fetchAllProducts, products } = useContext(ShopContext)

  useEffect(() => {
    fetchAllProducts()
    return () => {
      // cleanup
    };
  }, [fetchAllProducts])

  if (!products) return <Loading />

  return (
    <div className="flex flex-wrap">
      {products.map(product => (
        <Link to="ProductPage" state={{productId: product.id}}>
          <div key={product.id} className="max-width m-2 rounded overflow-hidden shadow-lg">
            <img className="w-full h-64 object-cover" src={product.images[3].src} alt="Sunset in the mountains" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{product.title}</div>
            </div>
            <div className="flex items-center px-6 py-4">
              <div>
                <div className="w-2/3">
                  <span>{product.variants[0].sku}</span>
                  <span className="inline-block w-full line-through text-gray-500">R$ {product.variants[0].compareAtPrice}</span>
                  <span className="inline-block w-full text-xl font-medium text-gray-800">R$ {product.variants[0].price}</span>
                </div>
              </div>
              <span className="w-1/2 text-right text-sm text-blue-500 hover:text-blue-700">Ver detalhes e comprar</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ProductList;
