import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";

function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

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