import api from "./apis.js";


export const getAllCourses = async () => {
    try {
        const response = await api.get("/courses");
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách khóa học:", error);
        throw error;
    }
};

export const getCourseById = async (id) => {
    try {
        const response = await api.get(`/courses/${id}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy chi tiết khóa học:", error);
        throw error;
    }
};

