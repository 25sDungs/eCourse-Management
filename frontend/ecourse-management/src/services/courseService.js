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

export const deleteCourse = async (courseId) => {
    try {
        const response = await api.delete(`/courses/${courseId}`);
        return response.data;
    } catch (error) { }
};

export const createCourse = async ({ courseName, description }) => {
    try {
        const response = await api.post("/courses", { courseName, description });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi tạo khóa học:", error);
        throw error;
    }
};

export const updateCourse = async (courseId, courseName, description) => {
    try {
        const response = await api.put(`/courses/${courseId}`, { courseName, description });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật khóa học:", error);
        throw error;
    }
};
