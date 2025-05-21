
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole, User } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface UserFormProps {
  user?: User;
  onSubmit: (userData: Partial<User>) => void;
  isSubmitting?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  user,
  onSubmit,
  isSubmitting = false,
}) => {
  const { state, canManageRole } = useAuth();
  const { toast } = useToast();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState<UserRole>(user?.role || "user");
  const [managerId, setManagerId] = useState(user?.managerId || "");
  const [tlId, setTlId] = useState(user?.tlId || "");

  // Only allow selecting roles the current user can manage
  const availableRoles: UserRole[] = ["user", "tl", "manager", "admin", "master"].filter(
    (r) => canManageRole(r as UserRole)
  );

  // Mock data for managers and TLs
  const managers = [
    { id: "3", name: "Manager User" },
    { id: "6", name: "Another Manager" },
  ];

  const teamLeaders = [
    { id: "4", name: "Team Leader" },
    { id: "7", name: "Another TL" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Create user data object
    const userData: Partial<User> = {
      name,
      email,
      role,
    };

    // Only include these fields if they have values
    if (managerId) userData.managerId = managerId;
    if (tlId) userData.tlId = tlId;

    onSubmit(userData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto card-gradient">
      <CardHeader>
        <CardTitle>{user ? "Edit User" : "Add New User"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={role}
                onValueChange={(value) => setRole(value as UserRole)}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {availableRoles.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {(role === "user" || role === "tl") && (
              <div className="space-y-2">
                <Label htmlFor="managerId">Manager</Label>
                <Select
                  value={managerId}
                  onValueChange={setManagerId}
                >
                  <SelectTrigger id="managerId">
                    <SelectValue placeholder="Select manager" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {managers.map((manager) => (
                      <SelectItem key={manager.id} value={manager.id}>
                        {manager.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {role === "user" && (
              <div className="space-y-2">
                <Label htmlFor="tlId">Team Leader</Label>
                <Select
                  value={tlId}
                  onValueChange={setTlId}
                >
                  <SelectTrigger id="tlId">
                    <SelectValue placeholder="Select team leader" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {teamLeaders.map((tl) => (
                      <SelectItem key={tl.id} value={tl.id}>
                        {tl.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {user ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>{user ? "Update User" : "Create User"}</>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserForm;
