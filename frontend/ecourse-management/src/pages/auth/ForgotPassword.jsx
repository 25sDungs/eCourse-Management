import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../services/authService"

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleForgot = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const res = await forgotPassword(email);
            setMessage(res.data.message);
        } catch (err) {
            setMessage("Có lỗi xảy ra, vui lòng thử lại!");
            console.error(err)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-indigo-700 mb-2">
                    Quên mật khẩu 🔑
                </h2>
                <p className="text-center text-gray-600 mb-6 text-sm">
                    Nhập email của bạn để tìm tài khoản và đặt lại mật khẩu
                </p>
                <form onSubmit={handleForgot} className="space-y-4">
                    <div>
                        <label className="text-sm font-semibold text-gray-700">
                            Email
                        </label>
                        <input
                            className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                            type="email"
                            placeholder="Nhập email của bạn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {message && (
                        <div className="text-sm text-center text-green-600 bg-green-50 py-2 rounded-md">
                            {message}
                        </div>
                    )}

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition shadow-md"
                    >
                        {loading ? "Đang gửi..." : "Tìm kiếm"}
                    </button>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={() => navigate("/login")}
                        className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition shadow-md"
                    >
                        Hủy
                    </button>
                </form>
            </div>
        </div>
    );
}