import React, { useState } from "react";
import AdminHeader from "../../components/AdminHeader.jsx"
import Card from "../../components/Card.jsx";
import { useEffect } from "react";
import { getUsers } from "../../services/userService.js";
import { getAllCourses } from "../../services/courseService.js";


const AdminDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [totalUsers, setTotalUsers] = useState([]);
    const [courses, setCourses] = useState([]);

    const fetchUsers = async () => {
        try {
            const data = await getUsers(0, 10);
            setTotalUsers(data.totalElements)
        } catch (error) {
            console.error("Lỗi khi tải danh sách user:", error);
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
        fetchUsers();
        fetchCourses();
    }, []);

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex-1 flex flex-col">
                <AdminHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className="p-6 overflow-auto">
                    <div className="flex gap-6 flex-wrap">
                        <Card title="Users" value={totalUsers} />
                        <Card title="Courses" value={courses.length} />
                    </div>
                    {/* Chart component */}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
