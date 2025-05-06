import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "@/routes/AppRoutes";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen font-body bg-white text-gray-900">
        <AppRoutes />
      </div>
    </Router>
  );
}
