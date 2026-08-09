import { HrScope } from "@/types/enums.type";
import z from "zod";

export const createHrSchema = z
  .object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    name: z.string().min(1, "Name is required"),
    phone: z.string().optional(),
    photoUrl: z.string().optional(),
    joinDate: z.string().optional(),
    hrLicenseNumber: z.string().optional(),
    officePhone: z.string().optional(),
    bio: z.string().optional(),
    scope: z.enum([HrScope.COMPANY_WIDE, HrScope.DEPARTMENT_SPECIFIC]),
    departmentId: z.string().optional(),
    designationId: z.string().optional(),
  })
  .refine(
    (data) => {
      // If scope is DEPARTMENT_SPECIFIC, departmentId is required
      if (data.scope === HrScope.DEPARTMENT_SPECIFIC && !data.departmentId) {
        return false;
      }
      return true;
    },
    {
      message: "Department is required when scope is Department Specific",
      path: ["departmentId"],
    },
  );

export type CreateHrFormValues = z.infer<typeof createHrSchema>;