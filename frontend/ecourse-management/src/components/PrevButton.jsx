import { useNavigate } from "react-router-dom";

const PrevButton = ({ className = "" }) => {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate(-1)}
            className={className}
        >
            ⬅ Quay lại
        </button>
    );
};

export default PrevButton;
