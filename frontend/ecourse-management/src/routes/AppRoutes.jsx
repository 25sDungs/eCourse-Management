import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/user/HomePage.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";
import CoursesPage from "../pages/user/CoursePage.jsx";
import CourseDetailPage from "../pages/user/CourseDetailPage.jsx";
import PaymentCallbackPage from "../pages/user/PaymentCallbackPage.jsx";
import MyCoursesPage from "../pages/user/MyCoursesPage.jsx";
import ProfilePage from "../pages/user/ProfilePage.jsx";
import ClassPage from "../pages/user/ClassPage.jsx";

import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import AdminUser from "../pages/admin/AdminUsers.jsx";
import AdminRoute from "./AdminRoute.jsx";

import TeacherRoute from "./TeacherRoute.jsx";
import TeacherDashboard from "../pages/teacher/TeacherDashboard.jsx";
import TeacherClassDetail from "../pages/teacher/TeacherClassDetail.jsx";
import TeacherCoursesPage from "../pages/teacher/TeacherCoursesPage.jsx";
import AdminCoursesPage from "../pages/admin/AdminCourse.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";

function AppRoutes() {
  return (

    <Routes>

      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<CourseDetailPage />} />
        <Route path="/courses/:courseId/classes/:classId" element={<ClassPage />} />
        <Route path="/payment-callback" element={<PaymentCallbackPage />} />
        <Route path="/my-courses" element={<MyCoursesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* Teacher Routes */}
      <Route element={<MainLayout />}>
        <Route path="/teacher"
          element={
            <TeacherRoute roles={["ROLE_TEACHER"]}>
              <TeacherDashboard />
            </TeacherRoute>
          } />
        <Route path="/teacher-classes/:courseId"
          element={
            <TeacherRoute>
              <TeacherClassDetail />
            </TeacherRoute>
          } />
        <Route path="/teacher-courses"
          element={
            <TeacherRoute>
              <TeacherCoursesPage />
            </TeacherRoute>
          } />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUser />} />
        <Route path="courses" element={<AdminCoursesPage />} />
      </Route>

    </Routes>
  );
}

export default AppRoutes;