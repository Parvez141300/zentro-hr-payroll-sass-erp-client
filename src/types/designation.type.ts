import { ICompany } from "./company.type";
import { IDepartment } from "./department.type";
import { IDepartmentHead } from "./departmentHead.type";
import { IEmployee } from "./employee.type";
import { IHrManager } from "./hrManager.type";

export interface IDesignation {
  id: string;
  title: string;
  description: string | null;
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

export interface ICreateCompanyDesignation {
  departmentId: string;
  title: string;
  description: string | null;
}

export interface IUpdateCompanyDesignation {
  departmentId: string | null;
  title: string | null;
  description: string | null;
}