"use server";

import { attendanceService } from "@/services/attendance.service";
import { IMarkAttendance, IUpdateAttendance } from "@/types/attendance.type";

export const getCompanyAttendance = async (queryString?: string) => {
    const result = await attendanceService.getCompanyAttendance(queryString);

    return result;
}

export const markEmployeeAttendance = async (payload: IMarkAttendance) => {
    const result = await attendanceService.markEmployeeAttendance(payload);

    return result;
}

export const updateEmployeeAttendance = async (attendanceId: string, payload: IUpdateAttendance) => {
    const result = await attendanceService.upateEmployeeAttendance(attendanceId, payload);

    return result;
}

export const deleteEmployeeAttendance = async (attendanceId: string) => {
    const result = await attendanceService.deleteEmployeeAttendance(attendanceId);

    return result;
}

