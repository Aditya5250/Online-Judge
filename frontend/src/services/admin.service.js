import api from "./api";

export const getAdminProblems = async ()=>{

    const response = await api.get("/problems/admin");
    return response.data;

}


export const createProblem = async (problemData) =>{
    const {data} =await api.post("/problems",problemData);

    return data;
}



export  const createTestCase = async (testCaseData) =>{
    const {data} =await api.post("/testcases",testCaseData);

    return data;    
}
