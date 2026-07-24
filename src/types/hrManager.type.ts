import { ICompany } from "./company.type";
import { IDepartment } from "./department.type";
import { IDesignation } from "./designation.type";
import { HrScope } from "./enums.type";
import { IUser } from "./user.type";

// ============ HrManager ============
export interface IHrManager {
  id: string;
  name: string;
  phone: string | null;
  photoUrl: string | null;
  employeeCode: string | null;
  joinDate: Date | null;
  hrLicenseNumber: string | null;
  officePhone: string | null;
  bio: string | null;
  scope: HrScope;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user?: IUser;
  departmentId: string | null;
  department?: IDepartment | null;
  designationId: string | null;
  designation?: IDesignation | null;
  companyId: string;
  company?: ICompany;
}