import api from "./apis";

export const login = async (username, password) => {
    try {
        const response = await api.post("/auth/login", { username, password });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Đăng nhập thất bại");
    }
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
};