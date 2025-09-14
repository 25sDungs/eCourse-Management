import api from "./apis";


export const getMyCertificate = async () => {
    try {
        const response = await api.get(`/certifications/me`);
        return response.data;
    } catch (error) {
        console.error('Error fetching certifications:', error);
        throw error;
    }
}

export const downloadCertificate = async (id, title) => {
    try {
        const response = await api.get(`/certifications/${id}/download`, {
            responseType: "blob",
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${title}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    }
    catch (err) {
        console.error('Error download certification:', err);
        throw err;
    }

} 