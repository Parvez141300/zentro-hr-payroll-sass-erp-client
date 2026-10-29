import ManageDepartmentHeadTable from '@/components/modules/(dashboard)/dashboard/manageDepartmentHeadTable/ManageDepartmentHeadTable';
import { departmentHeadService } from '@/services/departmentHead.service';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react'

const ManageDepartmentHead = async({
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
    queryKey: ["companyDepartmentHeads", queryString],
    queryFn: () => departmentHeadService.getCompanyDepartmentHeads(queryString),
  });
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ManageDepartmentHeadTable queryString={queryString} />
    </HydrationBoundary>
  );
}

export default ManageDepartmentHead