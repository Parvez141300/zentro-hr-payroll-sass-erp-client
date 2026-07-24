import { IEmployee } from "./employee.type";
import { AttendanceStatus } from "./enums.type";

export interface IAttendance {
  id: string;
  employeeId: string;
  employee?: IEmployee;
  date: Date;
  checkIn: Date;
  checkOut: Date | null;
  status: AttendanceStatus;
  overtimeHours: number;
  createdAt: Date;
  updatedAt: Date;
}