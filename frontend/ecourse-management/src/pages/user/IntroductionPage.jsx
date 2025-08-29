import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/index.css";


const IntroductionPage = () => {
    return (
        <div className="font-sans">
            <section className="h-[100vh] flex flex-col justify-center items-center bg-gradient-to-r from-gray-400 to-purple-400 text-white text-center px-6">
                <h2 className="text-4xl font-semibold mb-4">Giới thiệu về chúng tôi</h2>
                <p className="flex-col justify-center text-center">
                    Chúng tôi cung cấp nền tảng học trực tuyến hiện đại, mang đến kiến thức chất lượng từ các giảng viên uy tín.
                </p>
            </section>
        </div>
    );
};

export default IntroductionPage;