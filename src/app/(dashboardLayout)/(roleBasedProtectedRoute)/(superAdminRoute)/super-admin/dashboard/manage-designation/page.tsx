
import ManageDesignationTable from "@/components/modules/(dashboard)/dashboard/manageDesignationTable/ManageDesignationTable";
import { designationService } from "@/services/designation.service";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";

const ManageDesignation = async ({
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
    queryKey: ["companyDesignations", queryString],
    queryFn: () => designationService.getCompanyDesignations(queryString),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ManageDesignationTable queryString={queryString} />
    </HydrationBoundary>
  );
};

export default ManageDesignation;
