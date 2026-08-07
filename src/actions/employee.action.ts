"use server";

import { employeeService } from "@/services/employee.service"

export const getCompanyEmployees = async (queryString?: string) => {
    const result = await employeeService.getCompanyEmployees(queryString);

    return result
}

export const deleteCompanyEmployee = async (employeeId: string) => {
    const result = await employeeService.deleteCompanyEmployee(employeeId);

    return result
}