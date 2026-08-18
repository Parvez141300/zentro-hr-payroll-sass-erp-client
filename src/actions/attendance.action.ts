"use server";

import { attendanceService } from "@/services/attendance.service";

export const getCompanyAttendance = async (queryString?: string) => {
    const result = await attendanceService.getCompanyAttendance(queryString);

    return result;
}