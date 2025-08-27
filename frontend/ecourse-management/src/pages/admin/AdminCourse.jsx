import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp, FaPlus, FaEdit, FaTrash, FaBook } from "react-icons/fa";
import { getAllCourses } from "../../services/courseService";


function AdminCoursesPage() {
    const [courses, setCourses] = useState([]);
    const [openCourseId, setOpenCourseId] = useState(null);

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

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <FaBook className="text-blue-600" /> Course Management
                </h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow hover:bg-blue-700">
                    <FaPlus /> Add Course
                </button>
            </div>

            {/* Danh sách khóa học */}
            <div className="grid gap-6">
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className="bg-white shadow rounded-xl p-4 border"
                    >
                        <div className="flex justify-between items-center mb-3">
                            <div>
                                <h2 className="text-xl font-semibold">{course.courseName}</h2>
                                <p className="text-gray-600">{course.description}</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600">
                                    <FaEdit />
                                </button>
                                <button className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">
                                    <FaTrash />
                                </button>
                                <button
                                    onClick={() => setOpenCourseId(openCourseId === course.id ? null : course.id)}
                                    className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
                                >
                                    {openCourseId === course.id ? <FaChevronUp /> : <FaChevronDown />}
                                </button>
                            </div>
                        </div>

                        {openCourseId === course.id && (
                            <div className="mt-4 space-y-3">
                                {course.classes.map((cls) => (
                                    <div
                                        key={cls.id}
                                        className="border rounded-lg p-3 flex justify-between items-center hover:bg-gray-50"
                                    >
                                        <div>
                                            <h4 className="font-medium">{cls.name}</h4>
                                            <p className="text-sm text-gray-500">{cls.description}</p>
                                            <p className="text-sm">
                                                Cost: <span className="font-semibold">${cls.cost}</span>
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                                                <FaEdit />
                                            </button>
                                            <button className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {/* Add class */}
                                <button className="w-full mt-2 px-3 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600">
                                    <FaPlus /> Add Class
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

        </div>
    );
}

export default AdminCoursesPage;
