"use server";
import { payrollService } from "@/services/payroll.service";
import { IGenerateEmployeePayroll } from "@/types/payroll.type";

export const getCompanyPayroll = async (queryString?: string) => {
    const response = await payrollService.getCompanyPayroll(queryString);

    return response;
};

export const generateCompanyPayrollForAllEmployees = async (payload: IGenerateEmployeePayroll) => {
    const response = await payrollService.generateCompanyPayrollForAllEmployees(payload);

    return response;
};

export const deleteCompanyPayroll = async (payrollId: string) => {
    const response = await payrollService.deleteCompanyPayroll(payrollId);

    return response;
};