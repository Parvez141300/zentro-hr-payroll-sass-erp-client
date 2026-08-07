import { httpServer } from "@/lib/http/httpServer";
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

export const employeeService = {
    getCompanyEmployees,
    deleteCompanyEmployee,
}