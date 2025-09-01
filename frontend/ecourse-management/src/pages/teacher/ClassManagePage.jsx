import { useEffect, useState } from "react";
import { FaChalkboardTeacher, FaTasks, FaPlus, FaCalendarAlt, FaBook, FaEdit, FaTrash } from "react-icons/fa";
import { getTeacherClass } from "../../services/classService";
import { currentUserInfo } from "../../services/userService";
import {
  getClassAssignments, getClassContents, createAssignments, createClassContents,
  updateAssignments, delAssignments, updateClassContents, delClassContents
} from "../../services/classContentService"
import { Link } from "react-router-dom";

const TeacherDashboard = () => {
  const token = localStorage.getItem("token");
  const [userId, setUserId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState(1);
  const [tab, setTab] = useState("content");

  const [openContentModal, setOpenContentModal] = useState(false);
  const [openAssignmentModal, setOpenAssignmentModal] = useState(false);

  const [editingContent, setEditingContent] = useState(null);
  const [editingAssignment, setEditingAssignment] = useState(null);

  const [classes, setClasses] = useState([]);
  const [classContents, setClassContents] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [newContent, setNewContent] = useState({ title: "", content: "" });
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    startDate: "",
    dueDate: "",
  });

  const handleAddContent = async (classId) => {
    setLoading(true);
    try {
      await createClassContents(0, classId, newContent);
      fetchClassContents(classId);
    }
    catch (err) {
      console.error("Lỗi khi gọi api tạo nội dung", err)
    }
    finally {
      setOpenContentModal(false);
      setNewContent({ title: "", content: "" });
      setLoading(false);
    }
  };

  const handleAddAssignment = async (classId) => {
    setLoading(true);
    try {
      if (!newAssignment.title || !newAssignment.description || !newAssignment.startDate || !newAssignment.dueDate) {
        alert("Vui lòng nhập đầy đủ nội dung");
        return;
      }
      await createAssignments(0, classId, newAssignment);
      fetchAssignments(classId);
    }
    catch (err) {
      console.error("Lỗi khi gọi api tạo bài tập", err)
    }
    finally {
      setOpenAssignmentModal(false);
      setNewAssignment({ title: "", description: "", startDate: "", dueDate: "" });
      setLoading(false);
    }
  };

  const handleEditAssignmentClick = async (classId, editAssignment) => {
    setLoading(true);
    try {
      const title = editAssignment.title;
      const description = editAssignment.description;
      const startDate = editAssignment.startDate;
      const dueDate = editAssignment.dueDate;
      await updateAssignments(0, classId, editAssignment.id, { title, description, startDate, dueDate });
      setAssignments(assignments.map((a) => (a.id === editAssignment.id ? { title, description, startDate, dueDate } : a)));
    }
    catch (err) {
      console.error("Lỗi khi gọi api chỉnh sửa bài tập", err)
    }
    finally {
      setEditingAssignment(null);
      setLoading(false);
    }
  };

  const handleEditClassContentClick = async (classId, editContent) => {
    setLoading(true);
    try {
      const title = editContent.title;
      const content = editContent.content;
      await updateClassContents(0, classId, editContent.id, { title, content });
      setClassContents(classContents.map((c) => (c.id === editContent.id ? { title, content } : c)));
    }
    catch (err) {
      console.error("Lỗi khi gọi api cập nhật nội dung bài học", err)
    }
    finally {
      setEditingContent(null);
      setLoading(false);
    }
  };

  const handleDeleteClassContent = async (classId, contentId) => {
    if (!window.confirm("Bạn có chắc chắn xóa nội dung này?")) { return; }
    setLoading(true);
    try {
      await delClassContents(0, classId, contentId);
      setClassContents(classContents.filter((c) => c.id !== contentId));
    } catch (err) {
      console.error("Lỗi khi xóa nội dung lớp học: ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAssignment = async (classId, assignmentId) => {
    if (!window.confirm("Bạn có chắc chắn xóa bài tập này?")) { return; }
    setLoading(true);
    try {
      await delAssignments(0, classId, assignmentId);
      setAssignments(assignments.filter((a) => a.id !== assignmentId));
    } catch (err) {
      console.error("Lỗi khi xóa bài tập", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchClassContents = async (id) => {
    setLoading(true);
    try {
      const data = await getClassContents(0, id);
      setClassContents(data || []);
    }
    catch (error) {
      console.log("Lỗi lấy nội dung của lớp học: ", error);
    }
    finally {
      setLoading(false);
    }
  }

  const fetchAssignments = async (id) => {
    setLoading(true);
    try {
      const data = await getClassAssignments(0, id);
      setAssignments(data || []);
    }
    catch (error) {
      console.log("Lỗi lấy bài tập lớp học: ", error);
    }
    finally {
      setLoading(false);
    }
  }

  const fetchTeacherClasses = async () => {
    setLoading(true);
    try {
      const data = await getTeacherClass(0, userId);
      setClasses(data || []);
    }
    catch (error) {
      console.log("Lỗi lấy lớp học của giáo viên: ", error);
    }
    finally {
      setLoading(false);
    }
  }

  const getIdUser = async () => {
    if (token) {
      try {
        const data = await currentUserInfo();
        setUserId(data.result.id || "");
      } catch (err) {
        setUserId("");
      }
    }
  }

  const handleChangeClassData = (id) => {
    setSelectedClass(id)
    fetchClassContents(id);
    fetchAssignments(id);
  }

  useEffect(() => {
    handleChangeClassData(1);
  }, []);

  useEffect(() => {
    getIdUser();
  }, [token]);

  useEffect(() => {
    if (userId) {
      fetchTeacherClasses();
    }
  }, [userId]);


  const searchHandle = (classes, keyword) => {
    if (!keyword) return classes;
    return classes.filter((c) =>
      c.name.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const handleEdit = (cls) => {
    setEditingClass(cls);// chưa làm edit
  };

  const [searchFilter, setSearchFilter] = useState("");
  const selectedClassData = classes.find((c) => c.id === selectedClass);
  const filteredClasses = searchHandle(classes, searchFilter);


  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white shadow-lg border-r p-4">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FaChalkboardTeacher /> Lớp giảng dạy
        </h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Tìm lớp..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
          />
        </div>
        <div className="space-y-2">
          {filteredClasses.map((c) => (
            <div
              key={c.id}
              onClick={() => handleChangeClassData(c.id)}
              className={`p-3 rounded-lg cursor-pointer border ${selectedClass === c.id
                ? "bg-blue-100 border-blue-400"
                : "bg-white hover:bg-gray-50"
                }`}
            >
              <h3 className="font-semibold">{c.name}</h3>
              <p className="text-sm text-gray-500">{c.startDate}→ {c.endDate}</p>
            </div>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {!selectedClassData ? (
          <p className="text-gray-500">Chọn một lớp để quản lý</p>
        ) : (
          <div>
            <div className="mb-6">
              <div className="bg-white shadow-md rounded-2xl p-6 border-l-4 border-blue-500">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                      <FaChalkboardTeacher className="text-blue-600" />
                      {selectedClassData.name}
                    </h1>
                    <p className="text-gray-600 mt-2">{selectedClassData.description}</p>
                  </div>

                  <div className="mt-4 md:mt-0 flex gap-6 text-sm">
                    <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-xl border border-green-200">
                      <FaCalendarAlt className="text-green-600" />
                      <span>
                        <strong>Bắt đầu:</strong> {selectedClassData.startDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-red-50 px-3 py-2 rounded-xl border border-red-200">
                      <FaCalendarAlt className="text-red-600" />
                      <span>
                        <strong>Kết thúc:</strong> {selectedClassData.endDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b mb-4">
              <button
                onClick={() => setTab("content")}
                className={`px-4 py-2 font-medium ${tab === "content"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                <FaBook className="inline mr-2" />
                Nội dung
              </button>
              <button
                onClick={() => setTab("assignment")}
                className={`px-4 py-2 font-medium ${tab === "assignment"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                <FaTasks className="inline mr-2" />
                Bài tập
              </button>
            </div>

            {tab === "content" && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-bold">Danh sách nội dung</h2>
                  <button onClick={() => setOpenContentModal(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <FaPlus /> Thêm nội dung
                  </button>
                </div>

                {/* ClassContents */}
                <ul className="space-y-2">
                  {classContents.length > 0 ? classContents.map((c) => (
                    <li
                      key={c.id}
                      className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-semibold">{c.title}</h3>
                        <p className="text-sm text-gray-500">{c.content}</p>
                      </div>

                      <div className="flex gap-2">
                        {/* Nút sửa */}
                        <button
                          onClick={() => setEditingContent(c)}
                          className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                          title="Chỉnh sửa"
                        >
                          <FaEdit size={18} />
                        </button>

                        {/* Nút xóa */}
                        <button
                          onClick={() => handleDeleteClassContent(selectedClass, c.id)}
                          className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition"
                          title="Xóa"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </li>
                  ))
                    :
                    (
                      <li key={selectedClassData.id} className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md">
                        <h3 className="font-semibold">Hãy thêm nội dung cho lớp học mới!</h3>

                      </li>
                    )}
                </ul>

              </div>
            )}

            {tab === "assignment" && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-bold">Danh sách bài tập</h2>
                  <button
                    onClick={() => setOpenAssignmentModal(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    <FaPlus /> Thêm bài tập
                  </button>
                </div>

                {/* Assignments */}
                <ul className="space-y-2">

                  {assignments.length > 0 ? assignments.map((a) => (
                    <li
                      key={a.id}
                      className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-semibold">{a.title}</h3>
                        <p className="text-sm text-gray-500">{a.description}</p>
                        <p className="text-sm text-gray-500">Deadline: {a.dueDate}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <Link
                          to={`/classes/${selectedClassData.name}/assignments/${a.id}/submissions`}
                          className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                        >
                          Xem bài nộp
                        </Link>
                        <button
                          onClick={() => setEditingAssignment(a)}
                          className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                          title="Chỉnh sửa"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteAssignment(selectedClass, a.id)}
                          className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition"
                          title="Xóa"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </li>
                  ))
                    :
                    (
                      <li key={selectedClassData.id} className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md">
                        <h3 className="font-semibold">Chưa có bài tập được giao</h3>
                      </li>
                    )}

                </ul>
              </div>
            )}
            {/* Modal Thêm Content */}
            {openContentModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
                  <h2 className="text-lg font-bold mb-4">Thêm nội dung</h2>
                  <input
                    type="text"
                    placeholder="Tiêu đề"
                    value={newContent.title}
                    onChange={(e) =>
                      setNewContent({ ...newContent, title: e.target.value })
                    }
                    className="w-full border p-2 mb-3 rounded"
                  />
                  <textarea
                    placeholder="Nội dung"
                    value={newContent.content}
                    onChange={(e) =>
                      setNewContent({ ...newContent, content: e.target.value })
                    }
                    className="w-full border p-2 mb-3 rounded"
                  />
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setOpenContentModal(false)}
                      className="px-4 py-2 bg-gray-200 rounded-lg"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={() => handleAddContent(selectedClass)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Thêm Assignment */}
            {openAssignmentModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
                  <h2 className="text-lg font-bold mb-4">Thêm bài tập</h2>
                  <input
                    type="text"
                    placeholder="Tiêu đề"
                    value={newAssignment.title}
                    onChange={(e) =>
                      setNewAssignment({ ...newAssignment, title: e.target.value })
                    }
                    className="w-full border p-2 mb-3 rounded"
                  />
                  <textarea
                    placeholder="Mô tả"
                    value={newAssignment.description}
                    onChange={(e) =>
                      setNewAssignment({
                        ...newAssignment,
                        description: e.target.value,
                      })
                    }
                    className="w-full border p-2 mb-3 rounded"
                  />
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Ngày bắt đầu
                  </label>
                  <input
                    type="datetime-local"
                    value={newAssignment.startDate}
                    onChange={(e) =>
                      setNewAssignment({ ...newAssignment, startDate: e.target.value })
                    }
                    className="w-full border p-2 mb-3 rounded"
                  />
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Hạn nộp
                  </label>
                  <input
                    type="datetime-local"
                    value={newAssignment.dueDate}
                    onChange={(e) =>
                      setNewAssignment({ ...newAssignment, dueDate: e.target.value })
                    }
                    className="w-full border p-2 mb-3 rounded"
                  />
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setOpenAssignmentModal(false)}
                      className="px-4 py-2 bg-gray-200 rounded-lg"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={() => handleAddAssignment(selectedClass)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Modal chỉnh sửa content */}
            {editingContent && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
                  <h2 className="text-lg font-bold mb-4">Chỉnh sửa nội dung</h2>
                  <input
                    type="text"
                    value={editingContent.title}
                    onChange={(e) => setEditingContent({ ...editingContent, title: e.target.value })}
                    className="w-full border p-2 mb-3 rounded"
                  />
                  <textarea
                    value={editingContent.content}
                    onChange={(e) => setEditingContent({ ...editingContent, content: e.target.value })}
                    className="w-full border p-2 mb-3 rounded"
                  />
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setEditingContent(null)}
                      className="px-4 py-2 bg-gray-200 rounded-lg"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={() => handleEditClassContentClick(selectedClassData.id, editingContent)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Modal chỉnh sửa assignment */}
            {editingAssignment && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
                  <h2 className="text-lg font-bold mb-4">Chỉnh sửa bài tập</h2>
                  <input
                    type="text"
                    value={editingAssignment.title}
                    onChange={(e) => setEditingAssignment({ ...editingAssignment, title: e.target.value })}
                    className="w-full border p-2 mb-3 rounded"
                  />
                  <textarea
                    value={editingAssignment.description}
                    onChange={(e) => setEditingAssignment({ ...editingAssignment, description: e.target.value })}
                    className="w-full border p-2 mb-3 rounded"
                  />
                  <input
                    type="datetime-local"
                    value={editingAssignment.startDate?.slice(0, 16)} // format lại cho input
                    onChange={(e) => setEditingAssignment({ ...editingAssignment, startDate: e.target.value })}
                    className="w-full border p-2 mb-3 rounded"
                  />
                  <input
                    type="datetime-local"
                    value={editingAssignment.dueDate?.slice(0, 16)}
                    onChange={(e) => setEditingAssignment({ ...editingAssignment, dueDate: e.target.value })}
                    className="w-full border p-2 mb-3 rounded"
                  />
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setEditingAssignment(null)}
                      className="px-4 py-2 bg-gray-200 rounded-lg"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={() => handleEditAssignmentClick(selectedClassData.id, editingAssignment)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
        }
      </main >
    </div >
  );
}

export default TeacherDashboard;