import api from "./api";
import { clearAuth } from "../utils/auth";

export const registerUser= async(userData)=>{
    const response = await api.post("/auth/signup",userData); // we send the user data to the backend to register the user and return the response from the backend to the frontend
    return response.data;
};

export const loginUser = async(Credentials)=>{
    const response= await api.post("/auth/login",Credentials);
    return response.data;
};

export const getCurrentUser =async ()=>{
    const response = await api.get("/auth/me");
    return response.data;
}

export const logoutUser = ()=>{
    clearAuth();
};

