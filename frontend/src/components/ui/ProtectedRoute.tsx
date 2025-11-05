import { Outlet } from "react-router-dom";
import ProtectedRoute from "../ProtectedLayout";
import Sidebar from "../../components/Sidebar";

const ProtectedLayout = () => {
  return (
    <ProtectedRoute>
      <div className="flex flex-col lg:flex-row min-h-screen w-full bg-gray-50">
        {/* Sidebar (mobile drawer handled internally) */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default ProtectedLayout;
