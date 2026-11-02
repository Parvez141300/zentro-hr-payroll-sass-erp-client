import { BillingCycle, SubscriptionPlan } from "./enums.type";

export interface ICreateCheckoutSessionPayload {
    planName: SubscriptionPlan;        // "PREMIUM" | "BASIC" | etc.
    billingCycle: BillingCycle; // "MONTHLY" | "YEARLY"
    successUrl?: string;
    cancelUrl?: string;
}