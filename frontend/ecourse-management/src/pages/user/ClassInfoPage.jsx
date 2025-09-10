import { useEffect, useState } from "react";
import { getClassById } from "../../services/classService";
import { useParams, useNavigate } from "react-router-dom";
import { FaBook, FaCalendarAlt, FaUserTie, FaMoneyBillWave } from "react-icons/fa";
import { getUserById } from "../../services/userService";
import { payment } from "../../services/paymentService";
import PrevButton from "../../components/PrevButton";

function ClassInfoPage() {
    const navigate = useNavigate();
    const { courseId, classId } = useParams();
    const [loading, setLoading] = useState(false);

    const [classData, setClassData] = useState(null);
    const [teacherData, setTeacherData] = useState(null);

    const handlePayment = async (classId, cost) => {
        if (!localStorage.getItem("token")) {
            alert("Bạn hãy đăng nhập để có thể tham gia lớp học, bạn nhé!");
            return;
        }
        try {
            const returnUrl = `${window.location.origin}/payment-callback?classId=${classId}`;
            await payment(classId, cost, returnUrl);
        } catch (err) {
            console.error("Thanh toán lỗi:", err);
        }
    };
    const getClassInfo = async () => {
        setLoading(true);
        try {
            const data = await getClassById(courseId, classId);
            const result = data.result;
            setClassData(result);

            const teacherResData = await getUserById(result.teacherId);
            setTeacherData(teacherResData);

        } catch (err) {
            console.error("Lỗi khi lấy thông tin lớp học:", err);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getClassInfo();
    }, [classId]);

    if (!classData) {
        return (
            <div className="flex justify-center items-center h-40">
                <p>Đang tải dữ liệu...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2 mb-4">
                    <FaBook className="text-blue-500" /> {classData.name}
                </h1>

                <p className="text-gray-600 mb-6">{classData.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="flex items-center gap-3 p-4 border rounded-xl bg-gray-50">
                        <FaMoneyBillWave className="text-green-500 text-xl" />
                        <div>
                            <p className="text-sm text-gray-500">Học phí</p>
                            <p className="text-xl font-semibold text-green-600">
                                {classData.cost.toLocaleString()} VNĐ
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 border rounded-xl bg-gray-50">
                        <FaUserTie className="text-purple-500 text-xl" />
                        <div>
                            <p className="text-sm text-gray-500">Giáo viên</p>
                            <p className="text-lg font-medium">
                                {classData.teacherId && teacherData
                                    ? teacherData.firstName + " " + teacherData.lastName
                                    : "Chưa có"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 border rounded-xl bg-gray-50">
                        <FaCalendarAlt className="text-blue-500 text-xl" />
                        <div>
                            <p className="text-sm text-gray-500">Ngày bắt đầu</p>
                            <p className="text-lg font-medium">{classData.startDate}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 border rounded-xl bg-gray-50">
                        <FaCalendarAlt className="text-red-500 text-xl" />
                        <div>
                            <p className="text-sm text-gray-500">Ngày kết thúc</p>
                            <p className="text-lg font-medium">{classData.endDate}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-between">
                    <PrevButton className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 shadow-md" />
                    {new Date() > new Date(classData.endDate) ? (
                        <p className="mt-4 text-red-600 font-medium">
                            Lớp học đã kết thúc!
                        </p>
                    ) : (
                        <button onClick={() => handlePayment(classId, classData.cost)}
                            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md">
                            🚀 Đăng ký ngay
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClassInfoPage;