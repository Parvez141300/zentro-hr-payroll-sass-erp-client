import { IEmployee } from "./employee.type";
import { LeaveStatus, LeaveType } from "./enums.type";

export interface ILeave {
  id: string;
  employeeId: string;
  employee?: IEmployee;
  leaveType: LeaveType;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: LeaveStatus;
  createdAt: Date;
  updatedAt: Date;
}