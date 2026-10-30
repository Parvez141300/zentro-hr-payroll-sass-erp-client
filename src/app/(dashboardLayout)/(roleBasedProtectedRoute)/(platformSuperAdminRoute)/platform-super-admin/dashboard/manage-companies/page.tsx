import ManageAllCompanyTable from '@/components/modules/(dashboard)/platformSuperAdminDashboard/ManageAllCompanyTable/ManageAllCompanyTable';
import { companyService } from '@/services/company.service';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react'

const ManageCompaniesPage = async({
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
    queryKey: ["manage-companies"],
    queryFn: () =>
      companyService.getAllCompany(queryString),
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 1 day
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ManageAllCompanyTable queryString={queryString} />
    </HydrationBoundary>
  );
}

export default ManageCompaniesPage