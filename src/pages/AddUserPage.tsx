
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "@/components/users/UserForm";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const AddUserPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Add User | Employee Management System";
  }, []);

  const handleSubmit = async (userData: Partial<User>) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Success toast
      toast({
        title: "User Created",
        description: `${userData.name} has been added successfully.`,
      });
      
      // Navigate back to users page
      navigate("/users");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create user. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/users")}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Add New User</h2>
          <p className="text-muted-foreground">
            Create a new user account in the system
          </p>
        </div>
      </div>

      <UserForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
};

export default AddUserPage;
