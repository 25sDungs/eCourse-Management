import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/userService";


function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        firstName: "",
        lastName: "",
        dob: "",
        avatar: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "avatar") {
            setForm({ ...form, avatar: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            alert("Mật khẩu nhập lại không khớp!");
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("username", form.username);
        formData.append("password", form.password);
        formData.append("lastName", form.lastName);
        formData.append("firstName", form.firstName);
        formData.append("email", form.email);
        formData.append("dob", form.dob);
        if (form.avatar) {
            formData.append("avatar", form.avatar);
        }
        try {
            await register(formData);
            alert("Đăng ký thành công!");
            navigate("/login");
        } catch (err) {
            alert(err.message || "Đăng ký thất bại!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Đăng ký tài khoản
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block mb-1 text-gray-600">Tên đăng nhập</label>
                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block mb-1 text-gray-600">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                            />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block mb-1 text-gray-600">Họ</label>
                            <input
                                type="text"
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                            />
                        </div>

                        <div className="flex-1">
                            <label className="block mb-1 text-gray-600">Tên</label>
                            <input
                                type="text"
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-600">Ngày sinh</label>
                        <input
                            type="date"
                            name="dob"
                            value={form.dob}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-600">Mật khẩu</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-600">Nhập lại mật khẩu</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-600">Ảnh đại diện</label>
                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 flex items-center justify-center"
                    >
                        {loading ? (
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                            </svg>
                        ) : (
                            "Đăng ký"
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Đã có tài khoản?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Đăng nhập
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
