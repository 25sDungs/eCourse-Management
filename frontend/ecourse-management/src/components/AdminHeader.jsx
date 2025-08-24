import React from "react";
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';


const Header = ({ onToggleSidebar }) => {

    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        alert('Đăng xuất thành công!');
        navigate('/login');
    };
    return (
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-40">
            <button
                className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={onToggleSidebar}
            >
                ☰
            </button>
            <div>
                <button onClick={handleLogout} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;
