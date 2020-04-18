import React, {useContext} from "react"
import { ShopContext } from '../../context/shopContext'
import { Link } from 'gatsby'

import logo from "../../images/logo.png"
import './styles.css'

const Header = () => {

  const { openCart, checkout } = useContext(ShopContext)

  return (
    <header>
      <div className="flex mb-4">
        <div className="items-center w-full shadow-sm h-auto">
          <div className="flex justify-between items-center">
            <Link to="/"><img className="ml-20 mt-2 w-48" src={logo} alt="" /></Link>
            <div className="mr-20 relative" onClick={() => openCart()} role="button">
              <svg className="stroke-current text-blue-400 hover:text-blue-600 inline-block h-8 w-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="8" cy="21" r="2"></circle>
                <circle cx="20" cy="21" r="2"></circle>
                <path d="M5.67 6H23l-1.68 8.39a2 2 0 0 1-2 1.61H8.75a2 2 0 0 1-2-1.74L5.23 2.74A2 2 0 0 0 3.25 1H1"></path>
              </svg>
              <span className="text-white bg-gray-600 font-semibold text-xs rounded-full h-5 w-5 flex items-center justify-center absolute position-right-negative">
                {checkout.lineItems && checkout.lineItems.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )

}

export default Header
