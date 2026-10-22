// ============================================
// TYPES
// ============================================

import { IPayroll } from "./payroll.type";

export interface PayrollSummaryPayload {
  totalGross: number;
  totalNet: number;
  totalTax: number;
  totalPF: number;
  totalDeductions: number;
  totalEmployees: number;
  averageSalary: number;
}

export interface StatusWisePayload {
  draft: number;
  approved: number;
  paid: number;
  cancelled: number;
}

export interface SalaryTypeWisePayload {
  monthly: number;
  daily: number;
  hourly: number;
}

export interface PayrollStatsResponsePayload {
  period: string;
  totalEmployees: number;
  totalDepartments: number;
  summary: PayrollSummaryPayload;
  statusWise: StatusWisePayload;
  salaryTypeWise: SalaryTypeWisePayload;
  data: IPayroll[]; // ✅ CHANGED from any[] to PayrollData[]
}