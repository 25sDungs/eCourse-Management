import { useState,useEffect } from "react";
import { FaBookOpen, FaUsers, FaChalkboard } from "react-icons/fa";
import { getAllCourses } from "../../services/courseService";
import { Link } from "react-router-dom";

const TeacherCoursesPage = () => {
    const [search, setSearch] = useState("");
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCourses = async () => {
        try {
            const data = await getAllCourses();
            setCourses(data.result);
            
        console.log(data.result);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchCourses();
        console.log(courses);
    }, []);
    // const courses = [
    //     { id: 1, name: "Toán THPT Nâng Cao", classes: 3, students: 120, status: "Đang diễn ra" },
    //     { id: 2, name: "Ngữ Văn 11 - Học kỳ 1", classes: 2, students: 70, status: "Sắp khai giảng" },
    //     { id: 3, name: "Vật Lý 10 - Cơ học", classes: 1, students: 40, status: "Đã kết thúc" },
    // ];

    const filtered = courses.filter(c =>
        c.courseName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Các khóa học</h1>

            {/* Search */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Tìm kiếm khóa học..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/3 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            {/* Course Grid */}
            <div className="grid md:grid-cols-3 gap-6">
                {filtered.map((course) => (
                    <div key={course.id} className="bg-white shadow rounded-xl p-4 flex flex-col justify-between hover:shadow-lg transition">
                        <div>
                            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                <FaBookOpen className="text-blue-500" /> {course.courseName}
                            </h2>
                        </div>
                        <Link
                            to={`/teacher-classes/${course.id}`}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-center transition"
                        >
                            Xem các lớp học
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeacherCoursesPage;
