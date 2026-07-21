import api from "./api.js";

export const getAllProblems=async()=>{
    const response= await api.get("/problems");
    return response.data.data;
};

export const getProblemBySlug = async(slug)=>{
    const response= await api.get(`/problems/${slug}`);
    return response.data.data;
}