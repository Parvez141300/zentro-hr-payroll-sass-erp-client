import ManageLeaveTypeTable from "@/components/modules/(dashboard)/dashboard/manageLeaveTypeTable/ManageLeaveTypeTable";
import { leaveTypeService } from "@/services/leaveType.service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const ManageLeaveType = async ({
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
    queryKey: ["companyLeaveTypes", queryString],
    queryFn: () => leaveTypeService.getCompanyLeaveTypes(queryString),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ManageLeaveTypeTable queryString={queryString} />
    </HydrationBoundary>
  );
};

export default ManageLeaveType;
