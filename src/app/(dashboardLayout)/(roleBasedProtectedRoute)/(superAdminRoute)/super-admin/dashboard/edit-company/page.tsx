import EditCompanyDetailsForm from "@/components/modules/(dashboard)/dashboard/editCompanyDetails/EditCompanyDetailsForm";
import { companyService } from "@/services/company.service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const EditCompany = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["companyDetails"],
    queryFn: companyService.getCompanyDetails,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditCompanyDetailsForm />
    </HydrationBoundary>
  );
};

export default EditCompany;
