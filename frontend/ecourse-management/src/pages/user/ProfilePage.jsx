import { useState, useEffect } from "react";
import { currentUserInfo } from "../../services/userService";


function ProfilePage() {
    const [user, setUser] = useState(null);

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
                            src={user.avatarUrl}
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
                </div>

                <div className="flex-1 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Tên đăng nhập</p>
                            <p className="font-medium">{user.username}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Họ và tên</p>
                            <p className="font-medium">
                                {user.lastName} {user.firstName}
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
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Chỉnh sửa thông tin
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
