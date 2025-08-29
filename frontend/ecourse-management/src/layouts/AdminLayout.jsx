import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";

function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loginTime = localStorage.getItem("loginTime");
        const maxSession = 60 * 60 * 1000;
        if (loginTime && Date.now() - loginTime > maxSession) {
            localStorage.removeItem("loginTime");
            localStorage.removeItem("username");
            localStorage.removeItem("token");
            navigate("/login");
        }
    }, []);
    return (
        <div className="flex h-screen">
            <Sidebar isOpen={sidebarOpen} />

            <div className="flex-1 bg-gray-50">
                <Outlet />
            </div>
        </div>
    );
}
export default AdminLayout;