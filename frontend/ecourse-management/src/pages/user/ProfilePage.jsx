import { useState, useEffect } from "react";
import { changePassword, currentUserInfo, updateUserInfo } from "../../services/userService";
import { getMyCertificate, downloadCertificate } from "../../services/certificationService";

function ProfilePage() {
    const userrole = localStorage.getItem("role") || "";
    const [user, setUser] = useState(null);
    const [certifications, setCertifications] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

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

    const handlePasswordChange = (e) => {
        setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
            setLoading(false);
            return;
        }
        else if (passwordForm.newPassword.length < 6) {
            alert("Mật khẩu mới phải có ít nhất 6 ký tự!");
            setLoading(false);
            return;
        }
        try {
            await changePassword(user.id, passwordForm.newPassword);
            setIsChangingPassword(false);
            setPasswordForm({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
            alert("Đổi mật khẩu thành công!");
        } catch (err) {
            console.error("Change password failed:", err);
            alert("Đổi mật khẩu thất bại");
        }
        finally {
            setLoading(false);
        }
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

    const handleDownloadCert = async (id, tilte) => {
        try {
            await downloadCertificate(id, tilte);
        } catch (err) {
            console.error("Download certificate failed:", err);
        }
    }

    const getUserInfo = async () => {
        try {
            const data = await currentUserInfo();
            setUser(data.result);
        }
        catch (error) {
            console.error("Failed to fetch user info:", error);
        }
    };
    const fetchCertifications = async () => {
        try {
            const data = await getMyCertificate();
            setCertifications(data || []);
        } catch (err) {
            console.error("Lỗi tải chứng chỉ:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userrole === "ROLE_STUDENT") { fetchCertifications(); }
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
                    {!isEditing && !isChangingPassword ? (
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

                            <div className="mt-6 flex-1 gap-3 flex justify-evenly">
                                <button
                                    onClick={handleEditClick}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Chỉnh sửa thông tin
                                </button>
                                <button
                                    onClick={() => setIsChangingPassword(true)}
                                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                                >
                                    Đổi mật khẩu
                                </button>
                            </div>
                        </>
                    ) : null}
                    {isEditing && (
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
                    {isChangingPassword && (
                        <form onSubmit={handleChangePassword} className="space-y-4 mt-4">
                            <div>
                                <label className="block text-sm text-gray-500">
                                    Mật khẩu hiện tại
                                </label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={passwordForm.currentPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500">
                                    Mật khẩu mới
                                </label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwordForm.newPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500">
                                    Xác nhận mật khẩu mới
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={passwordForm.confirmPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            <div className="flex justify-between gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsChangingPassword(false);
                                        setPasswordForm({
                                            currentPassword: "",
                                            newPassword: "",
                                            confirmPassword: "",
                                        });
                                    }}
                                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                >
                                    Đổi mật khẩu
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
            {userrole === "ROLE_STUDENT" && <div className="max-w-5xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">Các chứng chỉ</h1>

                {certifications.length === 0 ? (
                    <div className="bg-gray-50 border rounded-xl p-6 text-center text-gray-500">
                        Bạn chưa có chứng chỉ nào.
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {certifications.map((cert) => (
                            <div
                                key={cert.id}
                                className="bg-white shadow-md rounded-xl p-6 flex flex-col gap-4 border hover:shadow-lg transition"
                            >
                                <div className="flex items-center gap-4">
                                    <div>
                                        <h2 className="text-lg font-semibold">{cert.content}</h2>
                                    </div>
                                </div>

                                <div className="text-sm text-gray-600">
                                    <p>
                                        <span className="font-medium">Ngày cấp:</span>{" "}
                                        {new Date(cert.issueDate).toLocaleDateString("vi-VN")}
                                    </p>
                                </div>

                                <div className="flex justify-between items-center">
                                    {cert.url && (
                                        <button
                                            onClick={() => handleDownloadCert(cert.id, cert.content)}
                                            className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                                        >
                                            Tải chứng chỉ
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>}

        </div>
    );
}

export default ProfilePage;
