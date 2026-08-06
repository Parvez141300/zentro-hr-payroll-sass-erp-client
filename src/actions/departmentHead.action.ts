"use server";

import { departmentHeadService } from "@/services/departmentHead.service";

export const getCompanyDepartmentHeads = async (queryString?: string) => {
    const result = await departmentHeadService.getCompanyDepartmentHeads(queryString);

    return result
};

export const deleteCompanyDepartmentHead = async (departmentHeadId: string) => {
    const result = await departmentHeadService.deleteCompanyDepartmentHead(departmentHeadId);

    return result
}