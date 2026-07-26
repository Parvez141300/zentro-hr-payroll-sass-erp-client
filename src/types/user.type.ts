import { IAccountant } from "./accountant.type";
import { IDepartmentHead } from "./departmentHead.type";
import { IEmployee } from "./employee.type";
import { UserRole } from "./enums.type";
import { IHrManager } from "./hrManager.type";
import { IPlatformSuperAdmin } from "./platformSuperAdmin.type";
import { ISuperAdmin } from "./superAdmin.type";

export interface IUser {
  companyId: string;
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  image: string | null;
  isVerified: boolean;
  isActive: boolean;
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
  platformSuperAdmin?: IPlatformSuperAdmin;
  superAdmin: ISuperAdmin | null;
  hrManager?: IHrManager;
  accountant?: IAccountant;
  departmentHead?: IDepartmentHead;
  employee?: IEmployee;
}