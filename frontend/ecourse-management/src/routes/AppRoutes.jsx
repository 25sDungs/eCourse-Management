import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/user/HomePage.jsx";
import LoginPage from "../pages/user/LoginPage.jsx";
import CoursesPage from "../pages/user/CoursePage.jsx";
import CourseDetailPage from "../pages/user/CourseDetailPage.jsx";

import AdminRoute from "./AdminRoute.jsx";
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import AdminUser from "../pages/admin/AdminUsers.jsx";


function AppRoutes() {
  return (

    <Routes>
      {/* Public routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />

      <Route element={<MainLayout />}>
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<CourseDetailPage />} />
      </Route>


      {/* Admin routes */}
      <Route path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>} />
      <Route path="/admin/users"
        element={
          <AdminRoute>
            <AdminUser />
          </AdminRoute>} />
    </Routes>
  );
}

export default AppRoutes;