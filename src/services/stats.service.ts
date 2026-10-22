import { httpServer } from "@/lib/http/httpServer"

const getAttendanceStats = async (queryString?: string) => {
    const result = await httpServer.get(`/api/v1/statistics/attendance/stats?${queryString}`);

    return result;
}

const getLeaveStats = async () => {
    const result = await httpServer.get(`/api/v1/statistics/leave/stats`);

    return result;
}


export const statsService = {
    getAttendanceStats,
    getLeaveStats,
}