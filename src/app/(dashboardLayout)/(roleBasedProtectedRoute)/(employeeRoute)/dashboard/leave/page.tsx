import EmployeeLeaveTable from "@/components/modules/(dashboard)/employeeDashboard/leave/EmployeeLeaveTable";
import { leaveService } from "@/services/leave.service";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";

const LeavePage = async({
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
    queryKey: ["companyEmployeeLeaves", queryString],
    queryFn: () => leaveService.getCompanyLeaves(queryString),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EmployeeLeaveTable queryString={queryString} />
    </HydrationBoundary>
  );
};

export default LeavePage;
