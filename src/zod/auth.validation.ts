import z from "zod";


export const registerCompanySchema = z.object({
    companyName: z
        .string("Company name is required")
        .min(3, "Company name must be at least 3 characters long")
        .max(20, "Company name must be at most 20 characters long"),
    phone: z
        .string("Phone number is required")
        .min(11, "Phone number must be at least 11 characters long")
        .max(20, "Phone number must be at most 20 characters long"),
    address: z
        .string("Address is required")
        .min(3, "Address must be at least 3 characters long")
        .max(20, "Address must be at most 20 characters long"),
});

export const registerUserSchema = z.object({
    name: z
        .string("Name is required")
        .min(3, "Name must be at least 3 characters long")
        .max(20, "Name must be at most 20 characters long"),
    email: z
        .email("Email is required")
        .min(3, "Email must be at least 3 characters long")
        .max(50, "Email must be at most 50 characters long"),
    password: z
        .string("Password is required")
        .min(6, "Password must be at least 6 characters long")
        .max(20, "Password must be at most 20 characters long"),
});


export const completeRegisterFormSchema = z.object({
    step1: registerCompanySchema,
    step2: registerUserSchema,
});

export type CompleteRegisterSchemaType = z.infer<typeof completeRegisterFormSchema>;