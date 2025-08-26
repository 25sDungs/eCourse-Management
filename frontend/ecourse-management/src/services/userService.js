import api from "./apis";

export const currentUserInfo = async () => {
    try {
        const response = await api.get("/users/me");
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Đăng nhập thất bại");
    }
};

export const register = async (formData) => {
    try {
        const response = await api.post("/users", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Đăng ký thất bại");
    }
};