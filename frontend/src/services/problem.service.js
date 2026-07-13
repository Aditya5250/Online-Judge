import api from "./api.js";

export const getAllProblems=async()=>{
    const response= await api.get("/problems");
    return response.data.data;
};