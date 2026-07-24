import ProfileData from "@/components/modules/(dashboard)/(common)/profile/ProfileData";
import { authService } from "@/services/auth.service";
import { QueryClient } from "@tanstack/react-query";
import React from "react";

const ProfilePage = async() => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["user-info"],
    queryFn: () => authService.getClientLoggedInUserInfo(),
  });
  return (
    <div>
      ProfilePage
      <ProfileData />
    </div>
  );
};

export default ProfilePage;
