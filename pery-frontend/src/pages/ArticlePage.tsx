import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import { useArticle } from "@/hooks/useArticle";
import LeftPanel from "@/components/LeftPanel";
import FAQButton from "@/components/FAQButton";
import successHandsImage from "@/assets/images/successHands.png";

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
            <LeftPanel breakAtWord="read" title="All set! read your article" />

            <div className="flex-1 flex flex-col justify-center pl-[4.3%] p-6">
                <div className="w-full max-w-2xl space-y-6">
                    {isLoading && <p className="text-gray-500">Loading...</p>}
                    {error && (
                        <p className="text-red-600">
                            Failed to load article. Please try a different subject.
                        </p>
                    )}

                    {data && (
                        <>
                            <img
                                width={289}
                                height={205}
                                src={successHandsImage}
                                alt="Success"
                            />
                            <h1 className="text-2xl font-bold text-gray-800">
                                {'All set! Here\'s your article:'}
                            </h1>
                            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                                {data.introduction}
                            </p>
                        </>
                    )}

                    <button
                        onClick={() => navigate("/topic")}
                        className="w-[169px] h-[49px] rounded-[8px] cursor-pointer bg-color-primary text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Start Over
                    </button>
                </div>
            </div>

            <FAQButton />
        </div>
    );
}
