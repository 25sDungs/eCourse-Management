import api from "./apis";

export const currentUserInfo = async () => {
    try {
        const response = await api.get("/users/me");
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Đăng nhập thất bại");
    }
};