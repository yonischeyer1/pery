import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import LeftPanel from "@/components/LeftPanel";
import FAQButton from "@/components/FAQButton";
import { useSignupMutation } from "@/hooks/useSignupMutation";

const LANGUAGES = [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
    { code: "es", label: "Español" },
];

export default function LanguageSelection() {
    const navigate = useNavigate();
    const email = useAppStore((s) => s.email);
    const savedLanguage = useAppStore((s) => s.language);
    const setLanguage = useAppStore((s) => s.setLanguage);
    const setToken = useAppStore((s) => s.setToken);
    const [selected, setSelected] = useState(savedLanguage);
    const { mutate: signup } = useSignupMutation();

    const handleContinue = () => {
        setLanguage(selected);
        signup(
            { userName: email, language: selected }, // backend default lang
            {
                onSuccess: (data) => {
                    setToken(data.token);
                    navigate("/topic");
                },
            }
        );
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <LeftPanel breakAtWord="Welcome" title="Welcome to Pery!" />

            <div className="flex-1 flex flex-col justify-center pl-[4.3%] p-6">
                <div className="w-full max-w-md space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Select your preferred language</h2>
                    </div>

                    <form className="space-y-4">
                        {LANGUAGES.map((lang) => (
                            <label
                                key={lang.code}
                                onClick={() => setSelected(lang.code)}
                                className={`flex items-center  rounded-lg px-4 py-3 cursor-pointer transition
                               ${selected === lang.code
                                        ? "none"
                                        : "border-gray-300 hover:bg-gray-100"
                                    }`}
                            >
                                {/* Custom radio with checkmark */}
                                <div
                                    className={`w-5 h-5 mr-3 flex items-center justify-center rounded-full border-2
                                   ${selected === lang.code ? "border-purple-600 bg-purple-600" : "border-gray-400"}`}
                                >
                                    {selected === lang.code && (
                                        <svg
                                            className="w-3 h-3 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>

                                <span className="text-gray-900 text-base">{lang.label}</span>
                            </label>
                        ))}


                    </form>

                    <button
                        onClick={handleContinue}
                        disabled={!selected}
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
