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
    <div className="font-sans">

      <section className="h-[80vh] flex flex-col justify-center items-center bg-gradient-to-r from-green-200 to-green-500 text-white text-center px-6">
        <h2 className="text-4xl font-bold mb-4">Nền tảng học trực tuyến hiện đại</h2>
        <p className="max-w-2xl mb-6">
          Khám phá hàng trăm khóa học chất lượng, học tập dễ dàng mọi lúc, mọi nơi.
        </p>
      </section>

      <section className="md:grid-cols-2 gap-10 p-10">
        <div className="flex-col justify-center">
          <h3 className="text-2xl font-semibold mb-4 text-center">Giới thiệu về chúng tôi</h3>
          <p className="text-gray-600 flex-col justify-center text-center">
            Chúng tôi cung cấp nền tảng học trực tuyến hiện đại, mang đến kiến thức chất lượng từ các giảng viên uy tín.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;