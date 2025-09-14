import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/authService";

export default function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleReset = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage("Mật khẩu xác nhận không khớp!");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const res = await resetPassword(token, newPassword)
            setMessage(res.data.message);
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (err) {
            setMessage("Có lỗi xảy ra, vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200 px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-indigo-700 mb-2">
                    Đặt lại mật khẩu 🔐
                </h2>
                <p className="text-center text-gray-600 mb-6 text-sm">
                    Nhập mật khẩu mới cho tài khoản của bạn
                </p>

                <form onSubmit={handleReset} className="space-y-4">
                    <div>
                        <label className="text-sm font-semibold text-gray-700">
                            Mật khẩu mới
                        </label>
                        <input
                            className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                            type="password"
                            placeholder="Nhập mật khẩu mới"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-gray-700">
                            Xác nhận mật khẩu
                        </label>
                        <input
                            className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                            type="password"
                            placeholder="Nhập lại mật khẩu mới"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    {message && (
                        <div
                            className={`text-sm text-center py-2 rounded-md ${message.includes("✅")
                                ? "text-green-600 bg-green-50"
                                : "text-red-600 bg-red-50"
                                }`}
                        >
                            {message}
                        </div>
                    )}

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition shadow-md"
                    >
                        {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
                    </button>
                </form>
            </div>
        </div>
    );
}