import api from "./apis.js";

export const payment = async (classId, cost, returnUrl) => {
    try {
        const res = await api.post("/payments/create", {
            "courseClassId": classId,
            "amount": cost,
            "returnUrl": returnUrl,
        });
        window.location.href = res.data.paymentUrl;
    } catch (err) {
        console.error("Thanh toán thất bại:", err);
        alert("Không thể khởi tạo thanh toán");
    }
};