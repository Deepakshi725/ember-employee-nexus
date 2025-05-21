
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRole } from "@/lib/types";
import DashboardStats from "./DashboardStats";

interface RoleSpecificDashboardProps {
  role: UserRole;
}

const RoleSpecificDashboard: React.FC<RoleSpecificDashboardProps> = ({ role }) => {
  // Mock data for different role dashboards
  const getMockStats = (role: UserRole) => {
    switch (role) {
      case "master":
        return [
          { title: "Total Employees", value: 243, change: 12, icon: "user" },
          { title: "Admins", value: 8, change: 0, icon: "management" },
          { title: "Managers", value: 24, change: 4, icon: "management" },
          { title: "New Users", value: 15, change: 10, icon: "activity" },
        ];
      case "admin":
        return [
          { title: "Total Employees", value: 243, change: 12, icon: "user" },
          { title: "Managers", value: 24, change: 4, icon: "management" },
          { title: "Team Leaders", value: 32, change: 2, icon: "management" },
          { title: "New Users", value: 15, change: 10, icon: "activity" },
        ];
      case "manager":
        return [
          { title: "Team Leaders", value: 8, change: 1, icon: "management" },
          { title: "Team Members", value: 64, change: 12, icon: "user" },
          { title: "Active Projects", value: 12, change: 3, icon: "activity" },
          { title: "Pending Tasks", value: 38, change: -5, icon: "notification" },
        ];
      case "tl":
        return [
          { title: "Team Members", value: 18, change: 2, icon: "user" },
          { title: "Active Projects", value: 4, change: 1, icon: "activity" },
          { title: "Completed Tasks", value: 27, change: 8, icon: "activity" },
          { title: "Pending Tasks", value: 12, change: -3, icon: "notification" },
        ];
      case "user":
      default:
        return [
          { title: "My Tasks", value: 12, change: 3, icon: "activity" },
          { title: "Completed", value: 34, change: 12, icon: "activity" },
          { title: "Team Members", value: 18, change: 0, icon: "user" },
          { title: "Notifications", value: 5, change: 2, icon: "notification" },
        ];
    }
  };

  const renderRoleSpecificContent = () => {
    switch (role) {
      case "master":
        return (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-6">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Organizational Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Admins</span>
                    <span className="font-bold">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Managers</span>
                    <span className="font-bold">24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Team Leaders</span>
                    <span className="font-bold">32</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Users</span>
                    <span className="font-bold">179</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center justify-between">
                    <span>John Doe promoted to Manager</span>
                    <span className="text-xs text-muted-foreground">Today</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>New Admin account created</span>
                    <span className="text-xs text-muted-foreground">Yesterday</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>5 new employees onboarded</span>
                    <span className="text-xs text-muted-foreground">3 days ago</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>System update completed</span>
                    <span className="text-xs text-muted-foreground">1 week ago</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        );

      case "admin":
        return (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-6">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Department Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Engineering</span>
                    <span className="font-bold">86</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Marketing</span>
                    <span className="font-bold">34</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Sales</span>
                    <span className="font-bold">52</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>HR</span>
                    <span className="font-bold">12</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Recent Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center justify-between">
                    <span>New manager assigned to Engineering</span>
                    <span className="text-xs text-muted-foreground">Today</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Team Leader promotion request</span>
                    <span className="text-xs text-muted-foreground">Yesterday</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>3 new employees in Marketing</span>
                    <span className="text-xs text-muted-foreground">2 days ago</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Updated department structure</span>
                    <span className="text-xs text-muted-foreground">1 week ago</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        );

      case "manager":
        return (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-6">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Team Leaders</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span>David Miller</span>
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">18 Members</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Sarah Johnson</span>
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">14 Members</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Michael Brown</span>
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">12 Members</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Jessica Lee</span>
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">20 Members</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Project Completion</span>
                      <span>78%</span>
                    </div>
                    <div className="h-2 bg-secondary/50 rounded-full mt-1">
                      <div className="h-full bg-primary rounded-full" style={{ width: "78%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Team Efficiency</span>
                      <span>92%</span>
                    </div>
                    <div className="h-2 bg-secondary/50 rounded-full mt-1">
                      <div className="h-full bg-primary rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Resource Allocation</span>
                      <span>65%</span>
                    </div>
                    <div className="h-2 bg-secondary/50 rounded-full mt-1">
                      <div className="h-full bg-primary rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "tl":
        return (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-6">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>My Team</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span>Alice Smith</span>
                    <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">Developer</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Bob Johnson</span>
                    <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">Developer</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Carol Davis</span>
                    <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded">Designer</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Dave Wilson</span>
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">QA</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Project Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Website Redesign</span>
                      <span>85%</span>
                    </div>
                    <div className="h-2 bg-secondary/50 rounded-full mt-1">
                      <div className="h-full bg-primary rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Mobile App</span>
                      <span>62%</span>
                    </div>
                    <div className="h-2 bg-secondary/50 rounded-full mt-1">
                      <div className="h-full bg-primary rounded-full" style={{ width: "62%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>API Integration</span>
                      <span>44%</span>
                    </div>
                    <div className="h-2 bg-secondary/50 rounded-full mt-1">
                      <div className="h-full bg-primary rounded-full" style={{ width: "44%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "user":
      default:
        return (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-6">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>My Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span>Complete project documentation</span>
                    <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded">In Progress</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Review code changes</span>
                    <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded">In Progress</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Deploy website updates</span>
                    <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded">Pending</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Submit timesheet</span>
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">Completed</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Team Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center justify-between">
                    <span>Team meeting at 2:00 PM</span>
                    <span className="text-xs text-muted-foreground">Today</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Project deadline extended</span>
                    <span className="text-xs text-muted-foreground">Yesterday</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>New team member joining next week</span>
                    <span className="text-xs text-muted-foreground">3 days ago</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Quarterly review scheduled</span>
                    <span className="text-xs text-muted-foreground">1 week ago</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <DashboardStats stats={getMockStats(role)} />
      {renderRoleSpecificContent()}
    </div>
  );
};

export default RoleSpecificDashboard;
