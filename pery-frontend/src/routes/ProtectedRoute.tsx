import { useAppStore } from "@/store/useAppStore";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

// Only allow access if token exists
export default function ProtectedRoute({ children }: Props) {
  const token = useAppStore((s) => s.token);
  const language = useAppStore((s) => s.language);

  if (!token || !language) {
    return <Navigate to="/signup" replace />;
  }

  return children;
}
