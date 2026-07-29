import api from "./api";

export const getAIHints = async (problemId)=>{
    const {data} = await api.post(`/ai/hints/${problemId}`);
    return data;
}