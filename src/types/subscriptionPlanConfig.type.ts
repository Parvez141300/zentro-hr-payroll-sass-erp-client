import { SubscriptionPlan } from "./enums.type";

export interface ISubscriptionFeature {
  id: string;
  icon: string;          // Lucide icon name (e.g., "Users", "Clock")
  name: string;          // Feature display name (e.g., "Employee Management")
  category: string;      // "core" | "attendance" | "leave" | "payroll" | "reports"
  included: boolean;     // Whether this feature is included in the plan
  description: string;   // Short description
}

export interface ISubscriptionPlanConfig {
  id: string;
  name: SubscriptionPlan;
  displayName: string;
  description: string | null;
  priceUSD: number;
  priceBDT: number;
  yearlyPriceUSD: number | null;
  yearlyPriceBDT: number | null;
  maxEmployees: number;
  features: ISubscriptionFeature[];  // Prisma Json → typed array
  isActive: boolean;
  sortOrder: number;
  popularBadge: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface IUpdateSubscriptionPlanConfig {
  displayName?: string;
  description?: string | null;
  priceUSD?: number;
  priceBDT?: number;
  yearlyPriceUSD?: number | null;
  yearlyPriceBDT?: number | null;
  maxEmployees?: number;
  sortOrder?: number;
  isActive?: boolean;
  popularBadge?: boolean;
  features?: ISubscriptionFeature[];
}

export interface ICreateSubscriptionPlanConfig {
  name: SubscriptionPlan;
  displayName: string;
  description: string | null;        // ✅ allow null
  priceUSD: number;
  priceBDT: number;
  yearlyPriceUSD: number | null;     // ✅ allow null
  yearlyPriceBDT: number | null;     // ✅ allow null
  maxEmployees: number;
  sortOrder: number;
  isActive: boolean;
  popularBadge: boolean;
  features: ISubscriptionFeature[];
}