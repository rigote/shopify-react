import axios from 'axios'

export const api = axios.create({
  baseURL: "https://sc-prd-webapp-api-products.azurewebsites.net"
})

export const seller = axios.create({
  baseURL: "https://sc-prd-webapp-api-sellers.azurewebsites.net"
})

export const authenticate = axios.create({
  baseURL: "https://api-controlaccess.mysamurai.com.br"
})