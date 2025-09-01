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