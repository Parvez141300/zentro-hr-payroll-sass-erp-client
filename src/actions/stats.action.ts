"use server";

import { statsService } from "@/services/stats.service"

export const getAttendanceStats = async (queryString?: string) => {
    const result = await statsService.getAttendanceStats(queryString);

    return result;
}

export const getLeaveStats = async () => {
    const result = await statsService.getLeaveStats();

    return result;
}

export const getPayrollStats = async (queryString?: string) => {
    const result = await statsService.getPayrollStats(queryString);

    return result;
}