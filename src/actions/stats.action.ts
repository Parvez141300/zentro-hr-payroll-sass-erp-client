import { statsService } from "@/services/stats.service"

export const getAttendanceStats = async (month?: number, year?: number) => {
    const result = await statsService.getAttendanceStats(month, year);

    return result;
}