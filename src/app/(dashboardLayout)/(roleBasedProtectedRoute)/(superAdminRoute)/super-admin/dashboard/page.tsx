import SuperAdminAttendanceStats from "@/components/modules/(dashboard)/dashboard/statistics/SuperAdminAttendanceStats";
import SuperAdminLeaveStats from "@/components/modules/(dashboard)/dashboard/statistics/SuperAdminLeaveStats";
import SuperAdminPayrollStats from "@/components/modules/(dashboard)/dashboard/statistics/SuperAdminPayrollStats";
import { statsService } from "@/services/stats.service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SuperAdminAttendanceStats queryString={queryString} />
      <div className="mt-10 space-y-10">
        <SuperAdminLeaveStats />
        <SuperAdminPayrollStats />
      </div>
    </HydrationBoundary>
  );
};

export default SuperAdminDashboard;
