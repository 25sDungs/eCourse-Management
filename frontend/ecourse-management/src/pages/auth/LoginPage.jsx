import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { login } from "../../services/authService"
import "../../styles/index.css";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setLoading(true);
        try {
            const data = await login(username, password);
            localStorage.setItem("loginTime", Date.now());
            localStorage.setItem("token", data.result.token);
            localStorage.setItem("username", data.result.username);
            const role = data.result.role;
            localStorage.setItem("role", role);
            if (role === "ROLE_ADMIN") {
                navigate("/admin");
            }
            else if (role === "ROLE_TEACHER") {
                navigate("/teacher");
            }
            else {
                navigate("/");
            }
        } catch (error) {
            setErrorMsg(error.message);
        } finally {
            setLoading(false);
        }
    };
    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:8080/learning/oauth2/authorization/google';
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Đăng Nhập
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-bold m-1">
                            Tên đăng nhập
                        </label>

                        <input
                            className="mb-3 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder="Tên đăng nhập"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm font-bold m-1">
                            Mật khẩu
                        </label>
                        <input
                            className="mb-3 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="password"
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {errorMsg && <div className="text-red-500 text-sm">{errorMsg}</div>}
                    <button disabled={loading} type="submit"
                        className="mt-2 mb-2 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
                        Đăng Nhập
                    </button>
                </form>
                <div className="my-6 text-center text-gray-500"><span>Hoặc đăng nhập bằng</span></div>
                <div className="flex gap-4">
                    <button onClick={handleGoogleLogin}
                        className="flex-1 flex items-center justify-center gap-4 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition">
                        <FaGoogle className="text-red-500" />
                        Google
                    </button>
                </div>
                <p className="text-center text-sm text-gray-500 mt-6">
                    Chưa có tài khoản?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Đăng ký
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;