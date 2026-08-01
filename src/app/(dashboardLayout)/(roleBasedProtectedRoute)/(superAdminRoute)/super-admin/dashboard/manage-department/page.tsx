
import ManageDepartmentTable from "@/components/modules/(dashboard)/dashboard/manageDepartmentTable/ManageDepartmentTable";
import { departmentService } from "@/services/department.service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const ManageDepartment = async ({
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
    queryKey: ["companyDepartments", queryString],
    queryFn: () => departmentService.getCompanyDepartments(queryString),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ManageDepartmentTable
        queryString={queryString}
      />
    </HydrationBoundary>
  );
};

export default ManageDepartment;
