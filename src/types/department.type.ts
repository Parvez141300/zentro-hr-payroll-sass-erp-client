import { ICompany } from "./company.type";
import { IDepartmentHead } from "./departmentHead.type";
import { IDesignation } from "./designation.type";
import { IEmployee } from "./employee.type";
import { IHrManager } from "./hrManager.type";

export interface IDepartment {
  id: string;
  name: string;
  code: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  companyId: string;
  company?: ICompany;
  hrManagers?: IHrManager[];
  departmentHeads?: IDepartmentHead[];
  employees?: IEmployee[];
  designations?: IDesignation[];
}