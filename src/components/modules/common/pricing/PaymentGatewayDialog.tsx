"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  CreditCard,
  Loader2,
  CheckCircle2,
  Globe,
  Building2,
  Users,
} from "lucide-react";

// ============================================
// TYPES
// ============================================
type PaymentGateway = "stripe" | "sslcommerz";

interface PaymentGatewayDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
  planDisplayName: string;
  priceUSD: number;
  priceBDT: number;
  yearlyPriceUSD: number | null;
  yearlyPriceBDT: number | null;
  periodText: string;
  maxEmployees?: number;
  isLoading?: boolean;
  onSelectGateway: (gateway: PaymentGateway) => void | Promise<void>;
}

// ============================================
// GATEWAY CONFIG
// ============================================
const GATEWAYS = [
  {
    id: "stripe" as PaymentGateway,
    name: "Stripe",
    description: "International payments with credit/debit cards",
    icon: Globe,
    badge: "International",
    badgeVariant: "default" as const,
    currency: "USD",
    region: "Worldwide",
    currencySymbol: "$",
  },
  {
    id: "sslcommerz" as PaymentGateway,
    name: "SSLCommerz",
    description: "Local payments via bKash, Nagad, Rocket, cards",
    icon: Building2,
    badge: "Bangladesh",
    badgeVariant: "secondary" as const,
    currency: "BDT",
    region: "Bangladesh",
    currencySymbol: "৳",
  },
];

// ============================================
// MAIN COMPONENT
// ============================================
const PaymentGatewayDialog = ({
  open,
  onOpenChange,
  planName,
  planDisplayName,
  priceUSD,
  priceBDT,
  yearlyPriceUSD,
  yearlyPriceBDT,
  periodText,
  maxEmployees,
  isLoading = false,
  onSelectGateway,
}: PaymentGatewayDialogProps) => {
  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway | null>(
    null,
  );

  // ✅ No useEffect — reset in handleClose
  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedGateway(null);
    }
    onOpenChange(isOpen);
  };

  const handleContinue = async () => {
    if (!selectedGateway) return;
    await onSelectGateway(selectedGateway);
  };

  const getGatewayPrice = (gatewayId: PaymentGateway) => {
    if (gatewayId === "stripe") {
      return periodText === "per year" && yearlyPriceUSD !== null
        ? yearlyPriceUSD
        : priceUSD;
    }
    return periodText === "per year" && yearlyPriceBDT !== null
      ? yearlyPriceBDT
      : priceBDT;
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose Payment Method</DialogTitle>
          <DialogDescription>
            Select how you want to pay for the{" "}
            <strong className="text-foreground">{planDisplayName}</strong> plan.
          </DialogDescription>
        </DialogHeader>

        {/* Plan Summary */}
        <div className="rounded-lg border bg-muted/40 p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="font-mono text-xs">
              {planName}
            </Badge>
            <span className="text-xs text-muted-foreground">{periodText}</span>
          </div>

          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-2xl font-bold text-foreground">
              ${priceUSD}
            </span>
            <span className="text-lg text-muted-foreground">/ ৳{priceBDT}</span>
          </div>

          {periodText === "per year" &&
            (yearlyPriceUSD !== null || yearlyPriceBDT !== null) && (
              <p className="text-xs text-muted-foreground mt-1">
                Yearly: {yearlyPriceUSD !== null && `$${yearlyPriceUSD}`}
                {yearlyPriceUSD !== null && yearlyPriceBDT !== null && " / "}
                {yearlyPriceBDT !== null && `৳${yearlyPriceBDT}`}
              </p>
            )}

          {maxEmployees !== undefined && (
            <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>
                Up to{" "}
                {maxEmployees >= 999999
                  ? "Unlimited"
                  : maxEmployees.toLocaleString()}{" "}
                employees
              </span>
            </div>
          )}

          <p className="text-xs text-muted-foreground mt-2">
            You&apos;ll be redirected to complete payment securely.
          </p>
        </div>

        <Separator />

        {/* Gateway options */}
        <div className="space-y-3">
          {GATEWAYS.map((gateway) => {
            const Icon = gateway.icon;
            const isSelected = selectedGateway === gateway.id;
            const price = getGatewayPrice(gateway.id);

            return (
              <button
                key={gateway.id}
                type="button"
                onClick={() => setSelectedGateway(gateway.id)}
                disabled={isLoading}
                className={cn(
                  "w-full text-left rounded-lg border p-4 transition-all duration-200",
                  "hover:border-primary/40 hover:shadow-sm",
                  isSelected
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                    : "border-border bg-background",
                  isLoading && "opacity-60 cursor-not-allowed",
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "p-2 rounded-lg shrink-0",
                      gateway.id === "stripe"
                        ? "bg-primary/10"
                        : "bg-emerald-500/10",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5",
                        gateway.id === "stripe"
                          ? "text-primary"
                          : "text-emerald-500",
                      )}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">
                          {gateway.name}
                        </span>
                        <Badge
                          variant={gateway.badgeVariant}
                          className="text-[10px] px-1.5 py-0"
                        >
                          {gateway.badge}
                        </Badge>
                      </div>
                      <span className="text-sm font-bold text-foreground whitespace-nowrap">
                        {gateway.currencySymbol}
                        {price.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {gateway.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-[10px] text-muted-foreground">
                      <span>Region: {gateway.region}</span>
                      <span>•</span>
                      <span>Currency: {gateway.currency}</span>
                    </div>
                  </div>

                  <div className="shrink-0 mt-1">
                    {isSelected ? (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-border" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Security note */}
        <div className="flex items-start gap-2 p-3 rounded-lg bg-secondary/20 border border-border/50">
          <CreditCard className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            All payments are processed securely. We never store your card
            details.
          </p>
        </div>

        {/* Actions */}
        <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleClose(false)}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleContinue}
            disabled={!selectedGateway || isLoading}
            className="w-full sm:w-auto gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Continue to{" "}
                {selectedGateway === "stripe"
                  ? "Stripe"
                  : selectedGateway === "sslcommerz"
                    ? "SSLCommerz"
                    : "Payment"}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentGatewayDialog;
