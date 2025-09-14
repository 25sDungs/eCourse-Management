import React, { useState, useEffect, useRef } from "react";
import { aiChat } from "../services/aiChat";

const AIChat = ({ openChat }) => {
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");
    const chatEndRef = useRef(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages]);

    const handleSend = async () => {
        if (!chatInput.trim()) return;

        const userMessage = { role: "user", content: chatInput };
        setChatMessages(prev => [...prev, userMessage]);
        setChatInput("");
        try {
            setLoading(true);
            const response = await aiChat(chatInput);
            const aiMessage = { role: "ai", content: response.data };
            setChatMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage = { role: "ai", content: "Mất kết nối!" };
            setChatMessages(prev => [...prev, errorMessage]);
        }
        finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") handleSend();
    };

    if (!openChat) return null;

    return (
        <div className="flex flex-col h-96 p-2">
            <div className="flex-1 overflow-y-auto space-y-2 mb-2">
                {chatMessages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`p-2 rounded-lg max-w-[80%] ${msg.role === "user" ? "bg-blue-100 self-end" : "bg-gray-200 self-start"
                            }`}
                    >
                        {msg.content}
                    </div>
                ))}
                <div ref={chatEndRef}></div>
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    className="flex-1 border rounded-lg p-2"
                    placeholder={!loading ? "Nhập tin nhắn..." : "Chờ trả lời..."}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={handleSend}
                    disabled={loading}
                >
                    Gửi
                </button>
            </div>
        </div>
    );
};

export default AIChat;
