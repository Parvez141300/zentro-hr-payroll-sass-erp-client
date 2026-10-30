/* eslint-disable @typescript-eslint/no-explicit-any */
import { ISubscriptionPlanConfig } from "@/types/subscriptionPlanConfig.type";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CheckCircle2, XCircle, Crown, Users } from "lucide-react";

const columnHelper = createColumnHelper<ISubscriptionPlanConfig>();

export const subscriptionPlanConfigColumn: ColumnDef<
  ISubscriptionPlanConfig,
  any
>[] = [
  columnHelper.display({
    id: "serial",
    header: "SL",
    cell: (info) => info.row.index + 1,
  }),
  columnHelper.accessor("name", {
    header: "Plan",
    cell: ({ row }) => {
      const plan = row.original;
      return (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono text-xs">
              {plan.name || "N/A"}
            </Badge>
            {plan.popularBadge && (
              <Badge
                variant="default"
                className="bg-amber-500 hover:bg-amber-600"
              >
                <Crown className="h-3 w-3 mr-1" />
                Popular
              </Badge>
            )}
          </div>
          <span className="text-sm font-medium">{plan.displayName}</span>
          {plan.description && (
            <span className="text-xs text-muted-foreground line-clamp-1">
              {plan.description}
            </span>
          )}
        </div>
      );
    },
  }),
  columnHelper.display({
    id: "monthlyPrice",
    header: "Monthly",
    cell: ({ row }) => {
      const { priceUSD, priceBDT } = row.original;
      return (
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold">
            ${priceUSD?.toLocaleString() ?? 0}
          </span>
          <span className="text-xs text-muted-foreground">
            ৳{priceBDT?.toLocaleString() ?? 0}
          </span>
        </div>
      );
    },
  }),
  columnHelper.display({
    id: "yearlyPrice",
    header: "Yearly",
    cell: ({ row }) => {
      const { yearlyPriceUSD, yearlyPriceBDT } = row.original;

      if (yearlyPriceUSD === null && yearlyPriceBDT === null) {
        return <span className="text-xs text-muted-foreground">—</span>;
      }

      return (
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold">
            ${yearlyPriceUSD?.toLocaleString() ?? 0}
          </span>
          <span className="text-xs text-muted-foreground">
            ৳{yearlyPriceBDT?.toLocaleString() ?? 0}
          </span>
        </div>
      );
    },
  }),
  columnHelper.accessor("maxEmployees", {
    header: "Max Employees",
    cell: ({ getValue }) => {
      const max = getValue();
      return (
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">
            {max >= 999999 ? "Unlimited" : (max?.toLocaleString() ?? "N/A")}
          </span>
        </div>
      );
    },
  }),
  columnHelper.display({
    id: "features",
    header: "Features",
    cell: ({ row }) => {
      const features = row.original.features ?? [];
      const includedCount = features.filter((f) => f.included).length;
      const totalCount = features.length;

      return (
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">
            {includedCount} / {totalCount}
          </span>
          <span className="text-xs text-muted-foreground">included</span>
        </div>
      );
    },
  }),
  columnHelper.accessor("isActive", {
    header: "Status",
    cell: ({ getValue }) => {
      const isActive = getValue();
      return isActive ? (
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
      );
    },
  }),
  columnHelper.accessor("createdAt", {
    header: "Created",
    cell: ({ getValue }) => {
      const date = getValue();
      return (
        <span className="text-sm text-muted-foreground">
          {date ? format(new Date(date), "MMM dd, yyyy") : "N/A"}
        </span>
      );
    },
  }),
  columnHelper.accessor("updatedAt", {
    header: "Updated",
    cell: ({ getValue }) => {
      const date = getValue();
      return (
        <span className="text-sm text-muted-foreground">
          {date ? format(new Date(date), "MMM dd, yyyy") : "N/A"}
        </span>
      );
    },
  }),
];
