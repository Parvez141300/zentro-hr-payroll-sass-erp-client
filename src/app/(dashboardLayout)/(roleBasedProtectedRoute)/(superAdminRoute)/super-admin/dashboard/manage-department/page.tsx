import { getCompanyDepartments } from "@/actions/department.action";
import ManageDepartmentTable from "@/components/modules/(dashboard)/dashboard/manageDepartmentTable/ManageDepartmentTable";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const ManageDepartment = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["companyDepartments"],
    queryFn: () => getCompanyDepartments(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ManageDepartmentTable />
    </HydrationBoundary>
  );
};

export default ManageDepartment;
