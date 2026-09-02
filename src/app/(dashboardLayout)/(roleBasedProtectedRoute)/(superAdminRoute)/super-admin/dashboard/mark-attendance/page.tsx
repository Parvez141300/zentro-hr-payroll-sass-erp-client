import MarkAttendanceTable from '@/components/modules/(dashboard)/dashboard/markAttendanceTable/MarkAttendanceTable';
import { employeeService } from '@/services/employee.service';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react'

const MarkAttendance = async({
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
    queryKey: ["markEmployeesAttendance", queryString],
    queryFn: () => employeeService.getCompanyEmployees(queryString),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MarkAttendanceTable queryString={queryString} />
    </HydrationBoundary>
  );
}

export default MarkAttendance