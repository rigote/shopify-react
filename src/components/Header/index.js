import React, { useContext, useState, useEffect } from "react"
import { ShopContext } from '../../context/shopContext'
import { Link } from 'gatsby'

import logo from "../../images/logo.png"
import './styles.css'

const Header = () => {

  const { openCart, itemsCart } = useContext(ShopContext)

  return (
    <header>
      <div className="flex mb-4">
        <div className="items-center w-full shadow-sm h-auto">
          <div className="flex justify-between items-center">
            <Link to="/"><img className="ml-20 mt-2 w-48" src={logo} alt="" /></Link>
            <nav className="flex font-semibold">
              <Link className="hover:text-gray-700 mr-4 ml-4">Novidades</Link>
              <Link className="hover:text-gray-700 mr-4 ml-4">Marcas</Link>
              <Link className="hover:text-gray-700 mr-4 ml-4">Acessórios</Link>
              <Link className="hover:text-gray-700 mr-4 ml-4">Roupas</Link>
              <Link className="hover:text-gray-700 mr-4 ml-4">Sapatos</Link>
              <Link className="hover:text-gray-700 mr-4 ml-4">Jeans</Link>
              <Link className="hover:text-gray-700 mr-4 ml-4">Looks</Link>
              <Link className="text-red-500 hover:text-red-700 mr-4 ml-4">Outlet</Link>
            </nav>
            <div className="relative">
              <input class="border border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value="" />
              <svg className="icon-search text-blue-400 hover:text-blue-600 inline-block h-4 w-4 absolute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.9 14.32a8 8 0 111.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 108 2a6 6 0 000 12z" /></svg>
            </div>
            <div className="mr-20 relative" onClick={() => openCart()} role="button">
              <svg className="stroke-current text-blue-400 hover:text-blue-600 inline-block h-8 w-8 hidden" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="8" cy="21" r="2"></circle>
                <circle cx="20" cy="21" r="2"></circle>
                <path d="M5.67 6H23l-1.68 8.39a2 2 0 0 1-2 1.61H8.75a2 2 0 0 1-2-1.74L5.23 2.74A2 2 0 0 0 3.25 1H1"></path>
              </svg>
              <svg className="text-blue-400 hover:text-blue-600 inline-block h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M16 6v2h2l2 12H0L2 8h2V6a6 6 0 1112 0zm-2 0a4 4 0 10-8 0v2h8V6zM4 10v2h2v-2H4zm10 0v2h2v-2h-2z"/></svg>
              <span className="text-white bg-gray-600 font-semibold text-xs rounded-full h-5 w-5 flex items-center justify-center absolute position-right-negative">
                {itemsCart && itemsCart}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )

}

export default Header
