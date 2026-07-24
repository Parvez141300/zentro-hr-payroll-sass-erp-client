import { IAccountant } from "./accountant.type";
import { IDepartment } from "./department.type";
import { IDepartmentHead } from "./departmentHead.type";
import { IDesignation } from "./designation.type";
import { IEmployee } from "./employee.type";
import { IHrManager } from "./hrManager.type";
import { ISuperAdmin } from "./superAdmin.type";

export interface ICompany {
  id: string;
  name: string;
  companyCode: string;
  email: string;
  phone: string;
  address: string;
  logo: string | null;
  website: string | null;
  taxId: string | null;
  registrationNumber: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  superAdmins?: ISuperAdmin[];
  hrManagers?: IHrManager[];
  accountants?: IAccountant[];
  departmentHeads?: IDepartmentHead[];
  employees?: IEmployee[];
  departments?: IDepartment[];
  designations?: IDesignation[];
}