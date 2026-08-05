"use server";

import { designationService } from "@/services/designation.service";
import { ICreateCompanyDesignation, IUpdateCompanyDesignation } from "@/types/designation.type";

export const getCompanyDesignations = async (queryString?: string) => {
    const result = await designationService.getCompanyDesignations(queryString);

    return result;
};

export const createCompanyDesignation = async (payload: ICreateCompanyDesignation) => {
    const result = await designationService.createCompanyDesignation(payload);

    return result;
};

export const updateCompanyDesignation = async (designationId: string, payload: IUpdateCompanyDesignation) => {
    const result = await designationService.updateCompanyDesignation(designationId, payload);

    return result;
};

export const deleteCompanyDesignation = async (designationId: string) => {
    const result = await designationService.deleteCompanyDesignation(designationId);

    return result;
}