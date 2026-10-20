import { ICompany } from "./company.type";
import { IEmployee } from "./employee.type";
import { PayrollStatus, SalaryType } from "./enums.type";

export interface IPayroll {
  id: string;

  // Date Range
  periodStart: Date;
  periodEnd: Date;
  month: number | null;
  year: number | null;

  // Salary Details
  salaryType: SalaryType;
  workingDaysPerMonth: number;
  basicSalary: number;
  houseAllowance: number;
  medicalAllowance: number;
  transportAllowance: number;
  overtimePay: number;

  // Daily/Hourly Tracking
  totalDays: number;
  totalHours: number;

  // Calculations
  grossSalary: number;
  taxDeduction: number;
  pfDeduction: number;
  otherDeductions: number;
  totalDeductions: number;
  netSalary: number;

  // Status & Meta
  status: PayrollStatus;
  paidAt: Date | null;
  generatedById: string | null;
  approvedById: string | null;

  // Relations
  employeeId: string;
  companyId: string;

  employee: IEmployee;
  company: ICompany;

  createdAt: Date;
  updatedAt: Date;
}

export interface IGenerateEmployeePayroll {
  employeeId: string;
  month?: string;
  year?: string;
  periodStart?: Date | string;
  periodEnd?: Date | string;
}

export interface IUpdateEmployeePayroll {
  month?: string | null;    // ✅ Added | null
  year?: string | null;     // ✅ Added | null
  periodStart?: Date | string | null;
  periodEnd?: Date | string | null;
  status?: PayrollStatus;
  paidAt?: Date | string | null;   // ✅ Added | null
}