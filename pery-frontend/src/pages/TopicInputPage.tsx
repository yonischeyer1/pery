import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import LeftPanel from "@/components/LeftPanel";
import FAQButton from "@/components/FAQButton";

export default function TopicInputPage() {
    const [topic, setTopic] = useState("");
    const setTopicGlobal = useAppStore((s) => s.setTopic); // you'll need to add this
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (topic.trim()) {
            setTopicGlobal(topic.trim());
            navigate("/article");
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <LeftPanel breakAtWord="Welcome" title="Welcome to Pery!" />

            <div className="flex-1 flex flex-col justify-center pl-[4.3%] p-6">
                <div className="w-full max-w-md space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Enter an article subject
                    </h2>

                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g. cats, France, Einstein"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                    />

                    <button
                        onClick={handleSubmit}
                        disabled={!topic.trim()}
                        className="w-[143px] h-[49px] rounded-[8px] cursor-pointer bg-color-primary text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Continue &nbsp; &gt;
                    </button>
                </div>
            </div>

            <FAQButton />
        </div>
    );
}
