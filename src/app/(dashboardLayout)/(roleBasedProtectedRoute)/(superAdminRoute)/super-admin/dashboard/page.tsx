import { statsService } from "@/services/stats.service";
import { QueryClient } from "@tanstack/react-query";
import React from "react";

const SuperAdminDashboard = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const queryParamsObject = await searchParams;
  
    const queryString = Object.keys(queryParamsObject)
      .map((key) => `${key}=${queryParamsObject[key]}`)
      .join("&");
  
    const queryClient = new QueryClient();
  
    await queryClient.prefetchQuery({
      queryKey: ["super-admin-attendance-stats", queryString],
      queryFn: () => statsService.getAttendanceStats(queryString),
    });

  return <div>SuperAdminDashboard</div>;
};

export default SuperAdminDashboard;
