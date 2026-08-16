import z from "zod";

// Zod Schema for Accountant
export const createAccountantSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().optional(),
  photoUrl: z.string().optional(),
  joinDate: z.string().optional(),
  caLicenseNumber: z.string().optional(),
  taxIdNumber: z.string().optional(),
  bankName: z.string().optional(),
  bankAccount: z.string().optional(),
});

export type CreateAccountantFormValues = z.infer<typeof createAccountantSchema>;