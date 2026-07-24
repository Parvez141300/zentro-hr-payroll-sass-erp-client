import { IAccountant } from "./accountant.type";
import { IDepartmentHead } from "./departmentHead.type";
import { IEmployee } from "./employee.type";
import { UserRole } from "./enums.type";
import { IHrManager } from "./hrManager.type";
import { IPlatformSuperAdmin } from "./platformSuperAdmin.type";
import { ISuperAdmin } from "./superAdmin.type";

export interface IUser {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  isVerified: boolean;
  isActive: boolean;
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
  platformSuperAdmin?: IPlatformSuperAdmin;
  superAdmin?: ISuperAdmin;
  hrManager?: IHrManager;
  accountant?: IAccountant;
  departmentHead?: IDepartmentHead;
  employee?: IEmployee;
}