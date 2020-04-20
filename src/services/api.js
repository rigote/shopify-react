import axios from 'axios'

export const api = axios.create({
  baseURL: "https://sc-prd-webapp-api-products.azurewebsites.net"
})

export const seller = axios.create({
  baseURL: "https://sc-prd-webapp-api-sellers.azurewebsites.net"
})