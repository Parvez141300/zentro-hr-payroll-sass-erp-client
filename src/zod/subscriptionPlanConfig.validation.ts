// src/zod/subscriptionPlan.validation.ts
import { z } from "zod";
import { SubscriptionPlan } from "@/types/enums.type"; // adjust import

const featureSchema = z.object({
    id: z.string(),
    icon: z.string(),
    name: z.string(),
    category: z.string(),
    included: z.boolean(),
    description: z.string(),
});

export const updateSubscriptionPlanSchema = z.object({
    name: z.enum(
        [
            SubscriptionPlan.FREE,
            SubscriptionPlan.BASIC,
            SubscriptionPlan.PRO,
            SubscriptionPlan.ENTERPRISE,
        ]
    ).optional(),
    displayName: z
        .string()
        .min(2, "Display name must be at least 2 characters")
        .max(100, "Display name must be less than 100 characters"),
    description: z
        .string()
        .max(500, "Description must be less than 500 characters")
        .optional()
        .or(z.literal("")),
    priceUSD: z
        .string()
        .min(1, "Required")
        .refine((v) => !isNaN(Number(v)) && Number(v) >= 0, "Must be a positive number"),
    priceBDT: z
        .string()
        .min(1, "Required")
        .refine((v) => !isNaN(Number(v)) && Number(v) >= 0, "Must be a positive number"),
    yearlyPriceUSD: z
        .string()
        .optional()
        .or(z.literal(""))
        .refine(
            (v) => v === "" || (!isNaN(Number(v)) && Number(v) >= 0),
            "Must be a positive number or empty"
        ),
    yearlyPriceBDT: z
        .string()
        .optional()
        .or(z.literal(""))
        .refine(
            (v) => v === "" || (!isNaN(Number(v)) && Number(v) >= 0),
            "Must be a positive number or empty"
        ),
    maxEmployees: z
        .string()
        .min(1, "Required")
        .refine(
            (v) => !isNaN(Number(v)) && Number(v) >= 1,
            "Must be at least 1"
        ),
    sortOrder: z
        .string()
        .min(1, "Required")
        .refine((v) => !isNaN(Number(v)) && Number(v) >= 0, "Must be 0 or greater"),
    isActive: z.boolean(),
    popularBadge: z.boolean(),
    features: z.array(featureSchema),
});

export type UpdateSubscriptionPlanFormValues = z.infer<
    typeof updateSubscriptionPlanSchema
>;

// ✅ Create schema — all required
export const createSubscriptionPlanSchema = z.object({
    name: z.enum(
        [
            SubscriptionPlan.FREE,
            SubscriptionPlan.BASIC,
            SubscriptionPlan.PRO,
            SubscriptionPlan.ENTERPRISE,
        ]
    ),
    displayName: z
        .string()
        .min(2, "Display name must be at least 2 characters")
        .max(100, "Display name must be less than 100 characters"),
    description: z
        .string()
        .max(500, "Description must be less than 500 characters")
        .optional()
        .or(z.literal("")),
    priceUSD: z
        .string()
        .min(1, "Monthly price (USD) is required")
        .refine(
            (v) => !isNaN(Number(v)) && Number(v) >= 0,
            "Must be a positive number"
        ),
    priceBDT: z
        .string()
        .min(1, "Monthly price (BDT) is required")
        .refine(
            (v) => !isNaN(Number(v)) && Number(v) >= 0,
            "Must be a positive number"
        ),
    yearlyPriceUSD: z
        .string()
        .optional()
        .or(z.literal(""))
        .refine(
            (v) => v === "" || (!isNaN(Number(v)) && Number(v) >= 0),
            "Must be a positive number or empty"
        ),
    yearlyPriceBDT: z
        .string()
        .optional()
        .or(z.literal(""))
        .refine(
            (v) => v === "" || (!isNaN(Number(v)) && Number(v) >= 0),
            "Must be a positive number or empty"
        ),
    maxEmployees: z
        .string()
        .min(1, "Max employees is required")
        .refine((v) => !isNaN(Number(v)) && Number(v) >= 1, "Must be at least 1"),
    sortOrder: z
        .string()
        .min(1, "Sort order is required")
        .refine((v) => !isNaN(Number(v)) && Number(v) >= 0, "Must be 0 or greater"),
    isActive: z.boolean(),
    popularBadge: z.boolean(),
    features: z.array(featureSchema), // ✅ No .default()
});

export type CreateSubscriptionPlanFormValues = z.infer<
    typeof createSubscriptionPlanSchema
>;