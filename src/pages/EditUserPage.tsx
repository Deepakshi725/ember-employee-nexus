
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserForm from "@/components/users/UserForm";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2 } from "lucide-react";

const EditUserPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Edit User | Employee Management System";
    
    // Simulate API call to fetch user data
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Mock user data - in a real app, fetch from API
        const mockUser: User = {
          id: id || "0",
          name: "Sample User",
          email: "sample@example.com",
          role: "user",
          tlId: "4",
          managerId: "3",
          createdAt: new Date(),
        };
        
        setUser(mockUser);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load user data. Please try again.",
          variant: "destructive",
        });
        navigate("/users");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUser();
  }, [id, navigate, toast]);

  const handleSubmit = async (userData: Partial<User>) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Success toast
      toast({
        title: "User Updated",
        description: `${userData.name} has been updated successfully.`,
      });
      
      // Navigate back to users page
      navigate("/users");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user. Please try again.",
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
          <h2 className="text-3xl font-bold tracking-tight">Edit User</h2>
          <p className="text-muted-foreground">
            Update user information and role
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : user ? (
        <UserForm 
          user={user} 
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting} 
        />
      ) : (
        <div className="text-center py-10">
          <p>User not found</p>
          <Button 
            variant="link" 
            onClick={() => navigate("/users")}
          >
            Back to Users
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditUserPage;
