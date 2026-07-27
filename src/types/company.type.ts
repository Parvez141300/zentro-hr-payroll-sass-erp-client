import { IAccountant } from "./accountant.type";
import { IDepartment } from "./department.type";
import { IDepartmentHead } from "./departmentHead.type";
import { IDesignation } from "./designation.type";
import { IEmployee } from "./employee.type";
import { SubscriptionPlan, SubscriptionStatus } from "./enums.type";
import { IHrManager } from "./hrManager.type";
import { ISuperAdmin } from "./superAdmin.type";

export interface ICompany {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  taxId: string;

  logoUrl: string | null;
  bannerUrl: string | null;

  websiteUrl: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  linkedinUrl: string | null;
  youtubeUrl: string | null;
  twitterUrl: string | null;

  subscriptionPlan: SubscriptionPlan;
  subscriptionStatus: SubscriptionStatus;
  subscriptionExpiry: string | null;
  maxEmployees: number;

  fiscalYearStart: string | null;
  fiscalYearEnd: string | null;

  createdAt: string;
  updatedAt: string;

  superAdmins?: ISuperAdmin[];
  hrManagers?: IHrManager[];
  accountants?: IAccountant[];
  departmentHeads?: IDepartmentHead[];
  employees?: IEmployee[];
  departments?: IDepartment[];
  designations?: IDesignation[];
}