import ManageDepartmentHeadEmployeeTable from "@/components/modules/(dashboard)/departmentHeadDashboard/manageEmployeeTable/ManageDepartmentHeadEmployeeTable";
import { employeeService } from "@/services/employee.service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const ManageEmployee = async ({
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
    queryKey: ["companyEmployees", queryString],
    queryFn: () => employeeService.getCompanyEmployees(queryString),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ManageDepartmentHeadEmployeeTable queryString={queryString} />
    </HydrationBoundary>
  );
};

export default ManageEmployee;
