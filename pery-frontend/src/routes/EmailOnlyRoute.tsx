import { useAppStore } from "@/store/useAppStore";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

// Allow only if email exists but token does not
export function EmailOnlyRoute({ children }: Props) {
  const email = useAppStore((s) => s.email);
  const token = useAppStore((s) => s.token);
  const language = useAppStore((s) => s.language);
  if (token && language) return <Navigate to="/topic" replace />;
  if (!email) return <Navigate to="/signup" replace />;

  return children;
}
