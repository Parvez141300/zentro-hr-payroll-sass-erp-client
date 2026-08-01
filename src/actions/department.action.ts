"use server";

import { departmentService } from "@/services/department.service";
import { ICreateCompanyDepartment, IUpdateCompanyDepartment } from "@/types/department.type";


export const getCompanyDepartments = async (queryString?: string) => {
    const result = departmentService.getCompanyDepartments(queryString);

    return result;
}

export const createCompanyDepartment = async (payload: ICreateCompanyDepartment) => {
    const result = departmentService.createCompanyDepartment(payload);

    return result;
}

export const updateCompanyDepartment = async (departmentId: string, payload: IUpdateCompanyDepartment) => {
    const result = departmentService.updateCompanyDepartment(departmentId, payload);

    return result;
}

export const deleteCompanyDepartment = async (departmentId: string) => {
    const result = departmentService.deleteCompanyDepartment(departmentId);

    return result;
}