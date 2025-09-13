import api from "./apis.js";

export const enrollClass = async (classId) => {
    try {
        const res = await api.post("/enrollments", {
            "classId": classId
        });
        return res.data;
    } catch (err) {
        console.error("Lỗi ghi danh:", err);
        console.log("Mã lớp học từ URL:", classId);
        throw err;
    }
};

export const getMyEnrollments = async () => {
    try {
        const res = await api.get("/enrollments/me");
        return res.data;
    } catch (err) {
        console.error("Lỗi lấy danh sách lớp học:", err);
        throw err;
    }
};

export const getAllEnrollments = async () => {
    try {
        const res = await api.get("/enrollments");
        return res.data;
    } catch (err) {
        console.error("Lỗi lấy danh sách tham gia lớp:", err);
        throw err;
    }
};

export const updateEnrollStatus = async (id, status) => {
    try {
        const res = await api.patch(`/enrollments/${id}`, { status });
        return res.data;
    } catch (err) {
        console.error("Lỗi cập nhật trạng thái tham gia lớp:", err);
        throw err;
    }
};

export const getStudents = async (id) => {
    try {
        const res = await api.get(`/enrollments/${id}/students`);
        return res.data;
    } catch (err) {
        console.error("Lỗi lấy dữ liệu học viên:", err);
        throw err;
    }
};

