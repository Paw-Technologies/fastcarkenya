

// /api/v1/products
import axios from "axios";

const api2  = axios.create({
    // baseURL: "https://36db-105-160-115-21.eu.ngrok.io/api/v1/products"
    // baseURL: "http://localhost:5000/api/v1/products"
    baseURL: "https://fastcar.onrender.com/api/v1/products"
})

// export const base = axios.create({
//     //baseURL: "http://localhost:5000/api
//     baseURL: "https://fastcar.onrender.com/api"
// })
// export const base = "http://localhost:5000"
export const base = 'https://fastcar.onrender.com/api'
// export const base = "https://36db-105-160-115-21.eu.ngrok.io"

export default api2
    
