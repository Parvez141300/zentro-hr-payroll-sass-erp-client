"use server";

import { leaveTypeService } from "@/services/leaveType.service";

export const getCompanyLeaveTypes = async (queryString?: string) => {
    const result = await leaveTypeService.getCompanyLeaveTypes(queryString);

    return result
};