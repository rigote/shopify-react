import React from "react"
import ShopProvider from '../../context/shopContext'

import Header from "../Header"
import Footer from "../Footer"
import Cart from '../Cart'
import "./styles.css"

const Layout = ({ children }) => {
  return (
    <ShopProvider>
      <Header />
      <Cart />
      <div className="flex-row relative m-auto my-5 container">
        <div className="w-full h-full bg-white opacity-75 absolute hidden" />
        <main>{children}</main>
      </div>
      <Footer />
    </ShopProvider>
  )
}

export default Layout
