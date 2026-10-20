import { httpServer } from "@/lib/http/httpServer";
import { IPaginatedData } from "@/types/pagination.type";
import {  IGenerateEmployeePayroll, IPayroll, IUpdateEmployeePayroll } from "@/types/payroll.type";

const getCompanyPayroll = async (queryString?: string) => {
    const response = await httpServer.get<IPaginatedData<IPayroll[]>>(`/api/v1/payrolls?${queryString}`);

    return response;
};

const generateCompanyPayrollForAllEmployees = async (payload: IGenerateEmployeePayroll) => {
    const response = await httpServer.post("/api/v1/payrolls/all-employees", payload);

    return response;
};

const generateEmployeePayroll = async (payload: IGenerateEmployeePayroll) => {
    const response = await httpServer.post("/api/v1/payrolls", payload);

    return response;
};

const updateEmployeePayroll = async (payrollId: string, payload: IUpdateEmployeePayroll) => {
    const response = await httpServer.patch(`/api/v1/payrolls/${payrollId}`, payload);

    return response;
}

const deleteCompanyPayroll = async (payrollId: string) => {
    const response = await httpServer.delete(`/api/v1/payrolls/${payrollId}`);

    return response;
};

export const payrollService = {
    getCompanyPayroll,
    deleteCompanyPayroll,
    generateCompanyPayrollForAllEmployees,
    generateEmployeePayroll,
    updateEmployeePayroll,
};