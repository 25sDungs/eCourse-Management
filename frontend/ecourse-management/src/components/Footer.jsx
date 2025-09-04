import { Link } from "react-router-dom";
import { FaFacebook, FaLinkedin, FaInstagram, FaTwitch } from "react-icons/fa";
import ToTopButton from "./ToTopButton"
function Footer() {

    return (
        <footer className="bg-gray-800 text-white">
            <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-3 gap-8">

                <div>
                    <h3 className="text-lg font-semibold mb-4">Liên Hệ</h3>
                    <p>Địa chỉ: 97 Võ Văn Tần, Phường Xuân Hòa, TP.HCM</p>
                    <p>Email: 2251052024dung@ou.edu.vn</p>
                    <p>Hotline: 0123456789</p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Liên Kết Nhanh</h3>
                    <ul className="space-y-2">
                        <li><Link to="/" className="hover:text-blue-300">Chính Sách</Link></li>
                        <li><Link to="/" className="hover:text-blue-300">Điều Khoản</Link></li>
                        <li><Link to="/" className="hover:text-blue-300">Hỗ Trợ</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Theo Dõi Chúng Tôi</h3>
                    <div className="flex space-x-6 text-2xl">
                        <a href="#" className="hover:text-blue-300">
                            <FaFacebook />
                        </a>
                        <a href="#" className="hover:text-blue-300">
                            <FaLinkedin />
                        </a>
                        <a href="#" className="hover:text-blue-300">
                            <FaInstagram />
                        </a>
                        <a href="#" className="hover:text-blue-300">
                            <FaTwitch />
                        </a>
                    </div>
                </div>
            </div>
            <div className="bg-gray-900 text-center py-4">
                <p>&copy;{new Date().getFullYear()} eCourse Management</p>
            </div>
            <ToTopButton />
        </footer>
    );
}

export default Footer;