"use server";

import { attendanceService } from "@/services/attendance.service";

export const getCompanyAttendance = async (queryString?: string) => {
    const result = await attendanceService.getCompanyAttendance(queryString);

    return result;
}

export const deleteEmployeeAttendance = async (attendanceId: string) => {
    const result = await attendanceService.deleteEmployeeAttendance(attendanceId);

    return result;
}

