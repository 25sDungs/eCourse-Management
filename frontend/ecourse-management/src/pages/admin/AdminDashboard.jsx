import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import AdminHeader from "../../components/AdminHeader.jsx"
import Card from "../../components/Card.jsx";
import { useEffect } from "react";
import { getUsers } from "../../services/userService.js";
import { getAllCourses } from "../../services/courseService.js";
import { getClassRevenue, getCourseRevenue, getRevenueClassById } from "../../services/revenue.js";


const AdminDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [totalUsers, setTotalUsers] = useState([]);
    const [courses, setCourses] = useState([]);

    const [activeTab, setActiveTab] = useState("courses");
    const [chartData, setChartData] = useState([]);
    const [courseRevenue, setCourseRevenue] = useState([]);
    const [classRevenue, setClassRevenue] = useState([]);

    function sumClasses(courses) {
        let total = 0;
        courses.forEach(course => {
            if (course.classes) {
                total += course.classes.length;
            }
        });
        return total;
    }

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
        if (activeTab === "courses") {
            setChartData(courseRevenue);
        } else {
            setChartData(classRevenue);
        }
    }, [activeTab]);

    const fetchRevenue = async () => {
        try {
            const coursedata = await getCourseRevenue();
            setCourseRevenue(coursedata || []);
            setChartData(coursedata);
            const classdata = await getClassRevenue();
            setClassRevenue(classdata || []);
        } catch (err) {
            console.error("Lỗi khi lấy revenue:", err);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchCourses();
        fetchRevenue();
    }, []);


    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex-1 flex flex-col">
                <AdminHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className="p-6 overflow-auto">
                    <div className="flex gap-6 flex-wrap">
                        <Card title="Users" value={totalUsers} />
                        <Card title="Courses" value={courses.length} />
                        <Card title="Classes" value={sumClasses(courses)} />
                    </div>
                    <div className="bg-white shadow rounded-xl p-6 mt-6">

                        <h2 className="text-2xl font-semibold text-gray-800">
                            📊 Doanh thu theo {activeTab === "courses" ? "Khoá học" : "Lớp học"}
                        </h2>

                        <div className="flex space-x-2">
                            <button
                                onClick={() => setActiveTab("courses")}
                                className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === "courses"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                            >
                                Khoá học
                            </button>
                            <button
                                onClick={() => setActiveTab("classes")}
                                className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === "classes"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                            >
                                Lớp học
                            </button>
                        </div>
                        <div className="w-full h-96">
                            <ResponsiveContainer>
                                <BarChart data={chartData} barSize={40}>
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                                    <XAxis dataKey="name" tick={{ fontSize: 13, fill: "#374151" }} />
                                    <YAxis
                                        tick={{ fontSize: 13, fill: "#374151" }}
                                        tickFormatter={(value) =>
                                            value.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
                                        }
                                        label={{
                                            value: "VNĐ",
                                            angle: -90,
                                            position: "insideLeft",
                                            offset: 60,
                                            style: { textAnchor: "middle", fill: "#374151", fontSize: 14, fontWeight: 500 },
                                        }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "white",
                                            borderRadius: "0.75rem",
                                            border: "1px solid #e5e7eb",
                                        }}
                                        formatter={(value) =>
                                            value.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
                                        }
                                    />
                                    <Bar dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
