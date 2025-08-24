import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/index.css";
import { logout } from '../../services/authService';


const Home = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "";

  const handleLogout = () => {
    logout();
    alert('Đăng xuất thành công!');
    navigate('/login');
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <div className="flex justify-between items-center p-2 border-b border-gray-200">
        <h1 className="text-2xl font-bold">eCourse</h1>
      </div>
      <main className="text-center mt-5">
        <h2 className="text-3xl text-gray-800 font-semibold">
          Chào mừng {username}!
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          Bạn đã đăng nhập thành công. Đây là trang chính của ứng dụng.
        </p>
      </main>
    </div>
  );
};

export default Home;