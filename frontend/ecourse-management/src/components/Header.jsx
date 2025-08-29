import { Link, useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { logout } from "../services/authService";
import { currentUserInfo } from "../services/userService";

function Header() {

    const username = localStorage.getItem("username") || "";
    const userrole = localStorage.getItem("role") || "";
    const token = localStorage.getItem("token") || "";

    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef();
    const [avtUrl, setAvtUrl] = useState("");

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getAvatarUser = async () => {
        if (token) {
            try {
                const data = await currentUserInfo();
                setAvtUrl(data.result.avatarUrl || "");
            } catch (err) {
                setAvtUrl("");
            }
        }
    }

    useEffect(() => {
        getAvatarUser();
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="bg-gradient-to-l bg-yellow-200 text-black shadow-md">
            <div className="mx-auto px-4 py-4 flex justify-between items-center">

                <div className="text-2xl font-bold">
                    <Link to="/">eCourse</Link>
                </div>
                <nav className="space-x-9" >
                    <Link to="/" className="hover:text-blue-200"><span className="font-bold">TRANG CHỦ</span></Link>
                    <Link to="/introduction" className="hover:text-blue-200"><span className="font-bold">GIỚI THIỆU</span></Link>
                    <Link to="/courses" className="hover:text-blue-200"><span className="font-bold">CÁC KHÓA HỌC</span></Link>
                    <Link to="/my-courses" className="hover:text-blue-200"><span className="font-bold">KHÓA HỌC CỦA TÔI</span></Link>
                </nav>
                <div
                    className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-blue-100 cursor-pointer flex items-center justify-center bg-gray-200 text-gray-600"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {avtUrl ? (
                        <img src={avtUrl} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="w-5 h-5"
                        >
                            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v1.2h19.2v-1.2c0-3.2-6.4-4.8-9.6-4.8z" />
                        </svg>
                    )}
                </div>
                {menuOpen && (
                    <div className="absolute top-10 right-1 mt-2 bg-white text-black shadow-lg rounded-md z-50">
                        {userrole == "ROLE_STUDENT" ? (
                            <>
                                <Link
                                    to="/profile"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Thông tin cá nhân
                                </Link>
                                <Link
                                    to="/my-learning-paths"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Lộ trình học của tôi
                                </Link>
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                                    onClick={handleLogout}
                                >
                                    Đăng xuất
                                </button>
                            </>
                        ) : userrole === "ROLE_TEACHER" ? (
                            <>
                                <Link
                                    to="/profile"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Thông tin tài khoản
                                </Link>
                                <Link
                                    to="/teacher"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Quản lý lớp học
                                </Link>
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                                    onClick={handleLogout}
                                >
                                    Đăng xuất
                                </button>
                            </>
                        )
                            :
                            (
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                                    onClick={() => navigate("/login")}
                                >
                                    Đăng Nhập
                                </button>
                            )
                        }
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header