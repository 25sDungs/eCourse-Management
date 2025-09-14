import { Navigate } from "react-router-dom";


const TeacherRoute = ({ children }) => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (role !== "ROLE_TEACHER") {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default TeacherRoute;