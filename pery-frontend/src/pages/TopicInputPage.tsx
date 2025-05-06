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
      <LeftPanel title="Let's Explore" />

      <div className="flex-1 flex flex-col justify-center items-center p-6">
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
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            Fetch Article
          </button>
        </div>
      </div>

      <FAQButton />
    </div>
  );
}
