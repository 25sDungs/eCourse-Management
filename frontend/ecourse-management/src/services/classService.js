import api from "./apis";

export const getClassById = async (courseId, classId) => {
    try {
        const response = await api.get(`/courses/${courseId}/classes/${classId}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu lớp học:", error);
        throw error;
    }
};

export const getTeacherClass = async (courseId = 0, teacherId) => {
    try {
        const response = await api.get(`/courses/${courseId}/classes/teacher/${teacherId}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu lớp học:", error);
        throw error;
    }
};


export const deleteClass = async (courseId, classId) => {
    try {
        const response = await api.delete(`/courses/${courseId}/classes/${classId}`);
        return response.data;
    } catch (error) { }
};

export const createClass = async (courseId, { name, description, cost, startDate, endDate, teacherId }) => {
    try {
        const response = await api.post(`/courses/${courseId}/classes`, { name, description, cost, startDate, endDate, teacherId });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi tạo lớp học mới:", error);
        throw error;
    }
};

export const updateClass = async (courseId, classId, { name, description, cost, startDate, endDate, teacherId }) => {
    try {
        const response = await api.put(`/courses/${courseId}/classes/${classId}`, { name, description, cost, startDate, endDate, teacherId });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật lớp học mới:", error);
        throw error;
    }
};