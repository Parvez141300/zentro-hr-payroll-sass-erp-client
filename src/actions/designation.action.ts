"use server";

import { designationService } from "@/services/designation.service";
import { ICreateCompanyDesignation } from "@/types/designation.type";

export const getCompanyDesignations = async (queryString?: string) => {
    const result = await designationService.getCompanyDesignations(queryString);

    return result;
};

export const createCompanyDesignation = async (payload: ICreateCompanyDesignation) => {
    const result = await designationService.createCompanyDesignation(payload);

    return result;
};