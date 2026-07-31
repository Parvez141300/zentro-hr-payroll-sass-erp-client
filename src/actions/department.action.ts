"use server";

import { departmentService } from "@/services/department.service";


export const getCompanyDepartments = async () => {
    const result = departmentService.getCompanyDepartments();

    return result;
}