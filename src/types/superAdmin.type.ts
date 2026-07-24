import { ICompany } from "./company.type";
import { IUser } from "./user.type";

// ============ SuperAdmin ============
export interface ISuperAdmin {
  id: string;
  userId: string;
  user?: IUser;
  name: string;
  phone: string | null;
  photoUrl: string | null;
  isDeleted: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  companyId: string;
  company?: ICompany;
}