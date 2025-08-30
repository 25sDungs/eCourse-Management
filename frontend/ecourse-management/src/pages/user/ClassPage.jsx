import { useEffect, useState } from "react";
import { getClassById } from "../../services/classService";
import { getClassAssignments, getClassContents } from "../../services/classContentService"
import { getMyEnrollments } from "../../services/enrollClassService";
import { useParams, Link } from "react-router-dom";
import { FaBook } from "react-icons/fa";

function ClassPage() {
    const { courseId, classId } = useParams();
    const [activeTopic, setActiveTopic] = useState(null);
    const [classInfo, setClassInfo] = useState({});
    const [classContent, setClassContent] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [classFiles, setClassFiles] = useState([]);
    const [exams, setExams] = useState([]);

    const [enrollments, setEnrollments] = useState([]);

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

    const fetchAllClassContents = async () => {
        try {
            const data = await getClassContents(courseId, classId);
            setClassContent(data);
        } catch (err) {
            console.error("Lỗi khi lấy danh sách khóa học:", err);
        }
    };

    const fetchAssignments = async () => {
        try {
            const data = await getClassAssignments(courseId, classId);
            setAssignments(data);
        } catch (err) {
            console.error("Lỗi khi lấy danh sách khóa học:", err);
        }
    };

    const getClassInfo = async () => {
        try {
            const data = await getClassById(courseId, classId);
            setClassInfo(data.result);
        } catch (err) {
            console.error("Lỗi khi lấy thông tin khóa học:", err);
        }
    };


    useEffect(() => {
        fetchAssignments();
        fetchAllClassContents();
        getClassInfo();
        getEnrollmentsData();
    }, [classId]);


    const toggleTopic = (id) => {
        setActiveTopic(activeTopic === id ? null : id);
    };

    return (
        <div className="flex max-w-7xl mx-auto p-6 gap-6">
            <aside className="w-64 h-screen bg-gray-50 border-r border-gray-200 flex flex-col">
                {/* Header */}
                <div className="p-5 border-b border-gray-200">
                    <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                        <FaBook className="text-blue-500" />
                        Các lớp học
                    </h2>
                </div>

                {/* Content */}
                <nav className="flex-1 overflow-y-auto px-3 py-4">
                    <ul className="space-y-1">
                        {enrollments?.length > 0 ? (
                            enrollments.map((enrollment) => {
                                const isActive = String(enrollment.classId) === String(classId);
                                return (
                                    <li key={enrollment.id}>
                                        <Link
                                            to={`/courses/${enrollment.courseId}/classes/${enrollment.classId}`}
                                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                                            ${isActive
                                                    ? "bg-blue-500 text-white shadow-sm"
                                                    : "text-gray-700 hover:bg-gray-100"
                                                }`}
                                        >
                                            <FaBook
                                                className={`text-xs ${isActive ? "text-white" : "text-gray-400"}`}
                                            />
                                            <span className="truncate">{enrollment.className}</span>
                                        </Link>
                                    </li>
                                );
                            })
                        ) : (
                            <li className="text-sm text-gray-500 px-4 py-2">
                                Không có lớp học nào
                            </li>
                        )}
                    </ul>
                </nav>
            </aside>

            <main className="flex-1 space-y-6">
                <div className="bg-white shadow rounded-xl p-6">
                    <h1 className="text-2xl font-bold text-gray-800">{classInfo.name}</h1>
                    <p className="text-gray-600 mt-2">{classInfo.description}</p>
                </div>


                <div className="bg-white shadow rounded-xl">
                    <button
                        onClick={() => toggleTopic("content")}
                        className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-semibold text-gray-700 hover:bg-gray-50"
                    >
                        Nội dung lớp
                        <span>{activeTopic === "content" ? "−" : "+"}</span>
                    </button>
                    {activeTopic === "content" && (
                        <div className="px-6 pb-4 space-y-4">
                            {classContent.length > 0 ? (classContent.map((c) => (
                                <div
                                    key={c.id}
                                    className="border-l-4 border-blue-500 pl-3 text-gray-700"
                                >
                                    <h3 className="font-medium">{c.title}</h3>
                                    <p className="text-sm text-gray-600">{c.content}</p>
                                </div>)))
                                :
                                (
                                    <p className="text-gray-500">Lớp hiện tại chưa có nội dung nào.</p>
                                )}
                        </div>
                    )}
                </div>


                <div className="bg-white shadow rounded-xl">
                    <button
                        onClick={() => toggleTopic("assignments")}
                        className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-semibold text-gray-700 hover:bg-gray-50"
                    >
                        Bài tập
                        <span>{activeTopic === "assignments" ? "−" : "+"}</span>
                    </button>
                    {activeTopic === "assignments" && (
                        <div className="px-6 pb-4 space-y-4">
                            {assignments.length > 0 ? (
                                assignments.map((a) => (
                                    <div
                                        key={a.id}
                                        className="p-4 border rounded-lg hover:shadow transition"
                                    >
                                        <h3 className="font-medium text-gray-800">{a.title}</h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {a.description}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-2">
                                            Hạn nộp:{" "}
                                            {a.dueDate
                                                ? new Date(a.dueDate).toLocaleDateString()
                                                : "Chưa có"}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">Chưa có bài tập nào.</p>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default ClassPage;