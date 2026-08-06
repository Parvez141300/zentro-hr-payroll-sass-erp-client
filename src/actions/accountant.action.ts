"use server";

import { accountantService } from "@/services/accountant.service";

export const getCompanyAccountants = async (queryString?: string) => {
    const result = await accountantService.getCompanyAccountants(queryString);

    return result
};

export const deleteCompanyAccountant = async (accountantId: string) => {
    const result = await accountantService.deleteCompanyAccountant(accountantId);

    return result
};