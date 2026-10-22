import { httpServer } from "@/lib/http/httpServer"

const getAttendanceStats = async (queryString?: string) => {
    const result = await httpServer.get(`/api/v1/statistics/attendance/stats?${queryString}`);

    return result;
}

export const statsService = {
    getAttendanceStats,
}