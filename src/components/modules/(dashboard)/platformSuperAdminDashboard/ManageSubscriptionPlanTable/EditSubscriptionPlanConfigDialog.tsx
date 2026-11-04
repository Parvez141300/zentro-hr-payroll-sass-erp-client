"use client";

import React, { useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Loader2,
  Save,
  Package,
  DollarSign,
  Users,
  Crown,
  ListChecks,
  Settings,
  Plus,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

import { updateSubscriptionPlanConfig } from "@/actions/subscriptionPlanConfig.action";
import {
  ISubscriptionPlanConfig,
  IUpdateSubscriptionPlanConfig,
} from "@/types/subscriptionPlanConfig.type";
import { SubscriptionPlan } from "@/types/enums.type";
import { getIconComponent } from "@/lib/iconMapper";
import {
  UpdateSubscriptionPlanFormValues,
  updateSubscriptionPlanSchema,
} from "@/zod/subscriptionPlanConfig.validation";

// ─── Helper for error extraction ───
const getErrorMessage = (errors: unknown[]): string =>
  errors
    .map((err) => {
      if (typeof err === "string") return err;
      if (err && typeof err === "object" && "message" in err) {
        return (err as { message: string }).message;
      }
      return "";
    })
    .filter(Boolean)
    .join(", ");

// ─── UUID-ish id generator for new features ───
const generateFeatureId = () =>
  `feat_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

// ─── Available icons (extend as needed) ───
// NOTE: These must exist in your iconMapper.ts
const AVAILABLE_ICONS = [
  "Users",
  "Package",
  "Crown",
  "Settings",
  "ListChecks",
  "DollarSign",
  "CheckCircle2",
  "Shield",
  "Zap",
  "BarChart3",
  "Database",
  "Mail",
  "FileText",
  "Clock",
] as const;

interface EditSubscriptionPlanConfigDialogProps {
  planData: ISubscriptionPlanConfig | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditSubscriptionPlanConfigDialog = ({
  planData,
  open,
  onOpenChange,
}: EditSubscriptionPlanConfigDialogProps) => {
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      name: planData?.name || SubscriptionPlan.FREE,
      displayName: planData?.displayName || "",
      description: planData?.description || "",
      priceUSD: planData?.priceUSD?.toString() || "0",
      priceBDT: planData?.priceBDT?.toString() || "0",
      yearlyPriceUSD: planData?.yearlyPriceUSD?.toString() || "",
      yearlyPriceBDT: planData?.yearlyPriceBDT?.toString() || "",
      maxEmployees: planData?.maxEmployees?.toString() || "10",
      sortOrder: planData?.sortOrder?.toString() || "0",
      isActive: planData?.isActive ?? true,
      popularBadge: planData?.popularBadge ?? false,
      features: planData?.features || [],
    } as UpdateSubscriptionPlanFormValues,
    validators: {
      onChange: updateSubscriptionPlanSchema,
    },
    onSubmit: ({ value }) => {
      if (!planData) return;

      const payload: IUpdateSubscriptionPlanConfig = {
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
        ...(value.features !== undefined && { features: value.features }),
      };

      mutate(payload);
    },
  });

  // Reset form when dialog opens with new data
  useEffect(() => {
    if (planData && open) {
      form.reset({
        name: planData.name,
        displayName: planData.displayName,
        description: planData.description || "",
        priceUSD: planData.priceUSD.toString(),
        priceBDT: planData.priceBDT.toString(),
        yearlyPriceUSD: planData.yearlyPriceUSD?.toString() || "",
        yearlyPriceBDT: planData.yearlyPriceBDT?.toString() || "",
        maxEmployees: planData.maxEmployees.toString(),
        sortOrder: planData.sortOrder.toString(),
        isActive: planData.isActive,
        popularBadge: planData.popularBadge,
        features: planData.features || [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planData, open]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: IUpdateSubscriptionPlanConfig) => {
      if (!planData) throw new Error("No plan selected");
      return await updateSubscriptionPlanConfig(planData.id, payload);
    },
    onSuccess: () => {
      toast.success("Subscription plan updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["subscription-plans-config"],
      });
      onOpenChange(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update subscription plan");
    },
  });

  if (!planData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Subscription Plan</DialogTitle>
          <DialogDescription>
            Update pricing, limits, and features for{" "}
            <strong>{planData.displayName}</strong>.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6 py-2"
        >
          {/* ============================================ */}
          {/* PLAN IDENTITY */}
          {/* ============================================ */}
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Package className="h-4 w-4 text-primary" />
              Plan Identity
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Plan Code</Label>
                <Badge variant="outline" className="font-mono text-sm h-9 px-3">
                  {planData.name}
                </Badge>
                <p className="text-xs text-muted-foreground">
                  Plan code cannot be changed
                </p>
              </div>

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

              <form.Field name="yearlyPriceUSD">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <div className="space-y-1.5">
                      <Label htmlFor="yearlyPriceUSD">Yearly Price (USD)</Label>
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

              <form.Field name="yearlyPriceBDT">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <div className="space-y-1.5">
                      <Label htmlFor="yearlyPriceBDT">Yearly Price (BDT)</Label>
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

          <Separator />

          {/* ============================================ */}
          {/* FEATURES — fully editable */}
          {/* ============================================ */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <ListChecks className="h-4 w-4 text-primary" />
                Features
              </h4>
              <form.Field name="features">
                {(field) => (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const current = field.state.value ?? [];
                      field.handleChange([
                        ...current,
                        {
                          id: generateFeatureId(),
                          icon: "Package",
                          name: "",
                          category: "General",
                          included: true,
                          description: "",
                        },
                      ]);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Feature
                  </Button>
                )}
              </form.Field>
            </div>

            <form.Field name="features">
              {(field) => {
                const features = field.state.value ?? [];

                if (features.length === 0) {
                  return (
                    <div className="text-center py-8 border rounded-lg bg-muted/10">
                      <ListChecks className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        No features yet. Click &ldquo;Add Feature&rdquo; to
                        create one.
                      </p>
                    </div>
                  );
                }

                const updateFeature = (
                  index: number,
                  patch: Partial<(typeof features)[number]>,
                ) => {
                  const updated = features.map((f, i) =>
                    i === index ? { ...f, ...patch } : f,
                  );
                  field.handleChange(updated);
                };

                const removeFeature = (index: number) => {
                  field.handleChange(features.filter((_, i) => i !== index));
                };

                return (
                  <div className="space-y-3">
                    {features.map((feature, index) => {
                      const Icon = getIconComponent(feature.icon);
                      return (
                        <div
                          key={feature.id}
                          className="rounded-lg border p-3 bg-muted/10 space-y-3"
                        >
                          {/* Row 1: Icon preview + name + included + delete */}
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-md bg-background border shrink-0">
                              <Icon className="h-4 w-4 text-primary" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <Input
                                placeholder="Feature name (e.g., Payroll Management)"
                                value={feature.name}
                                onChange={(e) =>
                                  updateFeature(index, { name: e.target.value })
                                }
                                className="h-9"
                              />
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-xs text-muted-foreground">
                                Included
                              </span>
                              <Switch
                                checked={feature.included}
                                onCheckedChange={(checked) =>
                                  updateFeature(index, { included: checked })
                                }
                              />
                              <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                className="text-destructive hover:text-destructive"
                                onClick={() => removeFeature(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Row 2: icon + category + description */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <div className="space-y-1">
                              <Label className="text-xs text-muted-foreground">
                                Icon
                              </Label>
                              <select
                                value={feature.icon}
                                onChange={(e) =>
                                  updateFeature(index, {
                                    icon: e.target.value,
                                  })
                                }
                                className="w-full h-9 rounded-md border bg-background px-2 text-sm"
                              >
                                {AVAILABLE_ICONS.map((iconName) => (
                                  <option key={iconName} value={iconName}>
                                    {iconName}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="space-y-1">
                              <Label className="text-xs text-muted-foreground">
                                Category
                              </Label>
                              <Input
                                value={feature.category}
                                onChange={(e) =>
                                  updateFeature(index, {
                                    category: e.target.value,
                                  })
                                }
                                className="h-9"
                                placeholder="e.g., HR, Payroll"
                              />
                            </div>

                            <div className="space-y-1">
                              <Label className="text-xs text-muted-foreground">
                                Description
                              </Label>
                              <Input
                                value={feature.description}
                                onChange={(e) =>
                                  updateFeature(index, {
                                    description: e.target.value,
                                  })
                                }
                                className="h-9"
                                placeholder="Short description"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              }}
            </form.Field>
          </div>

          {/* ============================================ */}
          {/* ACTIONS */}
          {/* ============================================ */}
          <DialogFooter className="pt-4">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  disabled={isPending}
                  onClick={() => form.reset()}
                >
                  Cancel
                </Button>
              }
            />
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
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSubscriptionPlanConfigDialog;
