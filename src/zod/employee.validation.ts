import { EmployeeStatus, EmploymentType, Gender } from "@/types/enums.type";
import z from "zod";

// Zod Schema for Employee
export const createEmployeeSchema = z.object({
    departmentId: z.string().min(1, "Department is required"),
    designationId: z.string().min(1, "Designation is required"),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().optional(),
    photoUrl: z.string().optional(),
    dateOfBirth: z.string().optional(),
    gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER] as Gender[]),
    address: z.string().optional(),
    nidNumber: z.string().optional(),
    bloodGroup: z.string().optional(),
    employmentType: z.enum([
        EmploymentType.FULL_TIME,
        EmploymentType.PART_TIME,
        EmploymentType.INTERN,
        EmploymentType.CONTRACT,
    ] as EmploymentType[]),
    status: z.enum([EmployeeStatus.ACTIVE, EmployeeStatus.INACTIVE, EmployeeStatus.TERMINATED, EmployeeStatus.ON_LEAVE] as EmployeeStatus[]),
    joinDate: z.string().optional(),
    basicSalary: z.string().min(1, "Basic salary is required"),
    houseAllowance: z.string().optional(),
    medicalAllowance: z.string().optional(),
    transportAllowance: z.string().optional(),
    bankName: z.string().optional(),
    bankAccount: z.string().optional(),
    emergencyName: z.string().optional(),
    emergencyPhone: z.string().optional(),
    emergencyRelation: z.string().optional(),
});

export type CreateEmployeeFormValues = z.infer<typeof createEmployeeSchema>;