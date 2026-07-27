/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IApiRequestOptions } from "@/lib/http/types";
import { companyService } from "@/services/company.service";

export const getCompanyDetails = async () => {
    const result = await companyService.getCompanyDetails();

    return result;
}

export const updateCompanyDetails = async (payload: any, options?: IApiRequestOptions) => {
    const result = await companyService.updateCompanyDetails(payload, options);

    return result;
}