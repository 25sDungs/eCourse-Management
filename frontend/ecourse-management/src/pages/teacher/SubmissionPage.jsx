import { useEffect, useState } from "react";
import { FaDownload, FaSave, FaTimes } from "react-icons/fa";
import { getDownloadSubmission, getSubmissionsByAssignmentId, updateSubmission } from "../../services/submissionService";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import PrevButton from "../../components/PrevButton";

function SubmissionsPage() {
    const { assignmentId, className } = useParams();

    const [submissions, setSubmissions] = useState([]);
    const [originalSubmissions, setOriginalSubmissions] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchSubmissions = async () => {
        setLoading(true);
        try {
            const data = await getSubmissionsByAssignmentId(assignmentId);
            setSubmissions(data);
            setOriginalSubmissions(data);
        } catch (err) {
            console.error("Lỗi khi lấy api get submissions:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, [assignmentId]);

    const handleCancelSingle = (id) => {
        const original = originalSubmissions.find((s) => s.id === id);
        setSubmissions((prev) =>
            prev.map((s) => (s.id === id ? { ...original } : s))
        );
    };

    const handleCancelAll = () => {
        setSubmissions(originalSubmissions.map((s) => ({ ...s })));
    };

    const handleChange = (id, field, value) => {
        setSubmissions((prev) =>
            prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
        );
    };

    const handleUpdateSingle = async (submission) => {
        try {
            const score = submission.score;
            const judge = submission.judge;

            await updateSubmission(assignmentId, submission.id, { judge, score });
            alert(`Đã lưu điểm cho ${submission.studentUsername}`);
            fetchSubmissions();
        } catch (err) {
            console.error("Lỗi khi gọi api lưu 1 học viên:", err);
        }
    };

    const handleUpdateAll = async () => {
        try {
            await Promise.all(
                submissions.map((s) =>
                    updateSubmission(assignmentId, s.id, {
                        score: s.score,
                        judge: s.judge,
                    })
                )
            );
            alert("Đã lưu toàn bộ chỉnh sửa");
            fetchSubmissions();
        } catch (err) {
            console.error("Lỗi khi gọi api lưu tất cả:", err);
        }
    };

    const exportPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text(`SCORE REPORT - ${className}`, 14, 20);

        const tableColumn = ["Student", "Submit Time", "Score", "Assessment"];
        const tableRows = submissions.map((s) => [
            s.studentUsername,
            new Date(s.submitTime).toLocaleString(),
            s.score ?? "Chưa chấm",
            s.judge ?? "",
        ]);

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 30,
            styles: { fontSize: 10 },
        });

        doc.save(`assignment_${assignmentId}_${className}_bangdiem.pdf`);
    };


    const handleDownload = async (submissionId) => {
        try {
            const response = await getDownloadSubmission(submissionId);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            const contentDisposition = response.headers["content-disposition"];
            let fileName = "downloaded-file";
            if (contentDisposition) {
                const match = contentDisposition.match(/filename="(.+)"/);
                if (match.length > 1) fileName = match[1];
            }
            link.setAttribute("download", fileName);

            document.body.appendChild(link);
            link.click();
            link.remove();

        }
        catch (err) {
            console.error("Download api error:", err);
        }
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <PrevButton className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 shadow-md" />
                <h1 className="text-2xl font-bold">
                    Danh sách bài nộp – bài tập {assignmentId} lớp: {className}
                </h1>
                <div className="flex gap-2">
                    <button
                        onClick={handleUpdateAll}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700"
                    >
                        <FaSave /> Lưu tất cả
                    </button>
                    <button
                        onClick={handleCancelAll}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg flex items-center gap-2 hover:bg-gray-600"
                    >
                        <FaTimes /> Hủy tất cả
                    </button>
                </div>
            </div>

            {loading ? (
                <p>Đang tải dữ liệu...</p>
            ) : submissions.length === 0 ? (
                <p className="text-gray-500">Chưa có học viên nào nộp bài.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border rounded-xl shadow-md">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 border-b text-left">Học viên</th>
                                <th className="py-3 px-4 border-b">File</th>
                                <th className="py-3 px-4 border-b">Thời gian nộp</th>
                                <th className="py-3 px-4 border-b">Điểm</th>
                                <th className="py-3 px-4 border-b">Nhận xét</th>
                                <th className="py-3 px-4 border-b"> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.map((s) => (
                                <tr key={s.id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b font-medium">
                                        {s.studentUsername}
                                    </td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <button
                                            onClick={() => handleDownload(s.id)}
                                            className="text-blue-600 hover:underline flex items-center gap-2 justify-center"
                                        >
                                            <FaDownload /> Tải file
                                        </button>
                                    </td>
                                    <td className="py-2 px-4 border-b text-center">
                                        {new Date(s.submitTime).toLocaleString()}
                                    </td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <input
                                            type="number"
                                            value={s.score ?? ""}
                                            onChange={(e) =>
                                                handleChange(s.id, "score", e.target.value)
                                            }
                                            className="border px-2 py-1 rounded w-20 text-center"
                                        />
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <input
                                            type="text"
                                            value={s.judge ?? ""}
                                            onChange={(e) =>
                                                handleChange(s.id, "judge", e.target.value)
                                            }
                                            className="border px-2 py-1 rounded w-full"
                                            placeholder="Nhập nhận xét..."
                                        />
                                    </td>
                                    <td className="py-2 px-4 border-b text-center flex gap-2 justify-center">
                                        <button
                                            onClick={() => handleUpdateSingle(s)}
                                            className="px-3 py-1 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600"
                                        >
                                            <FaSave size={14} /> Lưu
                                        </button>
                                        <button
                                            onClick={() => handleCancelSingle(s.id)}
                                            className="px-3 py-1 bg-gray-400 text-white rounded-lg flex items-center gap-2 hover:bg-gray-500"
                                        >
                                            <FaTimes size={14} /> Hủy
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                        onClick={exportPDF}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 mt-4 ml-auto"
                    >
                        <FaDownload /> Xuất PDF
                    </button>
                </div>
            )}
        </div>
    );
}


export default SubmissionsPage;