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

    if (enrollments.length === 0) {
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

            <div className="grid md:grid-cols-3 gap-6">
                {enrollments.map((enrollment) => (
                    <div
                        key={enrollment.classId}
                        className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
                    >
                        <div
                            className={`w-full h-40 flex items-center justify-center text-white text-2xl font-bold bg-gradient-to-t ${randomGradient()}`}
                        />
                        <div className="p-4">
                            <h2 className="font-semibold text-lg mb-2">
                                {enrollment.className}
                            </h2>
                            <p className="text-sm text-gray-600 line-clamp-2">
                                {enrollment.enrollTime}
                            </p>
                            <p className="text-sm text-gray-600 line-clamp-2">
                                {enrollment.status}
                            </p>
                            <Link
                                to={`/courses/${enrollment.courseId}/classes/${enrollment.classId}`}
                                className="mt-3 inline-block text-blue-600 hover:underline"
                            >
                                Vào lớp học →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default MyCoursesPage;