import { httpServer } from "@/lib/http/httpServer"

const getAttendanceStats = async (queryString?: string) => {
    const result = await httpServer.get(`/statistics?${queryString}`);

    return result;
}

export const statsService = {
    getAttendanceStats,
}