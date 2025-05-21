
import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useAuth } from "@/context/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const AppLayout: React.FC = () => {
  const { state } = useAuth();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [mounted, setMounted] = useState(false);

  // Redirect to login if not authenticated
  if (!state.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Animation effect on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={cn(
      "flex min-h-screen bg-gradient-to-br from-black to-slate-900 transition-opacity duration-500",
      mounted ? "opacity-100" : "opacity-0"
    )}>
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      <main
        className={cn(
          "flex-1 flex flex-col transition-all duration-300 backdrop-blur-sm",
          sidebarOpen ? (isMobile ? "ml-0" : "ml-64") : "ml-0",
          isMobile ? "ml-0" : sidebarOpen ? "ml-64" : "ml-16"
        )}
      >
        <Navbar onToggleSidebar={toggleSidebar} />
        <div className="flex-1 p-4 md:p-6 animate-fade-in">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
