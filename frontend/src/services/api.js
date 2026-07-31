import axios from "axios";

import { getToken } from "../utils/auth";

console.log(import.meta.env.VITE_API_URL);

const api= axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    withCredentials: true,
    timeout:30000,
});

api.interceptors.request.use((config)=>{
    const token= getToken();

    if(token){
        config.headers.Authorization= `Bearer ${token}`
    }

    return config;
})

export default api;