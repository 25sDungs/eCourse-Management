import api from "./apis"


export const getSubmissionsByAssignmentId = async (assignmentId) => {
    try {
        const response = await api.get(`/courses/0/classes/0/assignments/${assignmentId}/submissions`);
        return response.data;
    }
    catch (err) {
        console.log("Lỗi khi lấy dữ liệu bài nộp: ", err);
        throw err;
    }
}

export const updateSubmission = async (assignmentId, submissionId, { score, judge }) => {
    try {
        const response = await api.put(`/courses/0/classes/0/assignments/${assignmentId}/submissions/${submissionId}`,
            { score, judge }
        );
        return response.data;
    }
    catch (err) {
        console.log("Lỗi khi cập nhật bài nộp: ", err);
        throw err;
    }
}

export const submitSubmission = async (assignmentId, formData) => {
    try {
        const response = await api.post(`/courses/0/classes/0/assignments/${assignmentId}/submissions`, formData);
        return response.data;
    } catch (err) {
        console.log("submit error: " + err);
        throw err;
    }
}

export const getDownloadSubmission = async (submissionId) => {
    try {
        const response = api.get(`/courses/0/classes/0/assignments/0/submissions/${submissionId}/download`,
            {
                responseType: "blob",
            });
        return response;
    } catch (error) {
        throw new Error(error.response.data.message || "Download submission error!");
    }
}

export const getMySubmission = async (assignmentId) => {
    try {
        const response = await api.get(`/courses/0/classes/0/assignments/${assignmentId}/submissions/me`);
        return response.data;
    } catch (err) {
        console.log("submit error: " + err);
        throw err;
    }
}