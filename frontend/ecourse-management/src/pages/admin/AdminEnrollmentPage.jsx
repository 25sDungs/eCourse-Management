import { useEffect, useState } from "react";

import AdminHeader from "../../components/AdminHeader.jsx";
import { getAllEnrollments, updateEnrollStatus } from "../../services/enrollClassService.js";


function EnrollmentManagement() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [enrollments, setEnrollments] = useState([]);

    useEffect(() => {
        fetchEnrollments();
    }, []);

    const fetchEnrollments = async () => {
        try {
            const data = await getAllEnrollments();
            setEnrollments(data || []);
        } catch (err) {
            console.error("Lỗi khi gội get all enrollments:", err);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateEnrollStatus(id, newStatus);
            setEnrollments((prev) =>
                prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
            );
        } catch (err) {
            console.error("Lỗi khi gọi api cập nhật status:", err);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="bg-white flex-1 flex flex-col">
                <AdminHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <h1 className="p-6 flex justify-between items-center text-2xl font-bold mb-6 text-gray-800">
                    Quản lý Enrollments
                </h1>

                <main className="p-6 overflow-auto">
                    <div className="overflow-x-auto bg-white shadow rounded-lg">
                        <table className="min-w-full text-sm text-left text-gray-700">
                            <thead className="bg-gray-100 text-gray-900">
                                <tr>
                                    <th className="px-4 py-3">ID</th>
                                    <th className="px-4 py-3">ID Học viên</th>
                                    <th className="px-4 py-3">Tên Lớp</th>
                                    <th className="px-4 py-3">Ngày đăng ký</th>
                                    <th className="px-4 py-3">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {enrollments.map((en) => (
                                    <tr
                                        key={en.id}
                                        className="border-t hover:bg-gray-50 transition"
                                    >
                                        <td className="px-4 py-3">{en.id}</td>
                                        <td className="px-4 py-3">{en.studentId}</td>
                                        <td className="px-4 py-3">{en.className}</td>
                                        <td className="px-4 py-3">{en.enrollTime}</td>
                                        <td className="px-4 py-3">
                                            <select
                                                value={en.status}
                                                onChange={(e) =>
                                                    handleStatusChange(en.id, e.target.value)
                                                }
                                                className="border rounded-lg px-3 py-1 bg-white focus:ring focus:ring-blue-300"
                                            >
                                                <option value="PENDING">PENDING</option>
                                                <option value="APPROVED">APPROVED</option>
                                                <option value="COMPLETED">COMPLETED</option>
                                                <option value="REJECTED">REJECTED</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default EnrollmentManagement;
