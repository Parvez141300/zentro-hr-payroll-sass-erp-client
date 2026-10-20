import { z } from "zod";
import { PayrollStatus, SalaryType } from "@/types/enums.type";

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

export const updatePayrollSchema = z.object({
  // Month and Year are optional
  month: z.string().nullable().optional(),
  year: z.string().nullable().optional(),

  // Dates are optional to allow updating JUST the status
  periodStart: z.date().optional(),
  periodEnd: z.date().optional(),

  // Status is required
  status: z.enum([
    PayrollStatus.APPROVED,
    PayrollStatus.PAID,
    PayrollStatus.CANCELLED,
    PayrollStatus.DRAFT,
  ]),

  // PaidAt is optional
  paidAt: z.date().nullable().optional(),
})
.refine((data) => {
  // If both dates are provided, ensure End is not before Start
  if (data.periodStart && data.periodEnd) {
    return data.periodEnd >= data.periodStart;
  }
  return true;
}, {
  message: "End date cannot be before the start date",
  path: ["periodEnd"],
})
.refine((data) => {
  // If status is PAID, paidAt is required
  if (data.status === PayrollStatus.PAID) {
    return !!data.paidAt;
  }
  return true;
}, {
  message: "Payment date is required when status is PAID",
  path: ["paidAt"],
});

export type UpdatePayrollFormValues = z.infer<typeof updatePayrollSchema>;