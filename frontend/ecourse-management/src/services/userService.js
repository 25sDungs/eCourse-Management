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

export const updateUserInfo = async (id, form, avatar) => {
    const formData = new FormData();
    if (form.firstName) formData.append("firstName", form.firstName);
    if (form.lastName) formData.append("lastName", form.lastName);
    if (form.dob) formData.append("dob", form.dob);
    if (form.password) formData.append("password", form.password);
    if (form.email) formData.append("email", form.email);
    if (avatar) formData.append("avatar", avatar);

    const res = await api.patch(`/users/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};

export const changePassword = async (id, newPassword) => {
    try {
        const res = await api.patch(`/users/${id}`, {
            password: newPassword
        }, {
            headers: {
                "Content-Type": "multipart/form-data",
            },

        });
        return res.data;
    }
    catch (error) { }
};

export const deleteUser = async (id) => {
    try {
        const response = await api.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Xóa user thất bại");
    }
};

export const getUsers = async (page = 0, size = 10) => {
    const res = await api.get("/users", { params: { page, size } });
    return res.data;
};

export const updateRole = async (id, roleName) => {
    try {
        const response = await api.put(`/users/${id}/roles`, { roleName });
        return response.data;
    } catch (error) {
        throw new Error(error || "Lỗi cập nhật role");
    }
};

export const getUserById = async (id) => {
    const res = await api.get(`/users/${id}`);
    return res.data;
};