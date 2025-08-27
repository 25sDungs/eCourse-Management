import api from "./apis";


export const getClassContents = async (courseId, classId) => {
    try {
        const response = await api.get(`/courses/${courseId}/classes/${classId}/contents`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy nội dung lớp học: ", error);
        throw error;
    }
};

export const getClassAssignments = async (courseId, classId) => {
    try {
        const response = await api.get(`/courses/${courseId}/classes/${classId}/assignments`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy bài tập:", error);
        throw error;
    }
};

export const getClassById = async (courseId, classId) => {
    try {
        const response = await api.get(`/courses/${courseId}/classes/${classId}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu lớp học:", error);
        throw error;
    }
};