import { AttendanceStatus } from "@/types/enums.type";
import z from "zod";

// Zod Schema for validation
export const markAttendanceSchema = z.object({
    employeeId: z.string().min(1, "Employee ID is required"),
    date: z.string().min(1, "Date is required"),
    status: z.enum([AttendanceStatus.PRESENT, AttendanceStatus.ABSENT, AttendanceStatus.LATE, AttendanceStatus.HALF_DAY] as const),
    checkIn: z.string().optional(),
    checkOut: z.string().optional(),
    note: z.string().optional(),
});

export type MarkAttendanceFormValues = z.infer<typeof markAttendanceSchema>;