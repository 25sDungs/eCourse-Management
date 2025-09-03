import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../services/userService.js";
import AdminHeader from "../../components/AdminHeader.jsx";


const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [page, setPage] = useState(0);
    const [size] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const fetchUsers = async (pageNumber = 0) => {
        try {
            const data = await getUsers(pageNumber, size);
            setUsers(data.content);
            setTotalPages(data.totalPages);
            setPage(data.page);
        } catch (error) {
            console.error("Lỗi khi tải danh sách user:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
            try {
                await deleteUser(userId);
                setUsers(users.filter((u) => u.id !== userId));
                alert("Đã xóa user!");
            } catch (error) {
                alert("Xóa user thất bại!");
            }
        }
    };

    const filteredUsers = users.filter(
        (user) =>
            user.username.toLowerCase().includes(search.toLowerCase()) ||
            (user.firstName + " " + user.lastName).toLowerCase().includes(search.toLowerCase()) ||
            user.id.includes(search)
    );

    const handlePageChange = (newPage) => {
        fetchUsers(newPage);
    };


    return (
        <div className="flex h-screen bg-gray-100">
            <div className="bg-white flex-1 flex flex-col">
                <AdminHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <div className="p-6 flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
                    <div>
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="border rounded px-3 py-2 w-64"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto  rounded-xl shadow-md ml-1 mr-1">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Họ Tên</th>
                                <th className="px-6 py-3">Tên đăng nhập</th>
                                <th className="px-6 py-3">Dob</th>
                                <th className="px-6 py-3 text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="border-b hover:bg-gray-50">
                                        <td className="px-6 py-3">{user.id}</td>
                                        <td className="px-6 py-3">{user.firstName + " " + user.lastName}</td>
                                        <td className="px-6 py-3">{user.username}</td>
                                        <td className="px-6 py-3">{user.dob}</td>
                                        <td className="px-6 py-3 text-center">
                                            <button className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                                                onClick={() => handleDelete(user.id)}>
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5"
                                        className="text-center py-4 text-gray-500 italic">
                                        Không có người dùng nào
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-4 space-x-2">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                className={`px-3 py-1 border rounded ${page === index ? "bg-blue-500 text-white" : "bg-white text-gray-700"
                                    }`}
                                onClick={() => handlePageChange(index)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UsersPage;
