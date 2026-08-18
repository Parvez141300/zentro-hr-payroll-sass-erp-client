import ManageLeaveTable from "@/components/modules/(dashboard)/dashboard/manageLeaveTable/ManageLeaveTable";
import { leaveService } from "@/services/leave.service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const ManageLeave = async ({
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
    queryKey: ["companyLeaves", queryString],
    queryFn: () => leaveService.getCompanyLeaves(queryString),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ManageLeaveTable queryString={queryString} />
    </HydrationBoundary>
  );
};

export default ManageLeave;
