import React, { Component } from 'react'
import Client from 'shopify-buy'

const ShopContext = React.createContext()

const client = Client.buildClient({
  storefrontAccessToken: 'aa9b783a961dc4b1728b55b690c26a4a',
  domain: 'poc-seller-center.myshopify.com'
})

class ShopProvider extends Component {
  state = {
    products: [],
    product: {},
    checkout: {},
    isCartOpen: false
  }

  componentDidMount() {
    const previousCart = localStorage.getItem('cart')
    
    if(previousCart){
      const localCart = JSON.parse(previousCart)
      this.setState({ checkout: localCart})
    }else{
      this.createCheckout()
    }
  }

  createCheckout = async () => {
    const checkout = await client.checkout.create()
    await this.setState({ checkout: checkout })
  }

  addItemToCheckout = async (variantId, quantity) => {
    const lineItemsToAdd = [{
      variantId,
      quantity: parseInt(quantity, 10)
    }]
    const checkout = await client.checkout.addLineItems(this.state.checkout.id, lineItemsToAdd)
    
    localStorage.setItem('cart', JSON.stringify(checkout))

    this.setState({ checkout: checkout })    

    this.openCart()
  }

  fetchAllProducts = async () => {
    const products = await client.product.fetchAll()
    this.setState({ products: products })
  }

  fetchProductWithId = async (id) => {
    const product = await client.product.fetch(id)
    this.setState({ product: product })
    return product
  }

  closeCart = () => { this.setState({ isCartOpen: false }) }
  openCart = () => { this.setState({ isCartOpen: true }) }

  render() {
    return (
      <ShopContext.Provider value={{
        ...this.state,
        fetchAllProducts: this.fetchAllProducts,
        fetchProductWithId: this.fetchProductWithId,
        closeCart: this.closeCart,
        openCart: this.openCart,
        addItemToCheckout: this.addItemToCheckout

      }}>
        {this.props.children}
      </ShopContext.Provider>
    )
  }
}


const ShopConsumer = ShopContext.Consumer

export { ShopConsumer, ShopContext }

export default ShopProvider
