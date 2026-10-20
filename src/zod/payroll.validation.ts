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
  // Month and Year are strings in the form, but can be empty/null
  month: z.string().nullable(),
  year: z.string().nullable(),

  // Date Range is required for all payrolls
  periodStart: z.date({
    error: "Start date is required",
  }),
  periodEnd: z.date({
    error: "End date is required",
  }),

  // Status must be one of the PayrollStatus enums
  status: z.enum([
    PayrollStatus.APPROVED,
    PayrollStatus.PAID,
    PayrollStatus.CANCELLED,
    PayrollStatus.DRAFT,
  ]),

  // PaidAt is only required if the status is PAID
  paidAt: z.date().nullable(),
})
  .refine((data) => {
    // Custom validation: End date cannot be before Start date
    if (data.periodStart && data.periodEnd) {
      return data.periodEnd >= data.periodStart;
    }
    return true;
  }, {
    message: "End date cannot be before the start date",
    path: ["periodEnd"], // Attaches the error to the periodEnd field
  })
  .refine((data) => {
    // Custom validation: If status is PAID, paidAt must be set
    if (data.status === PayrollStatus.PAID) {
      return data.paidAt !== null && data.paidAt !== undefined;
    }
    return true;
  }, {
    message: "Payment date is required when status is PAID",
    path: ["paidAt"], // Attaches the error to the paidAt field
  });

export type UpdatePayrollFormValues = z.infer<typeof updatePayrollSchema>;