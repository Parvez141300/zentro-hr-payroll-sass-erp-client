import { httpServer } from "@/lib/http/httpServer";
import { IDepartmentHead } from "@/types/departmentHead.type";
import { IPaginatedData } from "@/types/pagination.type";

const getCompanyDepartmentHeads = async (queryString?: string) => {
    const result = await httpServer.get<IPaginatedData<IDepartmentHead[]>>(`/api/v1/department-heads?${queryString}`);

    return result;
}

const deleteCompanyDepartmentHead = async (departmentHeadId: string) => {
    const result = await httpServer.delete(`/api/v1/department-heads/${departmentHeadId}`);

    return result;
}

export const departmentHeadService = {
    getCompanyDepartmentHeads,
    deleteCompanyDepartmentHead,
};