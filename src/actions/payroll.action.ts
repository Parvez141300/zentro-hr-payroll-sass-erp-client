"use server";
import { payrollService } from "@/services/payroll.service";

export const getCompanyPayroll = async (queryString?: string) => {
    const response = await payrollService.getCompanyPayroll(queryString);

    return response;
};

export const deleteCompanyPayroll = async (payrollId: string) => {
    const response = await payrollService.deleteCompanyPayroll(payrollId);

    return response;
};