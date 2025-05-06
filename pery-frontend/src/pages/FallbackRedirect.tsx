import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";

export default function FallbackRedirect() {
    const navigate = useNavigate();
    const token = useAppStore((s) => s.token);
    const email = useAppStore((s) => s.email);
    const language = useAppStore((s) => s.language);

    useEffect(() => {
        if (token && email && language) {
            navigate("/topic");
        } else {
            navigate("/signup");
        }
    }, [token, email, language, navigate]);

    return null;
}
