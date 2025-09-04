import { useEffect, useState } from "react";
import { getMyEnrollments } from "../../services/enrollClassService";
import { Link } from "react-router-dom";
import { randomGradient } from "../../utils/randomColor";
function MyCoursesPage() {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getEnrollmentsData = async () => {
            try {
                const data = await getMyEnrollments();
                setEnrollments(data || []);
            } catch (err) {
                console.error("Lỗi khi lấy danh sách lớp học:", err);
            } finally {
                setLoading(false);
            }
        };
        getEnrollmentsData();
    }, []);

    if (loading) {
        return <div className="p-6 text-center">Đang tải khóa học...</div>;
    }

    if (!localStorage.getItem("token")) {
        return (
            <div className="p-6 text-center">
                <Link
                    to="/login"
                    className="mt-6 inline-block bg-green-600 text-white px-6 py-2 rounded-lg"
                >
                    Đăng nhập để xem các khóa học
                </Link>
            </div>
        );
    } else if (enrollments.length === 0) {
        return (
            <div className="p-6 text-center">
                <p>Bạn chưa tham gia khóa học nào.</p>
                <Link
                    to="/courses"
                    className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    Xem khóa học
                </Link>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Khóa học của tôi</h1>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {enrollments.map((enrollment) => (
                    <div
                        key={enrollment.classId}
                        className="bg-white shadow rounded-xl overflow-hidden hover:shadow-xl transition"
                    >
                        {/* Banner */}
                        <div
                            className={`w-full h-32 flex items-center justify-center text-white text-lg font-semibold bg-gradient-to-r ${randomGradient()}`}
                        >
                        </div>

                        {/* Nội dung */}
                        <div className="p-4">
                            <h2 className="font-semibold text-lg text-gray-800">
                                {enrollment.className}
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Ngày tham gia: {enrollment.enrollTime}
                            </p>

                            <p
                                className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full 
                  ${enrollment.status === "APPROVED"
                                        ? "bg-green-100 text-green-700"
                                        : enrollment.status === "PENDING"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {enrollment.status}
                            </p>

                            <div className="mt-4">
                                {enrollment.status === "APPROVED" && (
                                    <Link
                                        to={`/courses/${enrollment.courseId}/classes/${enrollment.classId}`}
                                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Vào lớp học →
                                    </Link>
                                )}

                                {enrollment.status === "COMPLETED" && (
                                    <Link
                                        to={`/courses/${enrollment.courseId}/classes/${enrollment.classId}`}
                                        className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                                    >
                                        Xem lại lớp học
                                    </Link>
                                )}
                                {enrollment.status === "PENDING" && (
                                    <span className="inline-block bg-gray-200 text-gray-600 px-4 py-2 rounded-lg cursor-not-allowed">
                                        Đang chờ duyệt
                                    </span>
                                )}

                                {enrollment.status === "REJECTED" && (
                                    <span className="inline-block bg-red-200 text-red-700 px-4 py-2 rounded-lg">
                                        Không thể tham gia
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {enrollments.length === 0 && (
                    <p className="text-gray-600">Bạn chưa tham gia lớp học nào.</p>
                )}
            </div>
        </div>
    );
}

export default MyCoursesPage;