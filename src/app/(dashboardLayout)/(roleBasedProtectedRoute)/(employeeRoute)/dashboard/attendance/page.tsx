import AttendanceTable from "@/components/modules/(dashboard)/employeeDashboard/attendance/AttendanceTable";
import { attendanceService } from "@/services/attendance.service";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";

const AttendancePage = async ({
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
    queryKey: ["companyEmployeeAttendances", queryString],
    queryFn: () => attendanceService.getCompanyAttendance(queryString),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AttendanceTable queryString={queryString} />
    </HydrationBoundary>
  )
};

export default AttendancePage;
