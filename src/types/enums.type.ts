
// ============ Enums ============

export enum UserRole {
    PLATFORM_SUPER_ADMIN = "PLATFORM_SUPER_ADMIN",
    SUPER_ADMIN = "Super_ADMIN",
    HR_MANAGER = "HR_MANAGER",
    ACCOUNTANT = "ACCOUNTANT",
    DEPARTMENT_HEAD = "DEPARTMENT_HEAD",
    EMPLOYEE = "EMPLOYEE",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum EmploymentType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  CONTRACT = "CONTRACT",
  INTERN = "INTERN",
}

export enum EmployeeStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  TERMINATED = "TERMINATED",
  ON_LEAVE = "ON_LEAVE",
}

export enum AttendanceStatus {
  PRESENT = "PRESENT",
  ABSENT = "ABSENT",
  LATE = "LATE",
  HALF_DAY = "HALF_DAY",
}

export enum LeaveType {
  ANNUAL = "ANNUAL",
  SICK = "SICK",
  CASUAL = "CASUAL",
  MATERNITY = "MATERNITY",
  PATERNITY = "PATERNITY",
  UNPAID = "UNPAID",
}

export enum LeaveStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
}

export enum PayrollStatus {
  DRAFT = "DRAFT",
  GENERATED = "GENERATED",
  APPROVED = "APPROVED",
  PAID = "PAID",
  CANCELLED = "CANCELLED",
}

export enum HrScope {
  COMPANY_WIDE = "COMPANY_WIDE",
  DEPARTMENT_SPECIFIC = "DEPARTMENT_SPECIFIC",
}

// ============ end Enums ============
