import { httpServer } from "@/lib/http/httpServer"
import { ICreateCompanyDepartment, IDepartment, IUpdateCompanyDepartment } from "@/types/department.type";
import { IPaginatedData } from "@/types/pagination.type";

const getCompanyDepartments = async (queryString?: string) => {
    const result = await httpServer.get<IPaginatedData<IDepartment[]>>(`/api/v1/departments?${queryString}`);

    return result;
}

const createCompanyDepartment = async (payload: ICreateCompanyDepartment) => {
    const result = await httpServer.post("/api/v1/departments", payload);

    return result;
}

const updateCompanyDepartment = async (departmentId: string, payload: IUpdateCompanyDepartment) => {
    const result = await httpServer.patch(`/api/v1/departments/${departmentId}`, payload);

    return result;
}

const deleteCompanyDepartment = async (departmentId: string) => {
    const result = await httpServer.delete(`/api/v1/departments/${departmentId}`);

    return result;
}

export const departmentService = {
    getCompanyDepartments,
    createCompanyDepartment,
    updateCompanyDepartment,
    deleteCompanyDepartment,
}