import { IAttendance } from "./attendance.type";
import { ICompany } from "./company.type";
import { IDepartment } from "./department.type";
import { IDesignation } from "./designation.type";
import { EmployeeStatus, EmploymentType, Gender } from "./enums.type";
import { ILeave } from "./leave.type";
import { IPayroll } from "./payroll.type";
import { IUser } from "./user.type";

// ============ Employee ============
export interface IEmployee {
  id: string;

  // ✅ Personal Information
  name: string;
  phone: string | null;
  photoUrl: string | null;
  dateOfBirth: string | null;
  gender: Gender | null;
  address: string | null;
  nidNumber: string | null;
  bloodGroup: string | null;
  employeeCode: string | null;
  joinDate: string | null;
  employmentType: EmploymentType;
  status: EmployeeStatus;

  // ✅ Salary Information
  basicSalary: number;
  houseAllowance: number;
  medicalAllowance: number;
  transportAllowance: number;
  salaryType: string;
  workingDaysPerMonth: number;

  // ✅ Bank Information
  bankName: string | null;
  bankAccount: string | null;

  // ✅ Emergency Contact
  emergencyName: string | null;
  emergencyPhone: string | null;
  emergencyRelation: string | null;

  createdAt: string;
  updatedAt: string;
  userId: string;
  user?: IUser;
  departmentId: string | null;
  department?: IDepartment | null;
  designationId: string | null;
  designation?: IDesignation | null;
  companyId: string;
  company?: ICompany;
  attendances?: IAttendance[];
  leaves?: ILeave[];
  payrolls?: IPayroll[];
}