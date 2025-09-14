import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../../styles/index.css";

const stats = [
    { id: 1, label: "Học viên", value: 900 },
    { id: 2, label: "Khóa học", value: 190 },
    { id: 3, label: "Giảng viên", value: 80 },
];

const images = [
    "/images/class1.jpg",
    "/images/class2.jpg",
    "/images/class3.jpg",
];

const Counter = ({ value, duration = 3000 }) => {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        let start = 0;
        const end = value;
        const startTime = performance.now();

        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutCubic(progress);
            setCount(Math.floor(start + (end - start) * easedProgress));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [value, duration]);

    return <span>{count.toLocaleString()}</span>;
};

const IntroductionPage = () => {
    const sliderRef = useRef(null);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!sliderRef.current) return;
            const nextIndex = (index + 1) % images.length;
            const slideWidth = sliderRef.current.clientWidth;
            sliderRef.current.scrollTo({
                left: nextIndex * slideWidth,
                behavior: "smooth",
            });
            setIndex(nextIndex);
        }, 3000); // 3s đổi ảnh

        return () => clearInterval(interval);
    }, [index]);

    return (
        <div className="font-sans">
            {/* Hero */}
            <section className="h-[60vh] flex flex-col justify-center items-center bg-gradient-to-r from-gray-400 to-purple-400 text-white text-center px-6">
                <motion.h2
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-4xl font-semibold mb-4"
                >
                    Giới thiệu về chúng tôi
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="max-w-2xl text-lg"
                >
                    Chúng tôi cung cấp nền tảng học trực tuyến hiện đại, mang đến kiến thức
                    chất lượng từ các giảng viên uy tín.
                </motion.p>
            </section>

            {/* Stats */}
            <section className="py-16 bg-white text-gray-800">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {stats.map((stat) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="p-6 shadow rounded-xl bg-gray-50"
                        >
                            <p className="text-4xl font-bold text-purple-600">
                                <Counter value={stat.value} />+
                            </p>
                            <p className="mt-2 text-lg">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Slider */}
            <section className="py-20 bg-gray-100">
                <h3 className="text-2xl font-semibold text-center mb-10">
                    Một số hình ảnh
                </h3>

                <div
                    ref={sliderRef}
                    className="relative w-full max-w-6xl mx-auto flex overflow-x-hidden snap-x snap-mandatory rounded-2xl shadow-lg"
                >
                    {images.map((src, idx) => (
                        <div key={idx} className="flex-shrink-0 w-full snap-center">
                            <img
                                src={src}
                                alt={`slide-${idx}`}
                                className="w-full h-[500px] object-cover rounded-2xl"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-purple-600 text-white text-center">
                <h3 className="text-3xl font-bold mb-4">Tham gia ngay hôm nay</h3>
                <p className="mb-6">Cùng học tập và phát triển với chúng tôi</p>
                <Link
                    to="/register"
                    className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl shadow hover:bg-gray-100 transition">
                    Đăng ký ngay
                </Link>
            </section>
        </div>
    );
};

export default IntroductionPage;
