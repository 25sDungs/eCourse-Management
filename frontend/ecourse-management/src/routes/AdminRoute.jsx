import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;
  if (!role.includes("ROLE_ADMIN")) return <Navigate to="/" />; 
  return children;
};

export default AdminRoute;
