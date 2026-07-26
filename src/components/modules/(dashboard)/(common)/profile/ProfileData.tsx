"use client";
import { getClientLoggedInUserInfo } from "@/actions/auth.action";
import { UserRole } from "@/types/enums.type";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import SuperAdminProfile from "./superAdminProfile/SuperAdminProfile";

const ProfileData = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user-info"],
    queryFn: () => getClientLoggedInUserInfo(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-500">
          <p>Error loading profile</p>
          <p className="text-sm">{error?.message || "No data found"}</p>
        </div>
      </div>
    );
  }

  const userData = data.data;
  const role = userData.role;

  const renderProfile = () => {
    switch (role) {
      // case UserRole.PLATFORM_SUPER_ADMIN:
      //   return (
      //     <PlatformSuperAdminProfile
      //       userData={{
      //         ...baseProps,
      //         platformSuperAdmin: userData.platformSuperAdmin,
      //       }}
      //     />
      //   );
      case UserRole.SUPER_ADMIN:
        return (
          <SuperAdminProfile
            userData={{
              ...userData,
            }}
          />
        );
      // case UserRole.HR_MANAGER:
      //   return (
      //     <HrManagerProfile
      //       userData={{
      //         ...baseProps,
      //         hrManager: userData.hrManager,
      //       }}
      //     />
      //   );
      // case UserRole.ACCOUNTANT:
      //   return (
      //     <AccountantProfile            userData={{
      //         ...baseProps,
      //         accountant: userData.accountant,
      //       }}
      //     />
      //   );
      // case UserRole.DEPARTMENT_HEAD:
      //   return (
      //     <DepartmentHeadProfile
      //       userData={{
      //         ...baseProps,
      //         departmentHead: userData.departmentHead,
      //       }}
      //     />
      //   );
      // case UserRole.EMPLOYEE:
      //   return (
      //     <EmployeeProfile
      //       userData={{
      //         ...baseProps,
      //         employee: userData.employee,
      //       }}
      //     />
      //   );
      default:
        return (
          <div className="text-center text-red-500">
            <p>Unknown role: {role}</p>
          </div>
        );
    }
  };

  console.log("this is from profile data", data);
  return <div className="container mx-auto py-8 px-4">{renderProfile()}</div>;
};

export default ProfileData;
