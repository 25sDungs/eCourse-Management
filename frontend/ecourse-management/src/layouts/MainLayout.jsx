import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function MainLayout() {
    const navigate = useNavigate();

    useEffect(() => {
        const loginTime = localStorage.getItem("loginTime");
        const maxSession = 60 * 60 * 1000;
        if (loginTime && Date.now() - loginTime > maxSession) {
            localStorage.removeItem("loginTime");
            localStorage.removeItem("username");
            localStorage.removeItem("token");
            navigate("/");
        }
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="min-h-screen">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default MainLayout;