"use client";

import React from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Loader2,
  Save,
  Package,
  DollarSign,
  Users,
  Crown,
  Settings,
  ArrowLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createSubscriptionPlanConfig } from "@/actions/subscriptionPlanConfig.action";
import { SubscriptionPlan } from "@/types/enums.type";
import {
  CreateSubscriptionPlanFormValues,
  createSubscriptionPlanSchema,
} from "@/zod/subscriptionPlanConfig.validation";

// ✅ Helper for error extraction
const getErrorMessage = (errors: unknown[]): string => {
  return errors
    .map((err) => {
      if (typeof err === "string") return err;
      if (err && typeof err === "object" && "message" in err) {
        return (err as { message: string }).message;
      }
      return "";
    })
    .filter(Boolean)
    .join(", ");
};

// ✅ Plan code options
const PLAN_CODE_OPTIONS = [
  { value: SubscriptionPlan.FREE, label: "FREE" },
  { value: SubscriptionPlan.BASIC, label: "BASIC" },
  { value: SubscriptionPlan.PRO, label: "PRO" },
  { value: SubscriptionPlan.ENTERPRISE, label: "ENTERPRISE" },
];

const CreateSubscriptionPlanForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: SubscriptionPlan.FREE,
      displayName: "",
      description: "",
      priceUSD: "0",
      priceBDT: "0",
      yearlyPriceUSD: "",
      yearlyPriceBDT: "",
      maxEmployees: "10",
      sortOrder: "0",
      isActive: true,
      popularBadge: false,
      features: [], // ✅ Required (matches schema)
    } as CreateSubscriptionPlanFormValues,
    validators: {
      onChange: createSubscriptionPlanSchema,
    },
    onSubmit: ({ value }) => {
      const payload = {
        name: value.name,
        displayName: value.displayName,
        description: value.description || null,
        priceUSD: Number(value.priceUSD),
        priceBDT: Number(value.priceBDT),
        yearlyPriceUSD:
          value.yearlyPriceUSD === "" ? null : Number(value.yearlyPriceUSD),
        yearlyPriceBDT:
          value.yearlyPriceBDT === "" ? null : Number(value.yearlyPriceBDT),
        maxEmployees: Number(value.maxEmployees),
        sortOrder: Number(value.sortOrder),
        isActive: value.isActive,
        popularBadge: value.popularBadge,
        features: value.features,
      };

      mutate(payload);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: {
      name: SubscriptionPlan;
      displayName: string;
      description: string | null;
      priceUSD: number;
      priceBDT: number;
      yearlyPriceUSD: number | null;
      yearlyPriceBDT: number | null;
      maxEmployees: number;
      sortOrder: number;
      isActive: boolean;
      popularBadge: boolean;
      features: CreateSubscriptionPlanFormValues["features"];
    }) => {
      return await createSubscriptionPlanConfig(payload);
    },
    onSuccess: () => {
      toast.success("Subscription plan created successfully!");
      queryClient.invalidateQueries({
        queryKey: ["subscription-plans-config"],
      });
      form.reset();
      router.push("/platform-super-admin/subscription-plans");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create subscription plan");
    },
  });

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <CardTitle>Create Subscription Plan</CardTitle>
              <CardDescription>
                Configure a new platform subscription plan
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <CardContent className="space-y-6">
            {/* ============================================ */}
            {/* PLAN IDENTITY */}
            {/* ============================================ */}
            <div>
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Package className="h-4 w-4 text-primary" />
                Plan Identity
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Plan Code */}
                <form.Field name="name">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <div className="space-y-1.5">
                        <Label>Plan Code *</Label>
                        <Select
                          value={field.state.value}
                          onValueChange={(v) =>
                            field.handleChange(v as SubscriptionPlan)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select plan code" />
                          </SelectTrigger>
                          <SelectContent>
                            {PLAN_CODE_OPTIONS.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          Cannot be changed after creation
                        </p>
                        {isInvalid && (
                          <p className="text-sm text-destructive">
                            {getErrorMessage(field.state.meta.errors)}
                          </p>
                        )}
                      </div>
                    );
                  }}
                </form.Field>

                {/* Display Name */}
                <form.Field name="displayName">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <div className="space-y-1.5">
                        <Label htmlFor="displayName">Display Name *</Label>
                        <Input
                          id="displayName"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="e.g., Pro Plan"
                        />
                        {isInvalid && (
                          <p className="text-sm text-destructive">
                            {getErrorMessage(field.state.meta.errors)}
                          </p>
                        )}
                      </div>
                    );
                  }}
                </form.Field>

                {/* Description */}
                <form.Field name="description">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <div className="space-y-1.5 md:col-span-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Short description of the plan..."
                          rows={2}
                        />
                        {isInvalid && (
                          <p className="text-sm text-destructive">
                            {getErrorMessage(field.state.meta.errors)}
                          </p>
                        )}
                      </div>
                    );
                  }}
                </form.Field>
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
                <form.Field name="priceUSD">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <div className="space-y-1.5">
                        <Label htmlFor="priceUSD">Monthly Price (USD) *</Label>
                        <Input
                          id="priceUSD"
                          type="number"
                          min="0"
                          step="0.01"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="0"
                        />
                        {isInvalid && (
                          <p className="text-sm text-destructive">
                            {getErrorMessage(field.state.meta.errors)}
                          </p>
                        )}
                      </div>
                    );
                  }}
                </form.Field>

                {/* Monthly BDT */}
                <form.Field name="priceBDT">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <div className="space-y-1.5">
                        <Label htmlFor="priceBDT">Monthly Price (BDT) *</Label>
                        <Input
                          id="priceBDT"
                          type="number"
                          min="0"
                          step="0.01"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="0"
                        />
                        {isInvalid && (
                          <p className="text-sm text-destructive">
                            {getErrorMessage(field.state.meta.errors)}
                          </p>
                        )}
                      </div>
                    );
                  }}
                </form.Field>

                {/* Yearly USD */}
                <form.Field name="yearlyPriceUSD">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <div className="space-y-1.5">
                        <Label htmlFor="yearlyPriceUSD">
                          Yearly Price (USD)
                        </Label>
                        <Input
                          id="yearlyPriceUSD"
                          type="number"
                          min="0"
                          step="0.01"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Leave empty if no yearly option"
                        />
                        {isInvalid && (
                          <p className="text-sm text-destructive">
                            {getErrorMessage(field.state.meta.errors)}
                          </p>
                        )}
                      </div>
                    );
                  }}
                </form.Field>

                {/* Yearly BDT */}
                <form.Field name="yearlyPriceBDT">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <div className="space-y-1.5">
                        <Label htmlFor="yearlyPriceBDT">
                          Yearly Price (BDT)
                        </Label>
                        <Input
                          id="yearlyPriceBDT"
                          type="number"
                          min="0"
                          step="0.01"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Leave empty if no yearly option"
                        />
                        {isInvalid && (
                          <p className="text-sm text-destructive">
                            {getErrorMessage(field.state.meta.errors)}
                          </p>
                        )}
                      </div>
                    );
                  }}
                </form.Field>
              </div>
            </div>

            <Separator />

            {/* ============================================ */}
            {/* LIMITS & ORDER */}
            {/* ============================================ */}
            <div>
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Limits & Order
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Max Employees */}
                <form.Field name="maxEmployees">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <div className="space-y-1.5">
                        <Label htmlFor="maxEmployees">Max Employees *</Label>
                        <Input
                          id="maxEmployees"
                          type="number"
                          min="1"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="e.g., 200"
                        />
                        <p className="text-xs text-muted-foreground">
                          Use 999999 for unlimited
                        </p>
                        {isInvalid && (
                          <p className="text-sm text-destructive">
                            {getErrorMessage(field.state.meta.errors)}
                          </p>
                        )}
                      </div>
                    );
                  }}
                </form.Field>

                {/* Sort Order */}
                <form.Field name="sortOrder">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <div className="space-y-1.5">
                        <Label htmlFor="sortOrder">Sort Order *</Label>
                        <Input
                          id="sortOrder"
                          type="number"
                          min="0"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="e.g., 3"
                        />
                        {isInvalid && (
                          <p className="text-sm text-destructive">
                            {getErrorMessage(field.state.meta.errors)}
                          </p>
                        )}
                      </div>
                    );
                  }}
                </form.Field>
              </div>
            </div>

            <Separator />

            {/* ============================================ */}
            {/* TOGGLES */}
            {/* ============================================ */}
            <div>
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Settings className="h-4 w-4 text-primary" />
                Visibility & Badges
              </h4>
              <div className="space-y-3">
                {/* Is Active */}
                <form.Field name="isActive">
                  {(field) => (
                    <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
                      <div>
                        <Label htmlFor="isActive" className="cursor-pointer">
                          Active
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Inactive plans won&apos;t be shown to new signups
                        </p>
                      </div>
                      <Switch
                        id="isActive"
                        checked={field.state.value}
                        onCheckedChange={(v) => field.handleChange(v)}
                      />
                    </div>
                  )}
                </form.Field>

                {/* Popular Badge */}
                <form.Field name="popularBadge">
                  {(field) => (
                    <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
                      <div>
                        <Label
                          htmlFor="popularBadge"
                          className="cursor-pointer flex items-center gap-1.5"
                        >
                          <Crown className="h-3.5 w-3.5 text-amber-500" />
                          Popular Badge
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Shows &ldquo;Most Popular&rdquo; on this plan
                        </p>
                      </div>
                      <Switch
                        id="popularBadge"
                        checked={field.state.value}
                        onCheckedChange={(v) => field.handleChange(v)}
                      />
                    </div>
                  )}
                </form.Field>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            {/* ✅ FIXED: form.Subscribe (not form.Submit) */}
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || isSubmitting || isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Create Plan
                    </>
                  )}
                </Button>
              )}
            </form.Subscribe>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateSubscriptionPlanForm;
