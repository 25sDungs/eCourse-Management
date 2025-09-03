import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp, FaPlus, FaEdit, FaTrash, FaBook } from "react-icons/fa";
import { getAllCourses, deleteCourse, updateCourse, createCourse } from "../../services/courseService";
import { deleteClass, updateClass, createClass } from "../../services/classService";


function AdminCoursesPage() {
    const [courses, setCourses] = useState([]);
    const [openCourseId, setOpenCourseId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [addingCourseId, setAddingCourseId] = useState(null);
    const [newClass, setNewClass] = useState({
        name: "",
        description: "",
        teacherId: null,
        cost: 0,
        startDate: "",
        endDate: "",
    });
    const [isAddingCourse, setIsAddingCourse] = useState(false);
    const [newCourse, setNewCourse] = useState({ courseName: "", description: "" });
    const [editingCourse, setEditingCourse] = useState(null);

    const [isAddingClass, setIsAddingClass] = useState(false);
    const [addingClassCourseId, setAddingClassCourseId] = useState(null);
    const [editingClass, setEditingClass] = useState(null);
    const [editingClassCourseId, setEditingClassCourseId] = useState(null);


    function updateEditClass(cls, courseId) {
        setEditingClassCourseId(courseId);
        setEditingClass(cls);
    }

    const handleAddClass = async (courseId, newClass) => {
        setLoading(true);
        try {
            console.log("Added class:", newClass);
            console.log("To course ID:", courseId);
            await createClass(courseId, newClass);
            fetchCourses();
            setAddingCourseId(null);
            setNewClass({
                name: "",
                description: "",
                teacherId: null,
                cost: 0,
                startDate: "",
                endDate: "",
            });
            setIsAddingClass(false);
        } catch (err) {
            console.error("Add Class failed:", err);
        }
        finally {
            setLoading(false);
        }

    }

    const handleAddCourse = async (course) => {
        setLoading(true);
        try {
            if (!course || !course.courseName || !course.description) {
                alert("Vui lòng điền đầy đủ thông tin khóa học.");
                setLoading(false);
                return;
            }
            await createCourse(course);
            fetchCourses();
            setIsAddingCourse(false);
        } catch (err) {
            console.error("Add Course failed:", err);
        }
        finally {
            setLoading(false);
        }

    }

    const handleDeleteCourse = async (courseId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa khóa học này?")) {
            try {
                await deleteCourse(courseId);
                setCourses(courses.filter((c) => c.id !== courseId));
                alert("Đã xóa course!");
            } catch (error) {
                alert("Xóa course thất bại!");
            }
        }
    };

    const handleEditCourse = async (course) => {
        setLoading(true);
        try {
            const id = course.id;
            const courseName = course.courseName;
            const description = course.description;
            await updateCourse(course.id, courseName, description);
            setCourses(courses.map(c => c.id === id ? { ...c, courseName, description } : c));
            setEditingCourse(null);
        } catch (err) {
            console.error("Update failed:", err);
        }
        finally {
            setLoading(false);
        }
    };

    const handleDeleteClass = async (courseId, classId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa lớp này?")) {
            try {
                await deleteClass(courseId, classId);
                fetchCourses();
                alert("Đã xóa class!");
            } catch (error) {
                alert("Xóa class thất bại!");
            }
        }
    };

    const handleEditClass = async (editingClass, courseId) => {
        setLoading(true);
        try {
            const classId = editingClass.id;
            const { name, description, cost, startDate, endDate, teacherId } = editingClass;

            await updateClass(courseId, classId, { name, description, cost, startDate, endDate, teacherId });
            setEditingClass(null);
            fetchCourses();
        } catch (err) {
            console.error("Update Class failed:", err);
        }
        finally {
            setLoading(false);
        }
    };

    const fetchCourses = async () => {
        try {
            const data = await getAllCourses();
            setCourses(data.result);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
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
                <button
                    onClick={() => setIsAddingCourse(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow hover:bg-blue-700"
                >
                    <FaPlus /> Add Course
                </button>
            </div>

            <div className="grid gap-6">
                {courses.map((course) => (
                    <div key={course.id} className="bg-white shadow rounded-xl p-4 border">
                        <div className="flex justify-between items-center mb-3">
                            <div>
                                <h2 className="text-xl font-semibold">{course.courseName}</h2>
                                <p className="text-gray-600">{course.description}</p>
                            </div>
                            <div className="flex gap-2 m-2">
                                <button
                                    onClick={() => setEditingCourse(course)}
                                    className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDeleteCourse(course.id)}
                                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">
                                    <FaTrash />
                                </button>
                                <button
                                    onClick={() =>
                                        setOpenCourseId(openCourseId === course.id ? null : course.id)
                                    }
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
                                            <h4 className="font-medium">{cls.name} - mã lớp: {cls.id}</h4>
                                            <p className="text-sm text-gray-500">{cls.description}</p>
                                            <p className="text-sm">
                                                Cost: <span className="font-semibold">
                                                    {new Intl.NumberFormat('vi-VN').format(cls.cost)} VND
                                                </span>
                                            </p>
                                            <p className="text-sm">
                                                Ngày khai giảng: {cls.startDate}
                                            </p>
                                            <p className="text-sm">
                                                Ngày kết thúc: {cls.endDate}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => updateEditClass(cls, course.id)}
                                                className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button onClick={() => handleDeleteClass(course.id, cls.id)}
                                                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <button
                                    onClick={() => {
                                        setIsAddingClass(true);
                                        setAddingClassCourseId(course.id);
                                    }}
                                    className="w-full mt-2 px-3 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600"
                                >
                                    <FaPlus /> Add Class
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>


            {/* Editing modal */}
            {editingCourse && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-3xl">
                        <h2 className="text-xl font-semibold mb-4">Edit Course</h2>
                        <input
                            type="text"
                            value={editingCourse.courseName}
                            onChange={(e) => setEditingCourse({ ...editingCourse, courseName: e.target.value })}
                            className="w-full border rounded-lg px-3 py-2 mb-3"
                        />
                        <textarea
                            rows={4}
                            value={editingCourse.description}
                            onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                            className="w-full border rounded-lg px-3 py-2 mb-3"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setEditingCourse(null)}
                                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleEditCourse(editingCourse)}
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {editingClass && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-3xl">
                        <h2 className="text-xl font-semibold mb-4">Edit Class</h2>
                        <input
                            type="text"
                            value={editingClass.name}
                            onChange={(e) => setEditingClass({ ...editingClass, name: e.target.value })}
                            className="w-full border rounded-lg px-3 py-2 mb-3"
                        />
                        <textarea
                            rows={4}
                            value={editingClass.description}
                            onChange={(e) => setEditingClass({ ...editingClass, description: e.target.value })}
                            className="w-full border rounded-lg px-3 py-2 mb-3"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Teacher ID:
                                </label>
                                <input
                                    type="text"
                                    value={editingClass.teacherId}
                                    onChange={(e) => setEditingClass({ ...editingClass, teacherId: e.target.value })}
                                    className="w-full border rounded-lg px-3 py-2 mb-3"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Cost:
                                </label>
                                <input
                                    type="number"
                                    value={editingClass.cost}
                                    onChange={(e) => setEditingClass({ ...editingClass, cost: Number(e.target.value) })}
                                    className="w-full border rounded-lg px-3 py-2 mb-3"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                <input
                                    type="date"
                                    value={editingClass.startDate?.slice(0, 10) || ""}
                                    onChange={(e) => setEditingClass({ ...editingClass, startDate: e.target.value })}
                                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                <input
                                    type="date"
                                    value={editingClass.endDate?.slice(0, 10) || ""}
                                    onChange={(e) => setEditingClass({ ...editingClass, endDate: e.target.value })}
                                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setEditingClass(null)}
                                className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleEditClass(editingClass, editingClassCourseId)}
                                className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Adding modal */}
            {isAddingCourse && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-3xl">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Course</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                value={newCourse.courseName}
                                onChange={(e) => setNewCourse({ ...newCourse, courseName: e.target.value })}
                                placeholder="Course Name"
                                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <textarea
                                rows={4}
                                value={newCourse.description}
                                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                                placeholder="Description"
                                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setIsAddingCourse(false)}
                                className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleAddCourse(newCourse)}
                                className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isAddingClass && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-3xl">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Class</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Class Name"
                                value={newClass.name}
                                onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <textarea
                                rows={4}
                                placeholder="Description"
                                value={newClass.description}
                                onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
                                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Teacher ID:</label>
                                    <input
                                        type="text"
                                        value={newClass.teacherId ? newClass.teacherId : ""}
                                        onChange={(e) => setNewClass({ ...newClass, teacherId: e.target.value })}
                                        className="w-full border rounded-lg px-3 py-2 mb-3"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cost:</label>
                                    <input
                                        type="number"
                                        value={newClass.cost}
                                        onChange={(e) => setNewClass({ ...newClass, cost: Number(e.target.value) })}
                                        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                    <input
                                        type="date"
                                        value={newClass.startDate}
                                        onChange={(e) => setNewClass({ ...newClass, startDate: e.target.value })}
                                        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                    <input
                                        type="date"
                                        value={newClass.endDate}
                                        onChange={(e) => setNewClass({ ...newClass, endDate: e.target.value })}
                                        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setIsAddingClass(false)}
                                className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleAddClass(addingClassCourseId, newClass)}
                                className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminCoursesPage;