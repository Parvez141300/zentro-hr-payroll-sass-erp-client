import { z } from "zod";

export const applyLeaveSchema = z.object({
  leaveTypeId: z.string().min(1, "Please select a leave type"),
  startDate: z.date({ error: "Start date is required" }),
  endDate: z.date({ error: "End date is required" }),
  reason: z.string().min(5, "Reason must be at least 5 characters"),
  attachmentUrl: z.string().optional(),
}).refine((data) => data.endDate >= data.startDate, {
  message: "End date cannot be before start date",
  path: ["endDate"],
});

export type ApplyLeaveFormValues = z.infer<typeof applyLeaveSchema>;

// ✅ Schema for updating an existing leave
export const updateLeaveSchema = z
  .object({
    leaveTypeId: z.string().optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    reason: z
      .string()
      .min(5, "Reason must be at least 5 characters")
      .max(500, "Reason must be less than 500 characters")
      .optional(),
  })
  .refine(
    (data) => {
      // Only validate date order if BOTH dates are provided
      if (data.startDate && data.endDate) {
        return data.endDate >= data.startDate;
      }
      return true;
    },
    {
      message: "End date cannot be before start date",
      path: ["endDate"],
    }
  );

export type UpdateLeaveFormValues = z.infer<typeof updateLeaveSchema>;