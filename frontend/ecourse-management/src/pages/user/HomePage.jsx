import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/index.css";


const Home = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "";

  return (
    <div className="font-sans">
      <section className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-gray-400 to-blue-400 text-white text-center px-6">
        <h2 className="text-4xl font-bold mb-4">Nền tảng học trực tuyến hiện đại</h2>
        <p className="max-w-2xl mb-6">
          Khám phá hàng trăm khóa học chất lượng, học tập dễ dàng mọi lúc, mọi nơi.
        </p>
      </section>
    </div>
  );
};

export default Home;