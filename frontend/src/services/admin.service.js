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


export const getProblemBySlug = async (slug) => {
    const { data } = await api.get(`/problems/${slug}`);
    return data;
};

export const getProblemTestCases = async (problemId) => {
    const { data } = await api.get(`/testcases/problem/${problemId}`);
    return data;
};

export const updateProblem = async (slug, problemData) => {
    const { data } = await api.patch(`/problems/${slug}`, problemData);
    return data;
};

export const updateTestCase = async (id, testCaseData) => {
    const { data } = await api.put(`/testcases/${id}`, testCaseData);
    return data;
};

export const deleteProblem = async (slug) => {
    const { data } = await api.delete(`/problems/${slug}`);
    return data;
};

export const deleteTestCase = async (id) => {
    const { data } = await api.delete(`/testcases/${id}`);
    return data;
};


export const getAdminDashboard = async()=>{
    const {data} = await api.get("/admin/dashboard");
    return data;
};