"use client";

import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  XCircle,
  Crown,
  Users,
  DollarSign,
  Calendar,
  Layers,
  Package,
  TrendingUp,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { getIconComponent } from "@/lib/iconMapper";
import { ISubscriptionPlanConfig } from "@/types/subscriptionPlanConfig.type";

// ============================================
// PROPS
// ============================================
interface ViewSubscriptionPlanDialogProps {
  planData: ISubscriptionPlanConfig | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// ============================================
// MAIN COMPONENT
// ============================================
const ViewSubscriptionPlanDialog = ({
  planData,
  open,
  onOpenChange,
}: ViewSubscriptionPlanDialogProps) => {
  if (!planData) return null;

  const {
    name,
    displayName,
    description,
    priceUSD,
    priceBDT,
    yearlyPriceUSD,
    yearlyPriceBDT,
    maxEmployees,
    features = [],
    isActive,
    sortOrder,
    popularBadge,
    createdAt,
    updatedAt,
  } = planData;

  // Format date
  const formatDate = (d: string | Date | null | undefined) =>
    d ? format(new Date(d), "PPP 'at' hh:mm a") : "N/A";

  // Format currency
  const formatUSD = (amount: number | null | undefined) =>
    amount != null ? `$${amount.toLocaleString()}` : "—";

  const formatBDT = (amount: number | null | undefined) =>
    amount != null ? `৳${amount.toLocaleString()}` : "—";

  // Feature stats
  const includedFeatures = features.filter((f) => f.included);
  const excludedFeatures = features.filter((f) => !f.included);

  // Group features by category
  const featuresByCategory = features.reduce(
    (acc, feature) => {
      const cat = feature.category || "other";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(feature);
      return acc;
    },
    {} as Record<string, typeof features>,
  );

  // Calculate yearly savings
  const monthlyYearly = priceUSD * 12;
  const yearlySavingsUSD =
    yearlyPriceUSD != null && monthlyYearly > 0
      ? monthlyYearly - yearlyPriceUSD
      : 0;
  const yearlySavingsPercent =
    monthlyYearly > 0
      ? Math.round((yearlySavingsUSD / monthlyYearly) * 100)
      : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Subscription Plan Details</DialogTitle>
          <DialogDescription>
            Full configuration and feature breakdown for this plan
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* ============================================ */}
          {/* HEADER */}
          {/* ============================================ */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <Badge variant="outline" className="font-mono text-xs">
                  {name}
                </Badge>
                {popularBadge && (
                  <Badge
                    variant="default"
                    className="bg-amber-500 hover:bg-amber-600"
                  >
                    <Crown className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                {isActive ? (
                  <Badge
                    variant="default"
                    className="bg-emerald-500 hover:bg-emerald-600"
                  >
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                ) : (
                  <Badge variant="secondary">
                    <XCircle className="h-3 w-3 mr-1" />
                    Inactive
                  </Badge>
                )}
              </div>
              <h3 className="text-2xl font-bold">{displayName}</h3>
              {description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {description}
                </p>
              )}
            </div>
            <div className="p-3 rounded-lg bg-primary/10 shrink-0">
              <Package className="h-8 w-8 text-primary" />
            </div>
          </div>

          <Separator />

          {/* ============================================ */}
          {/* PRICING */}
          {/* ============================================ */}
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              Pricing
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Monthly USD */}
              <div className="p-4 rounded-lg border bg-muted/20">
                <p className="text-xs text-muted-foreground mb-1">
                  Monthly (USD)
                </p>
                <p className="text-2xl font-bold">{formatUSD(priceUSD)}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  per month / Stripe
                </p>
              </div>

              {/* Monthly BDT */}
              <div className="p-4 rounded-lg border bg-muted/20">
                <p className="text-xs text-muted-foreground mb-1">
                  Monthly (BDT)
                </p>
                <p className="text-2xl font-bold">{formatBDT(priceBDT)}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  per month / SSLCommerz
                </p>
              </div>

              {/* Yearly USD */}
              <div className="p-4 rounded-lg border bg-primary/5 border-primary/20">
                <p className="text-xs text-muted-foreground mb-1">
                  Yearly (USD)
                </p>
                <p className="text-2xl font-bold">
                  {formatUSD(yearlyPriceUSD)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  per year / Stripe
                </p>
                {yearlySavingsUSD > 0 && (
                  <Badge
                    variant="default"
                    className="mt-2 bg-emerald-500 hover:bg-emerald-600"
                  >
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Save {yearlySavingsPercent}%
                  </Badge>
                )}
              </div>

              {/* Yearly BDT */}
              <div className="p-4 rounded-lg border bg-primary/5 border-primary/20">
                <p className="text-xs text-muted-foreground mb-1">
                  Yearly (BDT)
                </p>
                <p className="text-2xl font-bold">
                  {formatBDT(yearlyPriceBDT)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  per year / SSLCommerz
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* ============================================ */}
          {/* PLAN LIMITS */}
          {/* ============================================ */}
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Plan Limits
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg border bg-muted/20 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Max Employees
                </span>
                <span className="text-sm font-bold">
                  {maxEmployees >= 999999
                    ? "Unlimited"
                    : maxEmployees.toLocaleString()}
                </span>
              </div>
              <div className="p-3 rounded-lg border bg-muted/20 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Display Order
                </span>
                <span className="text-sm font-bold">#{sortOrder}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* ============================================ */}
          {/* FEATURES */}
          {/* ============================================ */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <Layers className="h-4 w-4 text-primary" />
                Features
              </h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  {includedFeatures.length} included
                </span>
                {excludedFeatures.length > 0 && (
                  <span className="flex items-center gap-1">
                    <XCircle className="h-3 w-3 text-rose-500" />
                    {excludedFeatures.length} excluded
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {Object.entries(featuresByCategory).map(
                ([category, categoryFeatures]) => (
                  <div key={category}>
                    <p className="text-xs font-semibold tracking-wider text-muted-foreground mb-2 capitalize">
                      {category}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {categoryFeatures.map((feature) => {
                        const Icon = getIconComponent(feature.icon);
                        return (
                          <div
                            key={feature.id}
                            className={cn(
                              "flex items-start gap-3 p-3 rounded-lg border transition-colors",
                              feature.included
                                ? "bg-emerald-500/5 border-emerald-500/20"
                                : "bg-muted/20 border-border/50 opacity-60",
                            )}
                          >
                            <div
                              className={cn(
                                "p-1.5 rounded-md shrink-0",
                                feature.included
                                  ? "bg-emerald-500/10"
                                  : "bg-muted",
                              )}
                            >
                              <Icon
                                className={cn(
                                  "h-4 w-4",
                                  feature.included
                                    ? "text-emerald-600"
                                    : "text-muted-foreground",
                                )}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span
                                  className={cn(
                                    "text-sm font-medium",
                                    !feature.included &&
                                      "text-muted-foreground line-through",
                                  )}
                                >
                                  {feature.name}
                                </span>
                                {feature.included ? (
                                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                                ) : (
                                  <XCircle className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                                )}
                              </div>
                              {feature.description && (
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  {feature.description}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          <Separator />

          {/* ============================================ */}
          {/* METADATA */}
          {/* ============================================ */}
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Record Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Plan ID</span>
                <p className="text-sm font-mono text-muted-foreground break-all">
                  {planData.id}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Slug</span>
                <p className="text-sm font-mono text-muted-foreground">
                  {name.toLowerCase()}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">
                  Created At
                </span>
                <p className="text-sm font-medium">{formatDate(createdAt)}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">
                  Last Updated
                </span>
                <p className="text-sm font-medium">{formatDate(updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Close</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewSubscriptionPlanDialog;
