import { httpServer } from "@/lib/http/httpServer"
import { IAttendance } from "@/types/attendance.type";
import { IPaginatedData } from "@/types/pagination.type";

const getCompanyAttendance = async (queryString?: string) => {
    const result = await httpServer.get<IPaginatedData<IAttendance[]>>(`/api/v1/attendances?${queryString}`);

    return result;
}

const deleteEmployeeAttendance = async (attendanceId: string) => {
    const result = await httpServer.delete(`/api/v1/attendances/${attendanceId}`);

    return result;
}

export const attendanceService = {
    getCompanyAttendance,
    deleteEmployeeAttendance,
}