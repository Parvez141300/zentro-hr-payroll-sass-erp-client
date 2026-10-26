import PayrollTable from '@/components/modules/(dashboard)/employeeDashboard/payroll/PayrollTable';
import { payrollService } from '@/services/payroll.service';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react'

const PayrollPage = async({
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
    queryKey: ["companyEmployeePayrolls", queryString],
    queryFn: () => payrollService.getCompanyPayroll(queryString),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PayrollTable queryString={queryString} />
    </HydrationBoundary>
  );
}

export default PayrollPage