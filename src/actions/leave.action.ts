/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { leaveService } from "@/services/leave.service";

export const getCompanyLeaves = async (queryString?: string) => {
    const result = await leaveService.getCompanyLeaves(queryString);

    return result
}

export const applyForEmplyeeLeave = async (payload: any) => {
    const result = await leaveService.applyForEmplyeeLeave(payload);

    return result;
}

export const deleteEmployeeLeave = async (leaveId: string) => {
    const result = await leaveService.deleteEmployeeLeave(leaveId);

    return result
}