import ManageAttendanceTable from '@/components/modules/(dashboard)/dashboard/manageAttendanceTable/ManageAttendanceTable';
import { attendanceService } from '@/services/attendance.service';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react'

const ManageAttendance = async({
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
    queryKey: ["companyAttendances", queryString],
    queryFn: () => attendanceService.getCompanyAttendance(queryString),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ManageAttendanceTable queryString={queryString} />
    </HydrationBoundary>
  )
}

export default ManageAttendance