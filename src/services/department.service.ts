import { httpServer } from "@/lib/http/httpServer"
import { IDepartment } from "@/types/department.type";
import { IPaginatedData } from "@/types/pagination.type";

const getCompanyDepartments = async (queryString?: string) => {
    const result = await httpServer.get<IPaginatedData<IDepartment[]>>(`/api/v1/departments?${queryString}`);

    return result;
}

export const departmentService = {
    getCompanyDepartments,
}