import { useEffect, useState } from "react";
import { getTeacherClass } from "../../services/classService";
import { currentUserInfo } from "../../services/userService";
import { useParams, Link } from "react-router-dom";
import { randomGradient } from "../../utils/randomColor";



function TeacherClassDetail() {
    const { courseId } = useParams();
    const [user, setUser] = useState(null);
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    const getUserInfo = async () => {
        try {
            const data = await currentUserInfo();
            setUser(data.result);
        }
        catch (error) {
            console.error("Failed to fetch user info:", error);
        }
    };
    const getClassesData = async () => {
        try {
            const data = await getTeacherClass(courseId, user.id);
            setClasses(data || []);
        } catch (err) {
            console.error("Lỗi khi lấy danh sách lớp học:", err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getUserInfo();
    }, []);
    useEffect(() => {
        if (user) {
            getClassesData();
        }
    }, [user]);

    if (loading) {
        return <div className="p-6 text-center">Đang tải khóa học...</div>;
    }

    if (classes.length === 0) {
        return (
            <div className="p-6 text-center">
                <p>Không có khóa học nào.</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Các lớp học</h1>

            <div className="grid md:grid-cols-3 gap-6">
                {classes.map((c) => (
                    <div
                        key={c.id}
                        className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
                    >
                        <div
                            className={`w-full h-40 flex items-center justify-center text-white text-2xl font-bold bg-gradient-to-t ${randomGradient()}`}
                        />
                        <div className="p-4">
                            <h2 className="font-semibold text-lg mb-2">
                                {c.name}
                            </h2>
                            <Link
                                to={`/courses/${courseId}/classes/${c.id}`}
                                className="mt-3 inline-block text-blue-600 hover:underline"
                            >
                                Vào Lớp →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default TeacherClassDetail;