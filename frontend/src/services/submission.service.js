import api from "./api";

export const runCode = async (payload) => {
    const response = await api.post(
        "/submissions/run",
        payload
    );

    return response.data;
};

export const submitCode = async (payload) => {
    const response = await api.post(
        "/submissions",
        payload
    );

    return response.data;
};

export const getMySubmissions = async () => {
    const response = await api.get(
        "/submissions/my"
    );

    return response.data;
};