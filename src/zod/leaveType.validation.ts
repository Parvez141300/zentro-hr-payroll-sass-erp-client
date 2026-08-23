// zod/leaveType.validation.ts

import { z } from "zod";

// Create Leave Type Schema - matches form values
export const createLeaveTypeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  daysAllowed: z.string().min(1, "Days allowed is required"),
  isPaid: z.boolean(),
  isActive: z.boolean(),
});

export type CreateLeaveTypeFormValues = z.infer<typeof createLeaveTypeSchema>;

// Update Leave Type Schema
export const updateLeaveTypeSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().optional(),
  daysAllowed: z.string().min(1, "Days allowed is required").optional(),
  isPaid: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

export type UpdateLeaveTypeFormValues = z.infer<typeof updateLeaveTypeSchema>;