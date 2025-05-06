import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import { useArticle } from "@/hooks/useArticle";
import LeftPanel from "@/components/LeftPanel";
import FAQButton from "@/components/FAQButton";

export default function ArticlePage() {
  const topic = useAppStore((s) => s.topic);
  const token = useAppStore((s) => s.token);
  const language = useAppStore((s) => s.language);

  const navigate = useNavigate();

  // 🚫 Redirect if topic not set (e.g. reload or deep link)
  useEffect(() => {
    if (!topic) {
      navigate("/topic");
    }
  }, [topic, navigate]);

  const { data, isLoading, error } = useArticle(topic, token, language);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <LeftPanel title="Your Article" />

      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-2xl space-y-6">
          {isLoading && <p className="text-gray-500">Loading...</p>}
          {error && (
            <p className="text-red-600">
              Failed to load article. Please try a different subject.
            </p>
          )}

          {data && (
            <>
              <h1 className="text-2xl font-bold text-gray-800">
                {data.articleName}
              </h1>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {data.introduction}
              </p>
            </>
          )}

          <button
            onClick={() => navigate("/topic")}
            className="mt-6 text-sm text-blue-600 hover:underline"
          >
            ← Start Over
          </button>
        </div>
      </div>

      <FAQButton />
    </div>
  );
}
