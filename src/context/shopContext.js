import React, { Component } from 'react'
import Client from 'shopify-buy'

const ShopContext = React.createContext()

const client = Client.buildClient({
  storefrontAccessToken: 'a984494ca91da297dd9137dbce1f7a7d',
  domain: 'poc-seller-center.myshopify.com'
})

class ShopProvider extends Component {
  state = {
    products: [],
    product: {},
    checkout: {},
    isCartOpen: false,
    itemsCart: 0
  }

  componentDidMount() {
    const previousCart = localStorage.getItem('cart')
    
    if(previousCart){
      const localCart = JSON.parse(previousCart)
      this.setState({ checkout: localCart})
      this.setItemsCart(localCart)
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
    this.setItemsCart(checkout)
    
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

  setItemsCart = (checkout) => {
    let count = 0
    for (let i = 0; i < checkout.lineItems.length; i++) {
      count = count + checkout.lineItems[i].quantity
    }
    this.setState({ itemsCart: count })
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
