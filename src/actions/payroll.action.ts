"use server";
import { payrollService } from "@/services/payroll.service";
import { IGenerateEmployeePayroll, IUpdateEmployeePayroll } from "@/types/payroll.type";

export const getCompanyPayroll = async (queryString?: string) => {
    const response = await payrollService.getCompanyPayroll(queryString);

    return response;
};

export const generateCompanyPayrollForAllEmployees = async (payload: IGenerateEmployeePayroll) => {
    const response = await payrollService.generateCompanyPayrollForAllEmployees(payload);

    return response;
};

export const generateEmployeePayroll = async (payload: IGenerateEmployeePayroll) => {
    const response = await payrollService.generateEmployeePayroll(payload);

    return response;
};

export const deleteCompanyPayroll = async (payrollId: string) => {
    const response = await payrollService.deleteCompanyPayroll(payrollId);

    return response;
};

export const updateEmployeePayroll = async (payrollId: string, payload: IUpdateEmployeePayroll) => {
    const response = await payrollService.updateEmployeePayroll(payrollId, payload);

    return response;
}