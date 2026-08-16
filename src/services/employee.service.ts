/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpServer } from "@/lib/http/httpServer";
import { IApiRequestOptions } from "@/lib/http/types";
import { IEmployee } from "@/types/employee.type";
import { IPaginatedData } from "@/types/pagination.type";

const getCompanyEmployees = async (queryString?: string) => {
    const result = await httpServer.get<IPaginatedData<IEmployee[]>>(`/api/v1/employees?${queryString}`);

    return result
}

const deleteCompanyEmployee = async (employeeId: string) => {
    const result = await httpServer.delete(`/api/v1/employees/${employeeId}`);

    return result;
}

const updateCompanyEmployee = async (userId: string, payload: any, options?: IApiRequestOptions) => {
    const result = await httpServer.patch(`/api/v1/employees/${userId}`, payload, options);

    return result
}

export const employeeService = {
    getCompanyEmployees,
    deleteCompanyEmployee,
    updateCompanyEmployee,
}