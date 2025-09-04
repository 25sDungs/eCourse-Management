import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OAuth2Redirect = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        const username = params.get("name");
        if (token) {
            localStorage.setItem("loginTime", Date.now());
            localStorage.setItem("token", token);
            localStorage.setItem("role", "ROLE_STUDENT");
            localStorage.setItem("username", username);
            window.location.href = "/";
        } else {
            navigate("/login");
        }
    }, [location, navigate]);

    return <p>Đang đăng nhập...</p>;
};

export default OAuth2Redirect;
