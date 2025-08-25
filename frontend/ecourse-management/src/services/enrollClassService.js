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
