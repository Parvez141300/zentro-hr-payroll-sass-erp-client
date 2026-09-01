import ManagePayrollTable from '@/components/modules/(dashboard)/dashboard/managePayrollTable/ManagePayrollTable';
import { payrollService } from '@/services/payroll.service';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const ManagePayroll = async({
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
    queryKey: ["companyPayrolls", queryString],
    queryFn: () => payrollService.getCompanyPayroll(queryString),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ManagePayrollTable queryString={queryString} />
    </HydrationBoundary>
  );
}

export default ManagePayroll