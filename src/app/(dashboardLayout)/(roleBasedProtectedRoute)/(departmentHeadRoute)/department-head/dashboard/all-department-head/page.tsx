import AllDepartmentHeadTable from '@/components/modules/(dashboard)/departmentHeadDashboard/AllDepartmentHeadTable/AllDepartmentHeadTable';
import { departmentHeadService } from '@/services/departmentHead.service';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react'

const AllDepartmentHead = async({
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
    queryKey: ["all-department-heads", queryString],
    queryFn: () => departmentHeadService.getCompanyDepartmentHeads(queryString),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AllDepartmentHeadTable queryString={queryString} />
    </HydrationBoundary>
  );
}

export default AllDepartmentHead