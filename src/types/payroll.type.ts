import { IEmployee } from "./employee.type";
import { PayrollStatus } from "./enums.type";

export interface IPayroll {
  id: string;
  employeeId: string;
  employee?: IEmployee;
  month: string;
  year: number;
  basicSalary: number;
  houseAllowance: number;
  medicalAllowance: number;
  transportAllowance: number;
  grossSalary: number;
  tax: number;
  insurance: number;
  otherDeductions: number;
  netSalary: number;
  paymentDate: Date;
  status: PayrollStatus;
  createdAt: Date;
  updatedAt: Date;
}