import { ICompany } from "./company.type";
import { IDepartment } from "./department.type";
import { IDepartmentHead } from "./departmentHead.type";
import { IEmployee } from "./employee.type";
import { IHrManager } from "./hrManager.type";

export interface IDesignation {
  id: string;
  name: string;
  code: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  companyId: string;
  company?: ICompany;
  departmentId: string;
  department?: IDepartment;
  hrManagers?: IHrManager[];
  departmentHeads?: IDepartmentHead[];
  employees?: IEmployee[];
}