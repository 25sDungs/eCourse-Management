import React, { useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import AdminHeader from "../../components/AdminHeader.jsx"
import Card from "../../components/Card.jsx";
const AdminDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar isOpen={sidebarOpen} />
            <div className="flex-1 flex flex-col">
                <AdminHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className="p-6 overflow-auto">
                    <div className="flex gap-6 flex-wrap">
                        <Card title="Users" value="120" />
                        <Card title="Courses" value="35" />
                    </div>
                    {/* Chart component */}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
