
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import UserTable from "@/components/users/UserTable";
import UserFilters from "@/components/users/UserFilters";
import { useAuth } from "@/context/AuthContext";
import { User, UserRole } from "@/lib/types";

const UsersPage: React.FC = () => {
  const { state } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole | "all">("all");

  useEffect(() => {
    document.title = "User Management | Employee Management System";
  }, []);

  // Mock user data
  const mockUsers: User[] = [
    {
      id: "1",
      name: "Master Admin",
      email: "master@example.com",
      role: "master",
      createdAt: new Date(2023, 0, 15),
    },
    {
      id: "2",
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      createdAt: new Date(2023, 1, 20),
    },
    {
      id: "3",
      name: "Manager User",
      email: "manager@example.com",
      role: "manager",
      createdAt: new Date(2023, 2, 10),
    },
    {
      id: "4",
      name: "Team Leader",
      email: "tl@example.com",
      role: "tl",
      managerId: "3",
      createdAt: new Date(2023, 3, 5),
    },
    {
      id: "5",
      name: "Basic User",
      email: "user@example.com",
      role: "user",
      tlId: "4",
      managerId: "3",
      createdAt: new Date(2023, 4, 1),
    },
    {
      id: "6",
      name: "Another Manager",
      email: "manager2@example.com",
      role: "manager",
      createdAt: new Date(2023, 1, 15),
    },
    {
      id: "7",
      name: "Another TL",
      email: "tl2@example.com",
      role: "tl",
      managerId: "6",
      createdAt: new Date(2023, 2, 20),
    },
    {
      id: "8",
      name: "John Smith",
      email: "john@example.com",
      role: "user",
      tlId: "7",
      managerId: "6",
      createdAt: new Date(2023, 3, 10),
    },
    {
      id: "9",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "user",
      tlId: "7",
      managerId: "6",
      createdAt: new Date(2023, 4, 5),
    },
    {
      id: "10",
      name: "Robert Davis",
      email: "robert@example.com",
      role: "user",
      tlId: "4",
      managerId: "3",
      createdAt: new Date(2023, 5, 1),
    },
  ];

  // Filter users based on role and search term
  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearchTerm =
      searchTerm === "" ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    
    return matchesSearchTerm && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">
            Manage your employees and their roles
          </p>
        </div>
        <Button onClick={() => navigate("/users/add")}>
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      <UserFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
      />

      <UserTable users={filteredUsers} />
    </div>
  );
};

export default UsersPage;
