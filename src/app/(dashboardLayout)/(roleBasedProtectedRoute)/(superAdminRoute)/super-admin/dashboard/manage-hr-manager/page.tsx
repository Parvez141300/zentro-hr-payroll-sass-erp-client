
import ManageHrTable from "@/components/modules/(dashboard)/dashboard/manageHrTable/ManageHrTable";
import { hrService } from "@/services/hr.service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const ManageHrManager = async ({
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
    queryKey: ["companyHrManagers", queryString],
    queryFn: () => hrService.getCompanyHrs(queryString),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ManageHrTable queryString={queryString} />
    </HydrationBoundary>
  );
};

export default ManageHrManager;
