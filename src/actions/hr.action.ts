"use server"

import { hrService } from "@/services/hr.service";

export const getCompanyHrs = async (queryString?: string) => {
    const result = await hrService.getCompanyHrs(queryString);

    return result
}

export const deleteCompanyHr = async (hrId: string) => {
    const result = await hrService.deleteCompanyHr(hrId);

    return result
}

