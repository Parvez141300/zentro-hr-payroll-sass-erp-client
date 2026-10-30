import { SubscriptionPlan } from "./enums.type";

export interface IGetSubscriptionPlanConfigPayload {
  search?: string;         // Search across name AND displayName
  name?: SubscriptionPlan; // Filter by exact enum name
  displayName?: string;    // Filter by displayName (partial match)
  isActive?: boolean;      // Filter by active status
}