/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IApiRequestOptions } from "@/lib/http/types";
import { employeeService } from "@/services/employee.service"

export const getCompanyEmployees = async (queryString?: string) => {
    const result = await employeeService.getCompanyEmployees(queryString);

    return result
}

export const deleteCompanyEmployee = async (employeeId: string) => {
    const result = await employeeService.deleteCompanyEmployee(employeeId);

    return result
}

export const updateCompanyEmployee = async (userId: string, payload: any, options?: IApiRequestOptions) => {
    const result = await employeeService.updateCompanyEmployee(userId, payload, options);

    return result
}