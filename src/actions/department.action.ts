"use server";

import { departmentService } from "@/services/department.service";


export const getCompanyDepartments = async (queryString?: string) => {
    const result = departmentService.getCompanyDepartments(queryString);

    return result;
}