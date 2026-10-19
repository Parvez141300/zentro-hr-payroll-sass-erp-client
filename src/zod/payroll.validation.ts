import { z } from "zod";
import { SalaryType } from "@/types/enums.type";

export const generatePayrollSchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),
  salaryType: z.enum([
    SalaryType.MONTHLY, 
    SalaryType.DAILY, 
    SalaryType.HOURLY
  ]),
  // ✅ .optional() = undefined (NOT null)
  month: z.string().optional(),
  year: z.string().optional(),
  periodStart: z.date().optional(),
  periodEnd: z.date().optional(),
});

export type GeneratePayrollFormValues = z.infer<typeof generatePayrollSchema>;