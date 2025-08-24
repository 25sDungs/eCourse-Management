import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCourses } from "../../services/courseService";


function CoursesPage() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchCourses = async () => {
        try {
            const data = await getAllCourses();
            setCourses(data.result);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchCourses();
    }, []);

    if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

    return (
        <div className="mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Danh sách khóa học</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {courses.map(course => (
                    <div key={course.id} className="bg-white border rounded-lg shadow p-4 flex flex-col">
                        <h2 className="text-xl font-semibold mb-2">{course.courseName}</h2>
                        <p className="text-gray-600 mb-4 flex-1">{course.description}</p>
                        <Link
                            to={`/courses/${course.id}`}
                            className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center"
                        >
                            Xem các lớp học
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CoursesPage;