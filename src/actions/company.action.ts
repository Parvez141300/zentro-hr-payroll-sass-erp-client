/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IApiRequestOptions } from "@/lib/http/types";
import { companyService } from "@/services/company.service";

export const getAllCompany = async (queryString?: string) => {
    const result = await companyService.getAllCompany(queryString);

    return result;
}

export const getCompanyDetails = async () => {
    const result = await companyService.getCompanyDetails();

    return result;
}

export const updateCompanyDetails = async (payload: any, options?: IApiRequestOptions) => {
    const result = await companyService.updateCompanyDetails(payload, options);

    return result;
}

export const deleteCompany = async (companyId: string) => {
    const result = await companyService.deleteCompany(companyId);

    return result;
}