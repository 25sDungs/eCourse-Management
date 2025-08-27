import { useState, useEffect } from "react";
import { currentUserInfo, updateUserInfo } from "../../services/userService";


function ProfilePage() {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        email: "",
        password: "",
    });

    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    const handleEditClick = () => {
        if (user) {
            setForm({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                dob: user.dob || "",
                email: user.email || "",
            });
            setAvatarPreview(user.avatarUrl || null);
            setIsEditing(true);
        }
    };
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateUserInfo(user.id, form, avatarFile);
            setIsEditing(false);
            setAvatarFile(null);
            getUserInfo();
        } catch (err) {
            console.error("Update failed:", err);
        }
        finally {
            setLoading(false);
        }
    };

    const getUserInfo = async () => {
        try {
            const data = await currentUserInfo();
            setUser(data.result);
        }
        catch (error) {
            console.error("Failed to fetch user info:", error);
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    if (!user) return <p className="text-center py-10">Loading User Data...</p>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Thông tin cá nhân</h1>

            <div className="bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6">

                <div className="flex-shrink-0">
                    {user.avatarUrl ? (
                        <img
                            src={avatarPreview || user.avatarUrl || "/default-avatar.png"}
                            alt="Avatar"
                            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                        />
                    ) : (
                        <div className="w-32 h-32 rounded-full flex items-center justify-center bg-gray-200 border-4 border-gray-200">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                className="w-16 h-16 text-gray-500"
                            >
                                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v1.2h19.2v-1.2c0-3.2-6.4-4.8-9.6-4.8z" />
                            </svg>
                        </div>
                    )}
                    {isEditing && (
                        <label className="flex justify-center bottom-0 right-0 bg-blue-600 text-white px-2 py-1 text-xs rounded cursor-pointer hover:bg-blue-700">
                            Đổi ảnh
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatarChange}
                            />
                        </label>
                    )}
                </div>

                <div className="flex-1 w-full">
                    {!isEditing ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Họ</p>
                                    <p className="font-medium">{user.lastName} </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Tên</p>
                                    <p className="font-medium">
                                        {user.firstName}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Ngày sinh</p>
                                    <p className="font-medium">{user.dob}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-medium">{user.email}</p>
                                </div>
                            </div>

                            <div className="mt-6">
                                <button
                                    onClick={handleEditClick}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Chỉnh sửa thông tin
                                </button>
                            </div>
                        </>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-500">Họ</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={form.lastName}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-500">Tên</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={form.firstName}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-500">Ngày sinh</label>
                                    <input
                                        type="date"
                                        name="dob"
                                        value={form.dob}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-500">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(false)
                                        setAvatarFile(null);
                                        setAvatarPreview(null);
                                    }}
                                    disabled={loading}
                                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
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
                                        "Lưu thay đổi"
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
