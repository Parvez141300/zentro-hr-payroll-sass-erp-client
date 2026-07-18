"use client";

import { ArrowRight, Users } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { getIconComponent } from "@/lib/iconMapper";

// API থেকে আসা ডেটার টাইপ
interface Feature {
  id: string;
  icon: string;
  name: string;
  category: string;
  included: boolean;
  description: string;
}

export interface Plan {
  id: string;
  name: string;
  displayName: string;
  description: string;
  priceUSD: number;
  priceBDT: number;
  yearlyPriceUSD: number;
  yearlyPriceBDT: number;
  maxEmployees: number;
  features: Feature[];
  isActive: boolean;
  sortOrder: number;
  popularBadge: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PricingPlansProps {
  plans: Plan[];
  className?: string;
}

const PricingPlans = ({ plans, className }: PricingPlansProps) => {
  const [isAnnually, setIsAnnually] = useState(false);

  // সাজানো plans (sortOrder অনুযায়ী)
  const sortedPlans = [...plans].sort((a, b) => a.sortOrder - b.sortOrder);

  // কারেন্সি ফরম্যাট
  const formatPrice = (amount: number, currency: "USD" | "BDT") => {
    if (currency === "USD") {
      return `$${amount}`;
    } else {
      return `৳${amount}`;
    }
  };

  return (
    <section className={cn("", className)}>
      <div>
        <div className="flex flex-col gap-5">
          {/* Heading */}
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-foreground">
              Simple Pricing
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your organization&apos;s needs. All
              plans include core HR features.
            </p>
          </div>

          {/* Toggle */}
          <div className="flex justify-center">
            <Tabs
              value={isAnnually ? "annually" : "monthly"}
              onValueChange={(value: string) =>
                setIsAnnually(value === "annually")
              }
              className="w-fit"
              aria-label="Billing period"
            >
              <TabsList className="grid h-11 w-max grid-cols-2 gap-1 rounded-lg p-1">
                <TabsTrigger
                  value="monthly"
                  className="h-full min-h-0 rounded-md px-6 py-0 font-semibold text-muted-foreground data-active:text-foreground"
                >
                  Monthly
                </TabsTrigger>
                <TabsTrigger
                  value="annually"
                  className="h-full min-h-0 rounded-md px-6 py-0 font-semibold text-muted-foreground data-active:text-foreground"
                >
                  Yearly{" "}
                  <span className="ml-1 text-xs text-success">Save 16%</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Plan card*/}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {sortedPlans.map((plan) => {
              const isPopular = plan.popularBadge;
              const price = isAnnually ? plan.yearlyPriceUSD : plan.priceUSD;
              const priceBDT = isAnnually ? plan.yearlyPriceBDT : plan.priceBDT;
              const periodText = isAnnually ? "per year" : "per month";

              // features filtering ( included = true)
              const includedFeatures = plan.features.filter((f) => f.included);

              return (
                <div
                  key={plan.id}
                  className={cn(
                    "flex flex-col rounded-xl border p-6 text-left transition-all duration-300",
                    isPopular
                      ? "border-primary shadow-lg shadow-primary/10 bg-linear-to-b from-primary/5 to-transparent"
                      : "border-border hover:border-primary/30 hover:shadow-md",
                  )}
                >
                  {/* প্ল্যান ব্যাজ */}
                  <div className="flex items-center justify-between mb-4">
                    <Badge
                      variant={isPopular ? "default" : "secondary"}
                      className="uppercase text-xs"
                    >
                      {plan.displayName}
                    </Badge>
                    {isPopular && (
                      <Badge
                        variant="default"
                        className="bg-primary text-primary-foreground"
                      >
                        Most Popular
                      </Badge>
                    )}
                  </div>

                  {/* মূল্য */}
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-foreground">
                      {formatPrice(price, "USD")}
                    </span>
                    <span className="text-muted-foreground text-sm ml-1">
                      / {periodText}
                    </span>
                  </div>

                  {/* BDT মূল্য */}
                  <p className="text-sm font-bold mb-2">
                    {formatPrice(priceBDT, "BDT")} {periodText}
                  </p>

                  {/* বিবরণ */}
                  <p className="text-muted-foreground text-sm mb-4">
                    {plan.description}
                  </p>

                  {/* সর্বোচ্চ কর্মচারী */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Users className="h-4 w-4" />
                    <span>
                      Up to{" "}
                      {plan.maxEmployees === 999999
                        ? "Unlimited"
                        : plan.maxEmployees}{" "}
                      employees
                    </span>
                  </div>

                  <Separator className="my-4" />

                  {/* ফিচার লিস্ট */}
                  <div className="flex-1">
                    <ul className="space-y-3">
                      {includedFeatures.map((feature) => {
                        // ✅ getIconComponent ব্যবহার করে আইকন পাওয়া
                        const IconComponent = getIconComponent(feature.icon);

                        return (
                          <li
                            key={feature.id}
                            className="flex items-start gap-2 text-sm"
                          >
                            <IconComponent className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <div>
                              <span className="text-foreground font-medium">
                                {feature.name}
                              </span>
                              <p className="text-muted-foreground text-xs">
                                {feature.description}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* বাটন */}
                  <Button
                    className="w-full mt-6"
                    variant={isPopular ? "default" : "outline"}
                    size="lg"
                  >
                    Get Started <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
