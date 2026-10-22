import { statsService } from "@/services/stats.service"

export const getAttendanceStats = async (queryString?: string) => {
    const result = await statsService.getAttendanceStats(queryString);

    return result;
}