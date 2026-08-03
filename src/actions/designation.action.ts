"use server";

import { designationService } from "@/services/designation.service";

export const getCompanyDesignations = async (queryString?: string) => {
    const result = await designationService.getCompanyDesignations(queryString);

    return result;
};