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
import LearningPathsPage from "../pages/user/LearningPathsPage.jsx";
import IntroductionPage from "../pages/user/IntroductionPage.jsx";

import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import AdminUser from "../pages/admin/AdminUsers.jsx";
import AdminRoute from "./AdminRoute.jsx";
import AdminEnrollmentPage from "../pages/admin/AdminEnrollmentPage.jsx"

import TeacherRoute from "./TeacherRoute.jsx";
import ClassManagePage from "../pages/teacher/ClassManagePage.jsx";
import AdminCoursesPage from "../pages/admin/AdminCoursesPage.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";
import SubmissionsPage from "../pages/teacher/SubmissionPage.jsx";

function AppRoutes() {
  return (

    <Routes>

      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/introduction" element={<IntroductionPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<CourseDetailPage />} />
        <Route path="/courses/:courseId/classes/:classId" element={<ClassPage />} />
        <Route path="/payment-callback" element={<PaymentCallbackPage />} />
        <Route path="/my-courses" element={<MyCoursesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/my-learning-paths" element={<LearningPathsPage />} />
      </Route>

      {/* Teacher Routes */}
      <Route element={<MainLayout />}>
        <Route path="/teacher"
          element={
            <TeacherRoute roles={["ROLE_TEACHER"]}>
              <ClassManagePage />
            </TeacherRoute>
          } />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/classes/:className/assignments/:assignmentId/submissions"
          element={
            <TeacherRoute roles={["ROLE_TEACHER"]}>
              <SubmissionsPage />
            </TeacherRoute>
          } />
      </Route>


      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute>
        <AdminLayout />
      </AdminRoute>}
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUser />} />
        <Route path="courses" element={<AdminCoursesPage />} />
        <Route path="enrollments" element={<AdminEnrollmentPage />} />
      </Route>

    </Routes>
  );
}

export default AppRoutes;