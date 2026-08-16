import { IAccountant } from "./accountant.type";
import { IDepartmentHead } from "./departmentHead.type";
import { IEmployee } from "./employee.type";
import { EmploymentType, Gender, HrScope, UserRole } from "./enums.type";
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
  emailVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  platformSuperAdmin?: IPlatformSuperAdmin;
  superAdmin: ISuperAdmin | null;
  hrManager?: IHrManager;
  accountant?: IAccountant;
  departmentHead?: IDepartmentHead;
  employee?: IEmployee;
}


export interface ICreateHRManagerPayload {
  // User fields
  email: string;
  password: string;

  // Profile fields
  name: string;
  phone?: string;
  photoUrl?: string;

  // Job fields
  joinDate?: Date;
  hrLicenseNumber?: string;
  officePhone?: string;
  bio?: string;

  // 🆕 Scope & Department
  scope: HrScope;  // "COMPANY_WIDE" or "DEPARTMENT_SPECIFIC"
  departmentId?: string;  // Required if scope is "DEPARTMENT_SPECIFIC"
  designationId?: string;
}

export interface ICreateCompanyAccountantPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
  photoUrl?: string;
  joinDate?: Date;
  caLicenseNumber?: string;
  taxIdNumber?: string;
  bankName?: string;
  bankAccount?: string;
}

export interface ICreateCompanyDepartmentHeadPayload {
  departmentId: string;
  designationId: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  photoUrl?: string;
  joinDate?: Date;
  officeLocation?: string;
  linkedinUrl?: string;
  bio?: string;
}

export interface ICreateCompanyEmployeePayload {
  departmentId: string;
  designationId: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  photoUrl?: string;
  dateOfBirth?: Date;
  gender: Gender;
  address?: string;
  nidNumber?: string;
  bloodGroup?: string;
  employmentType: EmploymentType;
  joinDate?: Date;
  basicSalary: number;
  houseAllowance?: number;
  medicalAllowance?: number;
  transportAllowance?: number;
  bankName?: string;
  bankAccount?: string;
  emergencyName?: string;
  emergencyPhone?: string;
  emergencyRelation?: string;
}