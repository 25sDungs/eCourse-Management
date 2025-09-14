import axios from "axios";


const api = axios.create({
    baseURL: "/learning/api",
});


api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Lỗi 401 & 403 => chuyển hướng đến trang login và xóa token,...
// api.interceptors.response.use(
//     response => response,
//     error => {
//         if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//             localStorage.removeItem("token");
//             localStorage.removeItem("username");
//             localStorage.removeItem("role");
//             localStorage.removeItem("loginTime");
//             window.location.href = "/login";
//         }
//         return Promise.reject(error);
//     }
// );

export default api;