import { SalaryType } from "@/types/enums.type";
import { z } from "zod";

export const generatePayrollSchema = z.object({
    employeeId: z.string().min(1, "Employee ID is required"),
    salaryType: z.enum([SalaryType.DAILY, SalaryType.HOURLY, SalaryType.MONTHLY] as SalaryType[]),

    // Monthly fields (optional, validated conditionally in UI or onSubmit)
    month: z.string().optional(),
    year: z.string().optional(),

    // Range fields (optional, validated conditionally in UI or onSubmit)
    periodStart: z.date().optional(),
    periodEnd: z.date().optional(),
});

export type GeneratePayrollFormValues = z.infer<typeof generatePayrollSchema>;