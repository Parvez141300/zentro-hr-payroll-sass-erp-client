import { LeaveStatus } from "@/types/enums.type";
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
    // ✅ Required but nullable (matches form defaultValues)
    leaveTypeId: z.string(),
    startDate: z.date().nullable(),
    endDate: z.date().nullable(),
    reason: z
      .string()
      .min(5, "Reason must be at least 5 characters")
      .max(500, "Reason must be less than 500 characters"),
  })
  .refine(
    (data) => {
      // Only validate if both dates are present
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

export const updateLeaveStatusSchema = z
  .object({
    status: z.enum(
      [
        LeaveStatus.PENDING,
        LeaveStatus.APPROVED, 
        LeaveStatus.APPROVED_BY_HEAD, 
        LeaveStatus.REJECTED,
        LeaveStatus.CANCELLED,
      ]
    ),
    reviewNote: z
      .string()
      .max(1000, "Review note must be less than 1000 characters")
      .optional(),
    rejectedReason: z
      .string()
      .max(1000, "Rejection reason must be less than 1000 characters")
      .optional(),
  })
  .refine(
    (data) => {
      // ✅ Rejection requires a reason
      if (data.status === LeaveStatus.REJECTED && !data.rejectedReason?.trim()) {
        return false;
      }
      return true;
    },
    {
      message: "Rejection reason is required when rejecting a leave",
      path: ["rejectedReason"],
    }
  );

export type UpdateLeaveStatusFormValues = z.infer<
  typeof updateLeaveStatusSchema
>;