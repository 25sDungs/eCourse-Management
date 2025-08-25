import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { enrollClass } from "../../services/enrollClassService";

function PaymentCallbackPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const enrollAfterPayment = async () => {
        const classId = searchParams.get("classId");
        const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
        if (vnp_ResponseCode === "00" && classId && loading) {
            try {
                await enrollClass(classId);
                navigate("/my-courses");
            }
            catch (err) {
                console.error("Ghi danh lớp học thất bại:", err);
                navigate("/courses");
                return;
            } finally {
                setLoading(false);
            }
        } else {
            alert("Thanh toán thất bại hoặc bị hủy!");
            setLoading(false);
            navigate("/");
        }
    };

    useEffect(() => {
        if (!loading) return;
        enrollAfterPayment();
    }, []);

    return <div>Đang xử lý thanh toán...</div>;
}

export default PaymentCallbackPage;