import api from "./api.js";

export const getPublicTestCases=async(problemId)=>{
    const response= await api.get(`/testcases/problem/${problemId}`); // we get the public test cases for the problem with the provided problemId from the backend and return them to the frontend
    return response.data.data;
}