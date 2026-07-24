import { ICompany } from "./company.type";
import { IUser } from "./user.type";

// ============ Accountant ============
export interface IAccountant {
  id: string;
  name: string;
  phone: string | null;
  photoUrl: string | null;
  employeeCode: string | null;
  joinDate: Date | null;
  caLicenseNumber: string | null;
  taxIdNumber: string | null;
  bankName: string | null;
  bankAccount: string | null;
  fiscalYearAccess: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user?: IUser;
  companyId: string;
  company?: ICompany;
}