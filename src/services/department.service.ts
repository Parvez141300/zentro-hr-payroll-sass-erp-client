import { httpServer } from "@/lib/http/httpServer"
import { IDepartment } from "@/types/department.type";
import { IPaginatedData } from "@/types/pagination.type";

const getCompanyDepartments = async () => {
    const result = await httpServer.get<IPaginatedData<IDepartment[]>>("/api/v1/departments");

    return result;
}

export const departmentService = { 
    getCompanyDepartments, 
}