// src/zod/subscriptionPlanConfig.validation.ts
import { z } from "zod";
import { SubscriptionPlan } from "@/types/enums.type";

// ─── Feature schema ───
const featureSchema = z.object({
    id: z.string(),
    icon: z.string(),
    name: z.string(),
    category: z.string(),
    included: z.boolean(),
    description: z.string(),
});

// ─── Shared field helpers ───
const requiredPrice = (label: string) =>
    z
        .string()
        .min(1, `${label} is required`)
        .refine(
            (v) => !isNaN(Number(v)) && Number(v) >= 0,
            `${label} must be a positive number`
        );

const optionalPrice = (label: string) =>
    z
        .string()
        .optional()
        .or(z.literal(""))
        .refine(
            (v) => v === "" || v === undefined || (!isNaN(Number(v)) && Number(v) >= 0),
            `${label} must be a positive number or empty`
        );

// ─── Update schema ───
export const updateSubscriptionPlanSchema = z.object({
    name: z
        .enum([
            SubscriptionPlan.FREE,
            SubscriptionPlan.BASIC,
            SubscriptionPlan.PRO,
            SubscriptionPlan.ENTERPRISE,
        ])
        .optional(),
    displayName: z
        .string()
        .min(2, "Display name must be at least 2 characters")
        .max(100, "Display name must be less than 100 characters"),
    description: z
        .string()
        .max(500, "Description must be less than 500 characters")
        .optional()
        .or(z.literal("")),
    priceUSD: requiredPrice("Monthly price (USD)"),
    priceBDT: requiredPrice("Monthly price (BDT)"),
    yearlyPriceUSD: optionalPrice("Yearly price (USD)"),
    yearlyPriceBDT: optionalPrice("Yearly price (BDT)"),
    maxEmployees: z
        .string()
        .min(1, "Max employees is required")
        .refine(
            (v) => !isNaN(Number(v)) && Number(v) >= 1,
            "Max employees must be at least 1"
        ),
    sortOrder: z
        .string()
        .min(1, "Sort order is required")
        .refine(
            (v) => !isNaN(Number(v)) && Number(v) >= 0,
            "Sort order must be 0 or greater"
        ),
    isActive: z.boolean(),
    popularBadge: z.boolean(),
    features: z.array(featureSchema).optional(),
});

export type UpdateSubscriptionPlanFormValues = z.infer<
    typeof updateSubscriptionPlanSchema
>;

// ─── Create schema ───
export const createSubscriptionPlanSchema = z.object({
    name: z.enum([
        SubscriptionPlan.FREE,
        SubscriptionPlan.BASIC,
        SubscriptionPlan.PRO,
        SubscriptionPlan.ENTERPRISE,
    ]),
    displayName: z
        .string()
        .min(2, "Display name must be at least 2 characters")
        .max(100, "Display name must be less than 100 characters"),
    description: z
        .string()
        .max(500, "Description must be less than 500 characters")
        .optional()
        .or(z.literal("")),
    priceUSD: requiredPrice("Monthly price (USD)"),
    priceBDT: requiredPrice("Monthly price (BDT)"),
    yearlyPriceUSD: optionalPrice("Yearly price (USD)"),
    yearlyPriceBDT: optionalPrice("Yearly price (BDT)"),
    maxEmployees: z
        .string()
        .min(1, "Max employees is required")
        .refine(
            (v) => !isNaN(Number(v)) && Number(v) >= 1,
            "Max employees must be at least 1"
        ),
    sortOrder: z
        .string()
        .min(1, "Sort order is required")
        .refine(
            (v) => !isNaN(Number(v)) && Number(v) >= 0,
            "Sort order must be 0 or greater"
        ),
    isActive: z.boolean(),
    popularBadge: z.boolean(),
    // ✅ Optional so create form can omit it
    features: z.array(featureSchema).optional(),
});

export type CreateSubscriptionPlanFormValues = z.infer<
    typeof createSubscriptionPlanSchema
>;