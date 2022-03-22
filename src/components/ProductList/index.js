import { Link } from 'gatsby';
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/shopContext';
import { api, authenticate } from '../../services/api';
import Loading from '../Loading';
import './styles.css';

const ProductList = () => {
  const { fetchAllProducts, products } = useContext(ShopContext)
  const [sellerProduct, setSellerProduct] = useState([])

  useEffect(() => {
    fetchAllProducts()
    // getToken()
    getProductSeller()
    return () => {
      // cleanup
    };
  }, [fetchAllProducts])

  const getToken = async () => {
    const res = await authenticate.post('/Authentication/Authenticate?userName=paulo.roberto@samuraiexperts.com.br&password=123456&tenantId=35286082-eb17-4b9e-aad9-a3d5df25526a')
    if(res.status == 200){
      getProductSeller(res.data)
    }
  }

  const getProductSeller = async (token) => {
    let res = await api.get('/Products/Full', { headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI3ZGE5OTNiOS0zNWY2LTRmZjgtODc5OS02MmUzZWRjZGVjMjgiLCJ1bmlxdWVfbmFtZSI6InBhdWxvLnJvYmVydG9Ac2FtdXJhaWV4cGVydHMuY29tLmJyIiwiVXNlckZpcnN0TmFtZSI6InBhdWxvLnJvYmVydG9Ac2FtdXJhaWV4cGVydHMuY29tLmJyIiwiVXNlckZ1bGxOYW1lIjoicGF1bG8ucm9iZXJ0b0BzYW11cmFpZXhwZXJ0cy5jb20uYnIgcGF1bG8ucm9iZXJ0b0BzYW11cmFpZXhwZXJ0cy5jb20uYnIiLCJVc2VyRW1haWwiOiJwYXVsby5yb2JlcnRvQHNhbXVyYWlleHBlcnRzLmNvbS5iciIsIlVzZXJJcEFkZHJlc3MiOiIxNzcuMzMuMjM1Ljg1IiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiJEVTNGM0JXQVNHSEhZUkNMTkpINU5SVlZPNE5aTVVQSSIsIk11c3RDaGFuZ2VQYXNzd29yZCI6ImZhbHNlIiwiVXNlclRlbmFudElkIjoiMzUyODYwODItZWIxNy00YjllLWFhZDktYTNkNWRmMjU1MjZhIiwiVGVuYW50SWQiOiIzNTI4NjA4Mi1lYjE3LTRiOWUtYWFkOS1hM2Q1ZGYyNTUyNmEiLCJyb2xlIjoiVGVuYW50IiwiU2VsbGVyU2hpcG1lbnRTZXJ2aWNlcyI6WyJVcGRhdGUiLCJJbnN0YWxsYXRpb24iLCJEZWxldGUiLCJSZWFkIl0sIlVzZXJzIjpbIkFwcHJvdmFsIiwiRGVsZXRlIiwiVXBkYXRlIiwiUmVhZCIsIkNyZWF0ZSJdLCJOb3RpZmljYXRpb25UZW1wbGF0ZXMiOlsiRGVsZXRlIiwiVXBkYXRlIiwiUmVhZCIsIkNyZWF0ZSJdLCJCYWxhbmNlQW5kVHJhbnNmZXJzIjpbIlRyYW5zZmVyIiwiUmVhZCJdLCJCdXllcnMiOlsiQXBwcm92YWwiLCJEZWxldGUiLCJVcGRhdGUiLCJSZWFkIiwiQ3JlYXRlIl0sIkFjY2Vzc0dyb3VwcyI6WyJDcmVhdGUiLCJSZWFkIiwiVXBkYXRlIiwiRGVsZXRlIl0sIkFwcHMiOlsiUmVhZCIsIkNyZWF0ZSIsIlVwZGF0ZSIsIkRlbGV0ZSJdLCJUZW5hbnRJbnRlZ3JhdGlvblNlcnZpY2VzIjpbIkluc3RhbGxhdGlvbiIsIkRlbGV0ZSIsIlVwZGF0ZSIsIlJlYWQiXSwiVGVuYW50Tm90aWZpY2F0aW9uU2VydmljZXMiOlsiSW5zdGFsbGF0aW9uIiwiRGVsZXRlIiwiVXBkYXRlIiwiUmVhZCJdLCJUZW5hbnRQYXltZW50R2F0ZXdheXMiOlsiSW5zdGFsbGF0aW9uIiwiRGVsZXRlIiwiVXBkYXRlIiwiUmVhZCJdLCJUZW5hbnRTaGlwbWVudFNlcnZpY2VzIjpbIkluc3RhbGxhdGlvbiIsIkRlbGV0ZSIsIlVwZGF0ZSIsIlJlYWQiXSwiU2VsbGVycyI6WyJBcHByb3ZhbCIsIkRlbGV0ZSIsIlVwZGF0ZSIsIlJlYWQiLCJDcmVhdGUiXSwiTWFudWZhY3R1cmVycyI6WyJVcGRhdGUiLCJSZWFkIiwiQ3JlYXRlIiwiRGVsZXRlIl0sIlZhcmlhdGlvbk9wdGlvbnMiOlsiRGVsZXRlIiwiVXBkYXRlIiwiUmVhZCIsIkNyZWF0ZSJdLCJQcm9kdWN0c1ByaWNpbmdTdG9jayI6WyJEZWxldGUiLCJVcGRhdGUiLCJSZWFkIiwiQ3JlYXRlIl0sIlByb2R1Y3RzIjpbIkFwcHJvdmFsIiwiRGVsZXRlIiwiVXBkYXRlIiwiUmVhZCIsIkNyZWF0ZSJdLCJEYXNoYm9hcmQiOiJSZWFkIiwiQ2F0ZWdvcmllcyI6WyJDcmVhdGUiLCJVcGRhdGUiLCJSZWFkIiwiRGVsZXRlIl0sIk9yZGVyU3RhdHVzIjpbIkRlbGV0ZSIsIlVwZGF0ZSIsIlJlYWQiLCJDcmVhdGUiXSwiT3JkZXJzIjpbIlVwZGF0ZSIsIlJlYWQiLCJDcmVhdGUiLCJEZWxldGUiXSwiRmlsdGVyT3B0aW9ucyI6WyJEZWxldGUiLCJVcGRhdGUiLCJSZWFkIiwiQ3JlYXRlIl0sIm5iZiI6MTY0Nzk3NDMxMSwiZXhwIjoxNjc5NTEwMzExLCJpYXQiOjE2NDc5NzQzMTEsImlzcyI6Ik15U2FtdXJhaSIsImF1ZCI6Ik15U2FtdXJhaSJ9.RjPHLUOUD86j0sS--dgZmBYF28DlwU6uxxXMN3eI5uU' } })
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
      : <div className="min-h-screen"><Loading /></div>))}
    </div>
  )
}

export default ProductList;
