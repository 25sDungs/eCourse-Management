Course Management System
Một nền tảng quản lý học tập trực tuyến đầy đủ tính năng, được xây dựng để cung cấp trải nghiệm liền mạch cho cả Học viên, Giáo viên và Quản trị viên. Dự án này bao gồm một hệ thống backend mạnh mẽ, một giao diện frontend linh hoạt và tích hợp các dịch vụ của bên thứ ba như cổng thanh toán và xác thực.

✨ Tính năng nổi bật
👨‍🎓 Dành cho Học viên (Student)
Quản lý Tài khoản: Đăng ký, đăng nhập bằng email hoặc tài khoản Google.
Khôi phục Mật khẩu: Chức năng lấy lại mật khẩu an toàn qua email đã đăng ký.
Thanh toán & Ghi danh: Tích hợp cổng thanh toán VNPay để ghi danh vào khóa học một cách dễ dàng.
Lộ trình Học tập: Tự quản lý và chỉnh sửa lộ trình học tập cá nhân.
Quản lý Thông tin: Cập nhật thông tin cá nhân, ảnh đại diện và thay đổi mật khẩu.
Tương tác Khóa học: Truy cập lớp học, xem chi tiết nội dung và nộp bài tập.
Thành tích: Xem và tải về các chứng chỉ đã đạt được.
Trợ lý AI: Tích hợp chatbot AI giúp người dùng quản lý và tối ưu hóa lộ trình học tập.

👩‍🏫 Dành cho Giáo viên (Teacher)
Quản lý Lớp học: Toàn quyền quản lý các lớp học được phân công.
Quản lý Nội dung: Thêm, sửa, xóa nội dung bài giảng và tài liệu cho lớp học.
Quản lý Bài tập: Tạo và chỉnh sửa chi tiết các bài tập được giao.
Chấm điểm: Giao diện chấm điểm bài tập của học viên, cho phép tải về bài nộp và xuất file điểm ra PDF.

👑 Dành cho Quản trị viên (Admin)
Quản lý Toàn diện: Quản lý toàn bộ các khóa học và lớp học trên hệ thống.
Phân công Giảng dạy: Gán giáo viên vào các lớp học cụ thể.
Quản lý Người dùng: Quản lý tất cả người dùng và phân quyền (ví dụ: gán vai trò Giáo viên).
Kiểm duyệt: Phê duyệt các yêu cầu tham gia lớp học của thành viên.
Thống kê Doanh thu: Dashboard trực quan để theo dõi và thống kê doanh thu.

🚀 Công nghệ sử dụng
Backend: Java Spring boot
Frontend: ReactJS Vite 
Cơ sở dữ liệu: MySQL
Xác thực: JWT (JSON Web Tokens), Google OAuth 2.0
Lưu trữ file: Cloudinary
Cổng thanh toán: VNPay
Tích hợp AI: OpenAI API

🛠️ Hướng dẫn Cài đặt
Để chạy dự án này trên máy tính của bạn, hãy làm theo các bước sau.

Yêu cầu
Node.js (phiên bản 16.x trở lên)

Git

Một hệ quản trị CSDL (ví dụ: MongoDB Atlas, XAMPP/MySQL)

Các bước cài đặt
Clone repository về máy:
git clone "https://github.com/25sDungs/eCourse-Management.git"

Di chuyển vào thư mục dự án:
cd eCourse-Management

Cài đặt các gói phụ thuộc (dependencies):
npm install

Thiết lập biến môi trường:
Tạo file với có tên .env

Mở file .env và điền thông tin của biên môi trường(mô tả tên biến ở phía dưới).

Khởi chạy ứng dụng:
npm run dev

Web sẽ chạy tại địa chỉ http://localhost:5173


🔑 Thiết lập Biến môi trường (.env)
Bạn cần cung cấp các khóa API và thông tin cấu hình sau trong file .env.

CLOUDINARY_CLOUD_NAME: Cloud Name từ dashboard của Cloudinary.

CLOUDINARY_API_KEY: API Key từ dashboard của Cloudinary.

CLOUDINARY_API_SECRET: API Secret từ dashboard của Cloudinary.

TMNCODE: Mã terminal do VNPay cung cấp.

HASHSECRET: Chuỗi bí mật để tạo chữ ký do VNPay cung cấp.

PAYURL: URL của cổng thanh toán VNPay (môi trường sandbox hoặc production).

DB_NAME: Tên cơ sở dữ liệu của bạn.

DB_PASSWORD: Mật khẩu của cơ sở dữ liệu.

CLIENT_ID: Client ID từ Google Cloud Console cho chức năng đăng nhập Google.

CLIENT_SECRET: Client Secret từ Google Cloud Console.

GMAIL_PASSWORD: Mật khẩu ứng dụng (16 ký tự) của Google để gửi email.

OPENAI_KEY: Khóa API từ trang quản trị của OpenAI.

📜 Giấy phép
Dự án này được cấp phép theo Giấy phép MIT. Xem file LICENSE để biết thêm chi tiết.