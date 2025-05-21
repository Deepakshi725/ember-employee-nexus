
import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import RoleSpecificDashboard from "@/components/dashboard/RoleSpecificDashboard";

const DashboardPage: React.FC = () => {
  const { state } = useAuth();

  useEffect(() => {
    document.title = "Dashboard | Employee Management System";
  }, []);

  if (!state.user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground mt-2">
          Welcome back, {state.user.name}!
        </p>
      </div>

      <RoleSpecificDashboard role={state.user.role} />
    </div>
  );
};

export default DashboardPage;
