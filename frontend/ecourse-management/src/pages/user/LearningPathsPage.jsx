import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { getMyLearningPath, updateLearningPath, createLearningPath, deleteLearningPath } from "../../services/leaningPathService";
import AIChat from "../../components/AIChat";


function LearningPathsPage() {
    const [openChat, setOpenChat] = useState(false);
    const [loading, setLoading] = useState(false);
    const [myLearningPaths, setMyLearningPaths] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [editingPath, setEditingPath] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        startDate: "",
        endDate: ""
    });

    const fectchMyLearningPaths = async () => {
        console.log("Fetching learning paths...");
        try {
            const data = await getMyLearningPath();
            setMyLearningPaths(data || []);
        } catch (err) {
            setMyLearningPaths([]);
        }
    }

    useEffect(() => {
        fectchMyLearningPaths();
    }, []);

    const handleOpenModal = (learningPath = null) => {
        setEditingPath(learningPath);
        setFormData(
            learningPath || { title: "", description: "", startDate: "", endDate: "" }
        );
        setOpenModal(true);
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            if (editingPath) {
                if (!formData.title || !formData.startDate || !formData.endDate) {
                    alert("Phải có tiêu đề, ngày bắt đầu và ngày kết thúc!");
                    setLoading(false);
                    return;
                }
                else if (formData.startDate > formData.endDate) {
                    alert("Ngày bắt đầu và ngày kết thúc không hợp lệ!");
                    setLoading(false);
                    return;
                }
                await updateLearningPath(editingPath.id, formData);
                alert("Cập nhật lộ trình học thành công!");
                setMyLearningPaths((prev) =>
                    prev.map((p) => (p.id === editingPath.id ? { ...p, ...formData } : p))
                );
                setLoading(false);
            } else {
                if (!formData.title || (!formData.startDate && !formData.endDate)) {
                    alert("Tiêu đề không được để trống và có ngày bắt đầu hoặc kết thúc!");
                    setLoading(false);
                    return;
                }
                else if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
                    alert("Ngày bắt đầu và ngày kết thúc không hợp lệ!");
                    setLoading(false);
                    return;
                }
                await createLearningPath(formData);
                alert("Tạo lộ trình học thành công!");
                setMyLearningPaths((prev) => [...prev, { ...formData, id: Date.now() }]);
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
        }
        finally {
            setOpenModal(false);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            if (window.confirm("Bạn có chắc chắn muốn xóa lộ trình này?")) {
                await deleteLearningPath(id);
                alert("Xóa lộ trình học thành công!");
                setMyLearningPaths((prev) => prev.filter((p) => p.id !== id));
            }
            setLoading(false);
            return;
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Lộ trình học của tôi</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                >
                    <FaPlus /> Thêm lộ trình
                </button>
            </div>

            {/* Danh sách */}
            <div className="grid gap-4">
                {myLearningPaths.map((lp) => (
                    <div
                        key={lp.id}
                        className="bg-white p-4 rounded-xl shadow flex justify-between items-start"
                    >
                        <div>
                            <h2 className="text-lg font-semibold">{lp.title}</h2>
                            <p className="text-gray-600">{lp.description}</p>
                            <p className="text-sm text-gray-500 mt-1">
                                {lp.startDate} → {lp.endDate}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleOpenModal(lp)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            >
                                <FaEdit />
                            </button>
                            <button
                                onClick={() => handleDelete(lp.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {openModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
                        <h2 className="text-xl font-bold mb-4">
                            {editingPath ? "Chỉnh sửa lộ trình" : "Thêm lộ trình mới"}
                        </h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Tiêu đề*"
                                className="w-full border rounded-lg p-2"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({ ...formData, title: e.target.value })
                                }
                            />
                            <textarea
                                rows="3"
                                placeholder="Mô tả"
                                className="w-full border rounded-lg p-2"
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                            />
                            <div className="flex gap-4">
                                <div className="flex-1 flex flex-col">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        *Ngày bắt đầu:
                                    </label>
                                    <input
                                        type="date"
                                        className="flex-1 border rounded-lg p-2"
                                        value={formData.startDate}
                                        onChange={(e) =>
                                            setFormData({ ...formData, startDate: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="flex-1 flex flex-col">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        *Ngày kết thúc:
                                    </label>
                                    <input
                                        type="date"
                                        className="flex-1 border rounded-lg p-2"
                                        value={formData.endDate}
                                        onChange={(e) =>
                                            setFormData({ ...formData, endDate: e.target.value })
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setOpenModal(false)}
                                className="px-4 py-2 rounded-lg border"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white"
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/*  Chat Widget  */}
            <div className="fixed bottom-6 right-6 w-80 bg-white rounded-xl shadow-lg flex flex-col z-50">
                <div
                    className="bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                    onClick={() => setOpenChat(!openChat)}
                >
                    {openChat ? "Thu gọn Chat" : "Hỏi AI"}
                </div>
                <AIChat openChat={openChat} />
            </div>
        </div>
    );
}

export default LearningPathsPage;
