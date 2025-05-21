
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const ProfileForm: React.FC = () => {
  const { state, updateUser } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [name, setName] = useState(state.user?.name || "");
  const [email] = useState(state.user?.email || ""); // Email is read-only

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      updateUser({ name });
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "There was an error updating your profile.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "master":
        return "bg-purple-600";
      case "admin":
        return "bg-blue-600";
      case "manager":
        return "bg-green-600";
      case "tl":
        return "bg-amber-600";
      default:
        return "bg-gray-600";
    }
  };

  if (!state.user) return null;

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-sm border border-white/10 shadow-xl">
      <CardHeader className="text-center pb-4">
        <div className="flex flex-col items-center mb-4">
          <Avatar className="h-24 w-24 ring-2 ring-primary/30 shadow-lg">
            <AvatarFallback className="text-3xl bg-primary/10 text-primary">
              {getInitials(state.user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="mt-4">
            <CardTitle className="text-2xl bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">{state.user.name}</CardTitle>
            <div className="mt-2">
              <span
                className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getRoleBadgeClass(
                  state.user.role
                )} text-white shadow-glow`}
              >
                {state.user.role.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-black/30 border-white/10 focus:border-primary/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                value={email} 
                disabled 
                className="bg-black/20 border-white/5 text-white/70"
              />
              <p className="text-sm text-muted-foreground">
                Email cannot be changed
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={state.user.role.charAt(0).toUpperCase() + state.user.role.slice(1)}
                disabled
                className="bg-black/20 border-white/5 text-white/70"
              />
            </div>
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary/80 to-primary hover:opacity-90 transition-all duration-300 shadow-glow-sm" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
