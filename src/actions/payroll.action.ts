"use server";
import { payrollService } from "@/services/payroll.service";
import { IGeneratePayroll } from "@/types/payroll.type";

export const getCompanyPayroll = async (queryString?: string) => {
    const response = await payrollService.getCompanyPayroll(queryString);

    return response;
};

export const generateCompanyPayroll = async (payload: IGeneratePayroll) => {
    const response = await payrollService.generateCompanyPayroll(payload);

    return response;
};

export const deleteCompanyPayroll = async (payrollId: string) => {
    const response = await payrollService.deleteCompanyPayroll(payrollId);

    return response;
};