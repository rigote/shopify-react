import React, { useContext, useEffect, useState } from 'react'
import { api, seller } from '../../services/api';
import { Link, push } from 'gatsby'

import { ShopContext } from '../../context/shopContext'
import Loading from '../Loading'

import './styles.css'

const ProductList = () => {
  const { fetchAllProducts, products } = useContext(ShopContext)
  const [sellerProduct, setSellerProduct] = useState([])

  useEffect(() => {
    fetchAllProducts()
    getProductSeller()
    return () => {
      // cleanup
    };
  }, [fetchAllProducts])

  const getProductSeller = async () => {
    let res = await api.get('/Products/Full', { headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIwZTA1NjkyMC1kYjBhLTRkZTAtOGZjMC04MjlkZWIzZWZjYjIiLCJ1bmlxdWVfbmFtZSI6Im1hdGhldXMucmlnb3RlQHNhbXVyYWlleHBlcnRzLmNvbS5iciIsIlVzZXJGaXJzdE5hbWUiOiJNYXRoZXVzIiwiVXNlckZ1bGxOYW1lIjoiTWF0aGV1cyBSaWdvdGUiLCJVc2VyRW1haWwiOiJtYXRoZXVzLnJpZ290ZUBzYW11cmFpZXhwZXJ0cy5jb20uYnIiLCJVc2VySXBBZGRyZXNzIjoiMjAxLjgzLjIyNy4yNTAiLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6Ik9XT1NBU1dVRlQ1Tkk3V0FORjU3SEY2UkNXN01FMklSIiwiTXVzdENoYW5nZVBhc3N3b3JkIjoiRmFsc2UiLCJVc2VyVGVuYW50SWQiOiIzNTI4NjA4Mi1lYjE3LTRiOWUtYWFkOS1hM2Q1ZGYyNTUyNmEiLCJUZW5hbnRJZCI6IjM1Mjg2MDgyLWViMTctNGI5ZS1hYWQ5LWEzZDVkZjI1NTI2YSIsInJvbGUiOiJUZW5hbnQiLCJTZWxsZXJTaGlwbWVudFNlcnZpY2VzIjpbIlVwZGF0ZSIsIkluc3RhbGxhdGlvbiIsIkRlbGV0ZSIsIlJlYWQiXSwiVXNlcnMiOlsiQXBwcm92YWwiLCJEZWxldGUiLCJVcGRhdGUiLCJSZWFkIiwiQ3JlYXRlIl0sIk5vdGlmaWNhdGlvblRlbXBsYXRlcyI6WyJEZWxldGUiLCJVcGRhdGUiLCJSZWFkIiwiQ3JlYXRlIl0sIkJhbGFuY2VBbmRUcmFuc2ZlcnMiOlsiVHJhbnNmZXIiLCJSZWFkIl0sIkJ1eWVycyI6WyJBcHByb3ZhbCIsIkRlbGV0ZSIsIlVwZGF0ZSIsIlJlYWQiLCJDcmVhdGUiXSwiQWNjZXNzR3JvdXBzIjpbIkNyZWF0ZSIsIlJlYWQiLCJVcGRhdGUiLCJEZWxldGUiXSwiQXBwcyI6WyJSZWFkIiwiQ3JlYXRlIiwiVXBkYXRlIiwiRGVsZXRlIl0sIlRlbmFudEludGVncmF0aW9uU2VydmljZXMiOlsiSW5zdGFsbGF0aW9uIiwiRGVsZXRlIiwiVXBkYXRlIiwiUmVhZCJdLCJUZW5hbnROb3RpZmljYXRpb25TZXJ2aWNlcyI6WyJJbnN0YWxsYXRpb24iLCJEZWxldGUiLCJVcGRhdGUiLCJSZWFkIl0sIlRlbmFudFBheW1lbnRHYXRld2F5cyI6WyJJbnN0YWxsYXRpb24iLCJEZWxldGUiLCJVcGRhdGUiLCJSZWFkIl0sIlRlbmFudFNoaXBtZW50U2VydmljZXMiOlsiSW5zdGFsbGF0aW9uIiwiRGVsZXRlIiwiVXBkYXRlIiwiUmVhZCJdLCJTZWxsZXJzIjpbIkFwcHJvdmFsIiwiRGVsZXRlIiwiVXBkYXRlIiwiUmVhZCIsIkNyZWF0ZSJdLCJNYW51ZmFjdHVyZXJzIjpbIlVwZGF0ZSIsIlJlYWQiLCJDcmVhdGUiLCJEZWxldGUiXSwiVmFyaWF0aW9uT3B0aW9ucyI6WyJEZWxldGUiLCJVcGRhdGUiLCJSZWFkIiwiQ3JlYXRlIl0sIlByb2R1Y3RzUHJpY2luZ1N0b2NrIjpbIkRlbGV0ZSIsIlVwZGF0ZSIsIlJlYWQiLCJDcmVhdGUiXSwiUHJvZHVjdHMiOlsiQXBwcm92YWwiLCJEZWxldGUiLCJVcGRhdGUiLCJSZWFkIiwiQ3JlYXRlIl0sIkRhc2hib2FyZCI6IlJlYWQiLCJDYXRlZ29yaWVzIjpbIkNyZWF0ZSIsIlVwZGF0ZSIsIlJlYWQiLCJEZWxldGUiXSwiT3JkZXJTdGF0dXMiOlsiRGVsZXRlIiwiVXBkYXRlIiwiUmVhZCIsIkNyZWF0ZSJdLCJPcmRlcnMiOlsiVXBkYXRlIiwiUmVhZCIsIkNyZWF0ZSIsIkRlbGV0ZSJdLCJGaWx0ZXJPcHRpb25zIjpbIkRlbGV0ZSIsIlVwZGF0ZSIsIlJlYWQiLCJDcmVhdGUiXSwibmJmIjoxNTg2NjUzMDUzLCJleHAiOjE2MTgxODkwNTMsImlhdCI6MTU4NjY1MzA1MywiaXNzIjoiTXlTYW11cmFpIiwiYXVkIjoiTXlTYW11cmFpIn0.R1XVD8z5fLacOSZhOyQOFbwh4kyR_oGWKUIpmkSt2ko' } })
    const clientCodes = []
    for (let i = 0; i < res.data.value.length; i++) {
      if (res.data.value[i].tenantId === '35286082-eb17-4b9e-aad9-a3d5df25526a')
        clientCodes.push(res.data.value[i].clientCode)
    }
    setSellerProduct(clientCodes)
  }

  if (!products) return <Loading />

  return (
    <div className="flex flex-wrap">
      {products.map(product => ( sellerProduct.includes(product.variants[0].sku) ?
        <div key={product.id} className="max-width m-2 rounded overflow-hidden shadow-lg">
          <Link to="ProductPage" state={{ productId: product.id }}><img className="w-full h-64 object-cover" src={product.images[0].src} alt="Sunset in the mountains" /></Link>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{product.title}</div>
          </div>
          <div className="flex items-center px-6 py-4">
            <div>
              <div className="w-2/3">
                <span className="inline-block w-full line-through text-gray-500">R$ {product.variants[0].compareAtPrice}</span>
                <span className="inline-block w-full text-xl font-medium text-gray-800">R$ {product.variants[0].price}</span>
              </div>
            </div>
            <Link to="ProductPage" state={{ productId: product.id }} className="w-1/3 text-right text-xs text-blue-500 hover:text-blue-700"><span>Ver detalhes e comprar</span></Link>
          </div>
        </div>
      : ''))}
    </div>
  )
}

export default ProductList;
