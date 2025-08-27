import { useState } from "react";
import { FaChalkboardTeacher, FaUsers, FaBook } from "react-icons/fa";

const TeacherDashboard = () => {
  const [selectedClass, setSelectedClass] = useState(1);

  const classes = [
    { id: 1, name: "Lớp Toán 12A", course: "Toán học", students: 40 },
    { id: 2, name: "Lớp Văn 11B", course: "Ngữ văn", students: 35 },
    { id: 3, name: "Lớp Lý 10C", course: "Vật lý", students: 38 },
  ];

  const currentClass = classes.find((c) => c.id === selectedClass);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg border-r p-4">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FaChalkboardTeacher /> Lớp giảng dạy
        </h2>
        <div className="space-y-2">
          {classes.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelectedClass(c.id)}
              className={`p-3 rounded-lg cursor-pointer border ${
                selectedClass === c.id
                  ? "bg-blue-100 border-blue-400"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              <h3 className="font-semibold">{c.name}</h3>
              <p className="text-sm text-gray-500">{c.course}</p>
              <p className="text-xs text-gray-400">
                {c.students} học viên
              </p>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">{currentClass.name}</h1>

        {/* Info Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-white rounded-lg shadow flex items-center gap-3">
            <FaBook className="text-blue-500 text-2xl" />
            <div>
              <p className="text-gray-500 text-sm">Môn học</p>
              <p className="font-semibold">{currentClass.course}</p>
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow flex items-center gap-3">
            <FaUsers className="text-green-500 text-2xl" />
            <div>
              <p className="text-gray-500 text-sm">Học viên</p>
              <p className="font-semibold">{currentClass.students}</p>
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow flex items-center gap-3">
            <FaChalkboardTeacher className="text-purple-500 text-2xl" />
            <div>
              <p className="text-gray-500 text-sm">Giáo viên</p>
              <p className="font-semibold">Nguyễn Văn A</p>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-bold mb-3">Danh sách học viên</h2>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">Tên</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Trạng thái</th>
                <th className="p-2 border">Điểm</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">Trần Thị B</td>
                <td className="p-2 border">btran@example.com</td>
                <td className="p-2 border text-green-600">Đang học</td>
                <td className="p-2 border">8.5</td>
              </tr>
              <tr>
                <td className="p-2 border">Lê Văn C</td>
                <td className="p-2 border">cle@example.com</td>
                <td className="p-2 border text-yellow-600">Chưa nộp</td>
                <td className="p-2 border">--</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;