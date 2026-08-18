import { IEmployee } from "./employee.type";
import { AttendanceStatus } from "./enums.type";

export interface IAttendance {
  id: string;
  employeeId: string;
  employee?: IEmployee;
  status: AttendanceStatus;
  note: string | null;

  date: Date;
  checkIn: Date;
  checkOut: Date | null;
  overtimeHours: number;
  lateMinutes: number;
  earlyExitMinutes: number;

  approvedBy: string | null;
  approvedAt: Date | null;

  createdAt: Date;
  updatedAt: Date;
}