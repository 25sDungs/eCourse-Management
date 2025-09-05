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
}

export const forgotPassword = async (email) => {
    try {
        const response = await api.post("/auth/forgot-password", { email });
        return response;
    } catch (error) {
        throw new Error(error || "Lỗi api quên mật khẩu");
    }
};
export const resetPassword = async (token, newPassword) => {
    try {
        const response = await api.post("/auth/reset-password", { token, newPassword });
        return response;
    } catch (error) {
        throw new Error(error || "Lỗi api reset mật khẩu");
    }
};