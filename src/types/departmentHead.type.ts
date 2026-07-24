import { ICompany } from "./company.type";
import { IDepartment } from "./department.type";
import { IDesignation } from "./designation.type";
import { IUser } from "./user.type";

// ============ DepartmentHead ============
export interface IDepartmentHead {
  id: string;
  name: string;
  phone: string | null;
  photoUrl: string | null;
  employeeCode: string | null;
  joinDate: Date | null;
  officeLocation: string | null;
  linkedinUrl: string | null;
  bio: string | null;
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