import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourseById } from "../../services/courseService";
import { payment } from "../../services/paymentService";
import { Link } from "react-router-dom";


function CourseDetailPage() {
    const { id } = useParams();
    const [courseClasses, setCourseClasses] = useState([]);
    const [courseName, setCourseName] = useState(null);

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

    const fetchCourseById = async () => {
        try {
            const data = await getCourseById(id);
            setCourseClasses(data.result.classes);
            setCourseName(data.result.courseName)
        } catch (error) {
            console.error(error);
        } finally {
        }
    };
    useEffect(() => {
        fetchCourseById();
    }, [id]);

    return (
        <div className="grid mt-1 ml-1 mr-1 gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {courseClasses.map((courseclass) => (
                <div
                    key={courseclass.id}
                    className="bg-white border border-gray-200 rounded-lg shadow-md p-6 flex flex-col hover:shadow-xl transition-shadow duration-300"
                >
                    <h2 className="text-2xl font-bold mb-2">{courseclass.name}</h2>
                    <div className="flex justify-between mb-2">
                        <p className="text-gray-800 font-semibold">Giá Khóa Học:</p>
                        <p className="text-gray-800 font-semibold">{new Intl.NumberFormat('vi-VN').format(courseclass.cost)} VND</p>
                    </div>
                    <div className="flex justify-between mb-2">
                        <p className="text-gray-800 font-semibold">Ngày bắt đầu: </p>
                        <p className="text-gray-600">{courseclass.startDate}</p>
                    </div>
                    <div className="flex justify-evenly">
                        <Link
                            to={`/courses/${id}/info/${courseclass.id}`}
                            className=" bg-green-400 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                        >
                            Xem chi tiết
                        </Link>
                        <button onClick={() => handlePayment(courseclass.id, courseclass.cost)}
                            className=" bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                            Tham Gia Lớp
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CourseDetailPage;