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
    getToken()
    return () => {
      // cleanup
    };
  }, [fetchAllProducts])

  const getToken = async () => {
    const res = await authenticate.post('/Authentication/Authenticate?userName=paulo.roberto@samuraiexperts.com.br&password=123456&tenantId=35286082-eb17-4b9e-aad9-a3d5df25526a', {withCredentials: true})
    if(res.data !== ''){
      console.log(res.data.access_token)
      getProductSeller(res.data.access_token)
    }
  }

  const getProductSeller = async (token) => {
    let res = await api.get('/Products/Full', { headers: { 'Authorization': `Bearer ${token}` } })
    const clientCodes = []
    
    if(res.status == 200){
      console.log(res.data.value)
      res.data.value.map((p) => p.tenantId === '35286082-eb17-4b9e-aad9-a3d5df25526a' && clientCodes.push(p.clientCode))
    }
    // for (let i = 0; i < res.data.value.length; i++) {
    //   if (res.data.value[i].tenantId === '35286082-eb17-4b9e-aad9-a3d5df25526a')
    //     clientCodes.push(res.data.value[i].clientCode)
    // }
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
