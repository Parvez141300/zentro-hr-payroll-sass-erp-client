import z from "zod";


export const registerCompanySchema = z.object({
    companyName: z
        .string("Company name is required")
        .min(3, "Company name must be at least 3 characters long")
        .max(50, "Company name must be at most 50 characters long"),
    phone: z
        .string("Phone number is required")
        .min(11, "Phone number must be at least 11 characters long")
        .max(20, "Phone number must be at most 20 characters long"),
    address: z
        .string("Address is required")
        .min(3, "Address must be at least 3 characters long")
        .max(50, "Address must be at most 50 characters long"),
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

export const loginSchema = z.object({
    email: z
        .email("Email is required")
        .min(3, "Email must be at least 3 characters long")
        .max(50, "Email must be at most 50 characters long"),
    password: z
        .string("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .max(20, "Password must be at most 20 characters long"),
});

export const resetPasswordSchema = z.object({
    otp: z
        .string()
        .min(6, "OTP must be at least 6 characters long")
        .max(6, "OTP must be at most 6 characters long"),
    password: z
        .string("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .max(20, "Password must be at most 20 characters long"),
});

// Contact form schema
export const contactFormSchema = z.object({
    fullName: z
        .string()
        .min(2, "Full name must be at least 2 characters")
        .max(50, "Full name must be less than 50 characters"),
    email: z.email("Please enter a valid email address"),
    phone: z
        .string(),
    subject: z
        .string()
        .min(5, "Subject must be at least 5 characters")
        .max(100, "Subject must be less than 100 characters"),
    message: z
        .string()
        .min(10, "Message must be at least 10 characters")
        .max(1000, "Message must be less than 1000 characters"),
});