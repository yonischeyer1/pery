import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
    email: string;
    language: string;
    token: string;
    topic: string;
    setEmail: (email: string) => void;
    setLanguage: (lang: string) => void;
    setToken: (token: string) => void;
    setTopic: (topic: string) => void;
    reset: () => void;
  }
  
  export const useAppStore = create<AppState>()(
    persist(
      (set) => ({
        email: "",
        language: "",
        token: "",
        topic: "",
        setEmail: (email) => set({ email }),
        setLanguage: (language) => set({ language }),
        setToken: (token) => set({ token }),
        setTopic: (topic) => set({ topic }),
        reset: () => set({ email: "", language: "", token: "", topic: "" }),
      }),
      { name: "pery-user-storage" }
    )
  );
  
