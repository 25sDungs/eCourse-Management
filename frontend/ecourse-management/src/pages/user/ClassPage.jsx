import { useState } from "react";





function ClassPage() {
    const [activeTopic, setActiveTopic] = useState(null);
    const [classContent, setClassContent] = useState([]);
    const [classFiles, setClassFiles] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [exams, setExams] = useState([]);

    // dữ liệu (để tạm)
    const classInfo = {
        title: "Lập trình ReactJS cơ bản",
        description: "Khóa học giúp bạn làm quen với ReactJS từ cơ bản đến nâng cao.",
        teacher: "Nguyễn Văn A",
    };

    const topics = [
        {
            id: 1,
            title: "Giới thiệu khóa học",
            contents: ["Làm quen giảng viên", "Cách học hiệu quả", "Cài đặt môi trường"],
        },
        {
            id: 2,
            title: "ReactJS Cơ bản",
            contents: ["JSX là gì?", "Component & Props", "State và Lifecycle"],
        },
        {
            id: 3,
            title: "React Nâng cao",
            contents: ["Hooks cơ bản", "Context API", "Custom Hooks"],
        },
    ];

    const toggleTopic = (id) => {
        setActiveTopic(activeTopic === id ? null : id);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Header thông tin lớp */}
            <div className="bg-white shadow rounded-xl p-6 mb-6">
                <h1 className="text-2xl font-bold text-gray-800">{classInfo.title}</h1>
                <p className="text-gray-600 mt-2">{classInfo.description}</p>
                <p className="mt-2 text-sm text-gray-500">Giảng viên: {classInfo.teacher}</p>
            </div>

            {/* Danh sách chủ đề */}
            <div className="space-y-4">
                {topics.map((topic) => (
                    <div
                        key={topic.id}
                        className="bg-white shadow rounded-xl overflow-hidden"
                    >
                        <button
                            onClick={() => toggleTopic(topic.id)}
                            className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-medium text-gray-700 hover:bg-gray-50"
                        >
                            {topic.title}
                            <span>{activeTopic === topic.id ? "−" : "+"}</span>
                        </button>
                        {activeTopic === topic.id && (
                            <ul className="px-6 pb-4 space-y-2">
                                {topic.contents.map((content, index) => (
                                    <li
                                        key={index}
                                        className="text-gray-600 border-l-4 border-blue-500 pl-3"
                                    >
                                        {content}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClassPage;