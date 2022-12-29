

// /api/v1/products
import axios from "axios";

const api2  = axios.create({
    baseURL: "http://localhost:5000/api/v1/products"
    //baseURL: "https://fastcar.onrender.com/api/v1/products"
})


export default api2
    
