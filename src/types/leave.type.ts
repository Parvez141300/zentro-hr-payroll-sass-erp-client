import { ICompany } from "./company.type";
import { IEmployee } from "./employee.type";
import { LeaveStatus } from "./enums.type";
import { ILeaveType } from "./leaveType.type";

export interface ILeave {
  id: string;
  startDate: string | Date;
  endDate: string | Date;
  totalDays: number;
  reason: string;
  attachmentUrl: string | null;
  status: LeaveStatus;
  reviewedById: string | null;
  reviewNote: string | null;
  approvedByHeadAt: string | Date | null;
  approvedByHRAt: string | Date | null;
  rejectedAt: string | Date | null;
  rejectedReason: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  
  // Relations
  employeeId: string;
  employee?: IEmployee;
  leaveTypeId: string;
  leaveType?: ILeaveType;
  companyId: string;
  company?: ICompany;
}