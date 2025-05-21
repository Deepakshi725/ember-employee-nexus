
import React, { useEffect } from "react";
import ProfileForm from "@/components/profile/ProfileForm";

const ProfilePage: React.FC = () => {
  useEffect(() => {
    document.title = "Profile | Employee Management System";
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
        <p className="text-muted-foreground">
          View and update your profile information
        </p>
      </div>

      <ProfileForm />
    </div>
  );
};

export default ProfilePage;
