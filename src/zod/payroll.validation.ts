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
  // ✅ Use .nullable() so the type is `string | null` (No `undefined`)
  month: z.string().nullable(),
  year: z.string().nullable(),

  // ✅ Use .nullable() so the type is `Date | null` (No `undefined`)
  periodStart: z.date().nullable(),
  periodEnd: z.date().nullable(),

  status: z.enum([
    PayrollStatus.APPROVED,
    PayrollStatus.CANCELLED,
    PayrollStatus.DRAFT,
    PayrollStatus.PAID,
  ]),

  paidAt: z.date().nullable(),
})
  .refine((data) => {
    // Only validate if both dates are provided
    if (data.periodStart && data.periodEnd) {
      return data.periodEnd >= data.periodStart;
    }
    return true;
  }, {
    message: "End date cannot be before the start date",
    path: ["periodEnd"],
  })
  .refine((data) => {
    // Only validate if status is PAID
    if (data.status === PayrollStatus.PAID) {
      return data.paidAt !== null;
    }
    return true;
  }, {
    message: "Payment date is required when status is PAID",
    path: ["paidAt"],
  });

export type UpdatePayrollFormValues = z.infer<typeof updatePayrollSchema>;