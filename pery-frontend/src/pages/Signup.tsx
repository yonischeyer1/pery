import LeftPanel from "@/components/LeftPanel";
import FAQButton from "@/components/FAQButton";
import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "@/hooks/useSignupMutation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const setEmailGlobal = useAppStore((s) => s.setEmail);
  const setToken = useAppStore((s) => s.setToken);
  const setLanguage = useAppStore((s) => s.setLanguage);
  
  const { mutate: signup } = useSignupMutation();

  const handleContinue = () => {
    signup(
      { userName: email },
      {
        onSuccess: (data) => {
          setEmailGlobal(email);
          setToken(data.token);
          if(data.language) {
            setLanguage(data.language)
            navigate("/topic");
          } else {
            navigate("/language");
          }
        },
      }
    );
  };
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <LeftPanel title="Welcome to Pery!" />

      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-md space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">MHE sign-up</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="me@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <button onClick={handleContinue} className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Continue →
          </button>

          <p className="text-xs text-gray-400 text-center">
            🔒 By clicking "continue" I agree to Pery’s terms
          </p>
        </div>
      </div>

      <FAQButton />
    </div>
  );
}
