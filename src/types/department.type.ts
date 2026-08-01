import { ICompany } from "./company.type";
import { IDepartmentHead } from "./departmentHead.type";
import { IDesignation } from "./designation.type";
import { IEmployee } from "./employee.type";
import { IHrManager } from "./hrManager.type";

export interface IDepartment {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  companyId: string;
  company?: ICompany;
  hrManagers?: IHrManager[];
  departmentHeads?: IDepartmentHead[];
  employees?: IEmployee[];
  designations?: IDesignation[];
}

export interface ICreateCompanyDepartment {
  name: string;
  description: string | null;
}

export interface IUpdateCompanyDepartment {
  name?: string;
  description?: string | null;
}