import CompanyDetailsData from "@/components/modules/(dashboard)/dashboard/companyDetailsData/CompanyDetailsData";
import { companyService } from "@/services/company.service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const CompanyDetails = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["companyDetails"],
    queryFn: companyService.getCompanyDetails,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CompanyDetailsData />
    </HydrationBoundary>
  );
};

export default CompanyDetails;
