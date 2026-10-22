import { httpServer } from "@/lib/http/httpServer"

const getAttendanceStats = async (month?: number, year?: number) => {
    const result = await httpServer.get(`/statistics?month=${month}&year=${year}`);

    return result;
}

export const statsService = {
    getAttendanceStats,
}