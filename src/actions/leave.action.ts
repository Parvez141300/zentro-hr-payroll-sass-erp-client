/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { leaveService } from "@/services/leave.service";
import { IUpdateForLeaveStatusPayload } from "@/types/leave.type";

export const getCompanyLeaves = async (queryString?: string) => {
    const result = await leaveService.getCompanyLeaves(queryString);

    return result
}

export const applyForEmployeeLeave = async (payload: any) => {
    const result = await leaveService.applyForEmplyeeLeave(payload);

    return result;
}

export const updateForEmployeeLeave = async (leaveId: string, payload: any) => {
    const result = await leaveService.updateForEmployeeLeave(leaveId, payload);

    return result;
}

export const updateLeaveStatus = async (leaveId: string, payload: IUpdateForLeaveStatusPayload) => {
    const result = await leaveService.updateLeaveStatus(leaveId, payload);

    return result;
}

export const deleteEmployeeLeave = async (leaveId: string) => {
    const result = await leaveService.deleteEmployeeLeave(leaveId);

    return result
}