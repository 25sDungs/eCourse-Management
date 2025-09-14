import api from "./apis";

export const getClassRevenue = async () => {
    try {
        const res = await api.get("/enrollments/revenue/classes");
        // ép về mảng để vẽ biểu đồ
        const raw = res.data.result;
        const formatted = Array.isArray(raw)
            ? raw
            : Object.entries(raw).map(([name, revenue]) => ({
                name,
                revenue,
            }));

        return formatted;
    } catch (err) {
        console.error("Lỗi khi lấy revenue lớp học class:", err);
        throw err;
    }
};

export const getCourseRevenue = async () => {
    try {
        const res = await api.get("/enrollments/revenue/courses");
        const raw = res.data.result;
        const formatted = Array.isArray(raw)
            ? raw
            : Object.entries(raw).map(([name, revenue]) => ({
                name,
                revenue,
            }));

        return formatted;
    } catch (err) {
        console.error("Lỗi khi lấy revenue lớp học class:", err);
        throw err;
    }
};

export const getRevenueClassById = async (id) => {
    try {
        const res = await api.get(`/enrollments/revenue/classes/${id}`);
        const raw = res.data.result;
        const formatted = Array.isArray(raw)
            ? raw
            : Object.entries(raw).map(([name, revenue]) => ({
                name,
                revenue,
            }));

        return formatted;
    } catch (err) {
        console.error(`Lỗi khi lấy doanh thu lớp học class ${id}:`, err);
        throw err;
    }
};
