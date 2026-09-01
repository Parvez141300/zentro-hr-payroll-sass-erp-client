"use server";
import { payrollService } from "@/services/payroll.service";

export const getCompanyPayroll = async (queryString?: string) => {
    const response = await payrollService.getCompanyPayroll(queryString);

    return response;
};