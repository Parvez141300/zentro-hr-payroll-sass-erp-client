import { ICompany } from "./company.type";
import { ILeave } from "./leave.type";

export interface ILeaveType {
  id: string;
  name: string;
  description: string | null;
  daysAllowed: number;
  isPaid: boolean;
  isActive: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  companyId: string;
  company?: ICompany;
  leaves?: ILeave[];
}