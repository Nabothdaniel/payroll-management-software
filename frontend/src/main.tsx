import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext";



// Pages
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import PaymentCycle from "./pages/Paymentcycle";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

import "./index.css";
import "aos/dist/aos.css";

const queryClient = new QueryClient();

/**
 * Protected Layout with Sidebar and Outlet for nested pages
 */
import ProtectedLayout from "./components/ui/ProtectedRoute";

/**
 * Router Configuration
 */
const router = createBrowserRouter([

  {
    path: "/",
    element: <Auth />,
  },
  {
    element: <ProtectedLayout />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/employees", element: <Employees /> },
      { path: "/payment-cycle", element: <PaymentCycle /> },
      { path: "/analytics", element: <Analytics /> },
      { path: "/settings", element: <Settings /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster position="top-right" />
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
