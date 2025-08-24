import api from "./apis";

export const getUsers = async (page = 0, size = 10) => {
    const res = await api.get("/users", { params: { page, size } });
    return res.data;
};