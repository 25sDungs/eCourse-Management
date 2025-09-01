import api from "./apis";


export const getClassContents = async (courseId = 0, classId) => {
    try {
        const response = await api.get(`/courses/${0}/classes/${classId}/contents`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy nội dung lớp học: ", error);
        throw error;
    }
};

export const getClassAssignments = async (courseId = 0, classId) => {
    try {
        const response = await api.get(`/courses/${0}/classes/${classId}/assignments`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy bài tập:", error);
        throw error;
    }
};

export const createClassContents = async (courseId = 0, classId, { title, content }) => {
    try {
        const response = await api.post(`/courses/${0}/classes/${classId}/contents`,
            {
                title, content
            });
        return response.data;
    } catch (error) {
        console.error("Lỗi tạo nội dung: ", error);
        throw error;
    }
};

export const createAssignments = async (courseId = 0, classId, { title, description, startDate, dueDate }) => {
    try {
        const response = await api.post(`/courses/${0}/classes/${classId}/assignments`, {
            title,
            description,
            startDate,
            dueDate
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi tạo bài tập:", error);
        throw error;
    }
};

export const updateClassContents = async (courseId = 0, classId, contentId, { title, content }) => {
    try {
        const response = await api.patch(`/courses/${0}/classes/${classId}/contents/${contentId}`,
            {
                title, content
            });
        return response.data;
    } catch (error) {
        console.error("Lỗi chỉnh sửa nội dung: ", error);
        throw error;
    }
};

export const updateAssignments = async (courseId = 0, classId, assignmentId, { title, description, startDate, dueDate }) => {
    try {
        const response = await api.put(`/courses/${0}/classes/${classId}/assignments/${assignmentId}`, {
            title,
            description,
            startDate,
            dueDate
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi chỉnh sửa bài tập:", error);
        throw error;
    }
};

export const delClassContents = async (courseId = 0, classId, contentId) => {
    try {
        await api.delete(`/courses/${0}/classes/${classId}/contents/${contentId}`);
    } catch (error) {
        console.error("Lỗi chỉnh sửa nội dung: ", error);
        throw error;
    }
};

export const delAssignments = async (courseId = 0, classId, assignmentId) => {
    try {
        await api.delete(`/courses/${0}/classes/${classId}/assignments/${assignmentId}`);
    } catch (error) {
        console.error("Lỗi chỉnh sửa bài tập:", error);
        throw error;
    }
};