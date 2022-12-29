import axios from "axios";

const api  = axios.create({
    //baseURL: "http://localhost:5000/api/v1/users"
    baseURL: "https://fastcar.onrender.com/api/v1/users"
})


export default api
    
