import api from './apis';


export const getMyLearningPath = async (pathId) => {
    try {
        const response = await api.get(`/learning-paths`);
        return response.data;
    } catch (error) {
        console.error('Error fetching learning path:', error);
        throw error;
    }
}

export const createLearningPath = async (pathData) => {
    try {
        const title = pathData.title;
        const description = pathData.description;
        const startDate = pathData.startDate;
        const endDate = pathData.endDate;
        const response = await api.post('/learning-paths', {
            title,
            description,
            startDate,
            endDate
        });
        return response.data;
    } catch (error) {
        console.error('Lỗi tạo lộ trình học:', error);
        throw error;
    }
}

export const updateLearningPath = async (pathId, pathData) => {
    try {
        const title = pathData.title;
        const description = pathData.description;
        const startDate = pathData.startDate;
        const endDate = pathData.endDate;
        const response = await api.put(`/learning-paths/${pathId}`, {
            title,
            description,
            startDate,
            endDate
        });
        return response.data;
    } catch (error) {
        console.error('Lỗi cập nhật lộ trình học:', error);
        throw error;
    }
}


export const deleteLearningPath = async (pathId) => {
    try {
        const response = await api.delete(`/learning-paths/${pathId}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi xóa lộ trình học:', error);
        throw error;
    }
}
