import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Signup from "@/pages/Signup";
import LanguageSelection from "@/pages/LanguageSelection"; // assuming it exists
import PageTransition from "@/components/PageTransition";
import FallbackRedirect from "@/pages/FallbackRedirect";
import TopicInputPage from "@/pages/TopicInputPage";
import ArticlePage from "@/pages/ArticlePage";
import ProtectedRoute from "./ProtectedRoute";
import { EmailOnlyRoute } from "./EmailOnlyRoute";

export default function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="*" element={<FallbackRedirect />} />
        <Route
          path="/signup"
          element={
            <PageTransition>
              <Signup />
            </PageTransition>
          }
        />
        <Route
          path="/language"
          element={
            <EmailOnlyRoute>
              <PageTransition>
                <LanguageSelection />
              </PageTransition>
            </EmailOnlyRoute>
          }
        />
        <Route
          path="/topic"
          element={
            <ProtectedRoute>
              <PageTransition>
                <TopicInputPage />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/article"
          element={
            <ProtectedRoute>
              <PageTransition>
                <ArticlePage />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <div className="p-8 text-center">404 Not Found</div>
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
