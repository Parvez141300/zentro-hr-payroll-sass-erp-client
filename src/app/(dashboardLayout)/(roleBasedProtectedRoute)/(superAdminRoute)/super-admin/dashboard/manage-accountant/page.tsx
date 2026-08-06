import ManageAccountantTable from "@/components/modules/(dashboard)/dashboard/manageAccountantTable/ManageAccountantTable";
import { accountantService } from "@/services/accountant.service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const ManageAccountant = async ({
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
    queryKey: ["companyAccountants", queryString],
    queryFn: () => accountantService.getCompanyAccountants(queryString),
  });
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ManageAccountantTable queryString={queryString} />
    </HydrationBoundary>
  );
};

export default ManageAccountant;
