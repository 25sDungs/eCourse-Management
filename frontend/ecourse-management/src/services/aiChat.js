import api from "./apis";

export const aiChat = async (message) => {
    try {
        const response = await api.post("/chat", { message });
        return response;
    } catch (error) {
        throw new Error(error);
    }
}