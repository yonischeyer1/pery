import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import LeftPanel from "@/components/LeftPanel";
import FAQButton from "@/components/FAQButton";
import { useSignupMutation } from "@/hooks/useSignupMutation";

const LANGUAGES = [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
    { code: "he", label: "עברית" },
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
            <LeftPanel title="Choose Language" />

            <div className="flex-1 flex flex-col justify-center items-center p-6">
                <div className="w-full max-w-md space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Select your preferred language</h2>
                    </div>

                    <form className="space-y-4">
                        {LANGUAGES.map((lang) => (
                            <label
                                key={lang.code}
                                className={`flex items-center border rounded-md px-4 py-2 cursor-pointer transition
                  ${selected === lang.code
                                        ? "border-blue-600 bg-blue-50"
                                        : "border-gray-300 hover:bg-gray-100"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="language"
                                    value={lang.code}
                                    checked={selected === lang.code}
                                    onChange={() => setSelected(lang.code)}
                                    className="form-radio text-blue-600 mr-3"
                                />
                                <span className="text-gray-800">{lang.label}</span>
                            </label>
                        ))}
                    </form>

                    <button
                        onClick={handleContinue}
                        disabled={!selected}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        Continue →
                    </button>
                </div>
            </div>

            <FAQButton />
        </div>
    );
}
