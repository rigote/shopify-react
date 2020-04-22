import React from 'react'
import logoF from "../../images/logo_negative.png"
import payment from "../../images/payment.png"

const Footer = () => {
  return (
    <div className="flex mt-4">
      <div className="items-center w-full h-auto">
        <div className="flex m-auto border-t border-black p-2">
          <div className="flex justify-between m-auto mt-4 container">
            <div className="w-2/3">
              <span className="w-full">RECEBA <b>OFERTAS E NOVIDADES</b> POR E-MAIL</span>
              <div className="flex w-full mt-4 mb-4">
                <input class="mr-4 border border-gray-300 w-2/4 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value="" />
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">
                  Cadastrar
              </button>
              </div>
            </div>
            <div className="w-1/3">
              <span className="w-full">FORMAS DE <b>PAGAMENTO</b></span>
              <img className="mt-4 w-64" src={payment} alt="Formas de pagamento"/>
            </div>
          </div>
        </div>
        <div className="flex m-auto bg-black p-2">
          <div className="flex justify-end items-center m-auto container">
            <small className="text-white">Develop by</small>
            <img className="w-24" src={logoF} alt="Samurai Experts" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
