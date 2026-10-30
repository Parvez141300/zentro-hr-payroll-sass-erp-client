"use client";

import React, { useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Loader2,
  Save,
  CheckCircle2,
  XCircle,
  Package,
  DollarSign,
  Users,
  Crown,
  ListChecks,
  Settings,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { updateSubscriptionPlanConfig } from "@/actions/subscriptionPlanConfig.action";
import { ISubscriptionPlanConfig } from "@/types/subscriptionPlanConfig.type";
import { SubscriptionPlan } from "@/types/enums.type";
import {
  UpdateSubscriptionPlanFormValues,
  updateSubscriptionPlanSchema,
} from "@/zod/subscriptionPlan.validation";
import { getIconComponent } from "@/lib/iconMapper";

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

      const payload = {
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
    mutationFn: async (payload: any) => {
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
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
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
              {/* Plan Name (read-only) */}
              <div className="space-y-1.5">
                <Label>Plan Code</Label>
                <Badge variant="outline" className="font-mono text-sm h-9 px-3">
                  {planData.name}
                </Badge>
                <p className="text-xs text-muted-foreground">
                  Plan code cannot be changed
                </p>
              </div>

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

              {/* Yearly BDT */}
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
                        Inactive plans won't be shown to new signups
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
                        Shows "Most Popular" on this plan
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
          {/* FEATURES (read-only for now) */}
          {/* ============================================ */}
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <ListChecks className="h-4 w-4 text-primary" />
              Features ({planData.features?.length || 0})
            </h4>
            <p className="text-xs text-muted-foreground mb-3">
              Features are managed by the platform. Contact support to modify.
            </p>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {planData.features?.map((feature) => {
                const Icon = getIconComponent(feature.icon);
                return (
                  <div
                    key={feature.id}
                    className="flex items-center gap-3 p-2 rounded-md border bg-muted/10"
                  >
                    <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-sm flex-1">{feature.name}</span>
                    {feature.included ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-rose-500" />
                    )}
                  </div>
                );
              })}
            </div>
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
