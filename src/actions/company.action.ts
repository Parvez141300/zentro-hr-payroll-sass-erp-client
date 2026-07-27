"use server";

import { companyService } from "@/services/company.service";

export const getCompanyDetails = async () => {
    const result = await companyService.getCompanyDetails();

    return result;
}