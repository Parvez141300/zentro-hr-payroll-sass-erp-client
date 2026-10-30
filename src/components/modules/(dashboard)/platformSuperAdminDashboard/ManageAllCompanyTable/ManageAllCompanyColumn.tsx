/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICompany } from "@/types/company.type";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import {
  CheckCircle2,
  XCircle,
  CreditCard,
  Building2,
  Crown,
} from "lucide-react";

const columnHelper = createColumnHelper<ICompany>();

export const subscriptionPlanConfigColumn: ColumnDef<ICompany, any>[] = [
  // ============================================
  // SERIAL
  // ============================================
  columnHelper.display({
    id: "serial",
    header: "SL",
    cell: (info) => info.row.index + 1,
  }),

  // ============================================
  // COMPANY (avatar + name + email)
  // ============================================
  columnHelper.accessor("name", {
    header: "Company",
    cell: ({ row }) => {
      const company = row.original;
      const initials = company.name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={company.logoUrl || undefined}
              alt={company.name}
            />
            <AvatarFallback className="text-xs">
              {initials || "CO"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{company.name}</span>
            <span className="text-xs text-muted-foreground">
              {company.email}
            </span>
          </div>
        </div>
      );
    },
  }),

  // ============================================
  // SUBSCRIPTION PLAN
  // ============================================
  columnHelper.accessor("subscriptionPlan", {
    header: "Plan",
    cell: ({ getValue }) => {
      const plan = getValue();
      return (
        <Badge variant="outline" className="font-mono text-xs">
          {plan || "N/A"}
        </Badge>
      );
    },
  }),

  // ============================================
  // SUBSCRIPTION STATUS
  // ============================================
  columnHelper.accessor("subscriptionStatus", {
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue();
      const isActive = status === "ACTIVE";
      const isTrial = status === "TRIAL";

      if (isActive) {
        return (
          <Badge
            variant="default"
            className="bg-emerald-500 hover:bg-emerald-600"
          >
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Active
          </Badge>
        );
      }

      if (isTrial) {
        return (
          <Badge variant="secondary">
            <Crown className="h-3 w-3 mr-1" />
            Trial
          </Badge>
        );
      }

      return (
        <Badge variant="destructive">
          <XCircle className="h-3 w-3 mr-1" />
          {status || "N/A"}
        </Badge>
      );
    },
  }),

  // ============================================
  // MAX EMPLOYEES
  // ============================================
  columnHelper.accessor("maxEmployees", {
    header: "Max Employees",
    cell: ({ getValue }) => {
      const max = getValue();
      return (
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">
            {max >= 999999 ? "Unlimited" : (max?.toLocaleString() ?? "N/A")}
          </span>
        </div>
      );
    },
  }),

  // ============================================
  // PAYMENT PROVIDER
  // ============================================
  columnHelper.display({
    id: "paymentProvider",
    header: "Payment",
    cell: ({ row }) => {
      const company = row.original;

      if (company.stripeCustomerId) {
        return (
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-primary" />
            <span className="text-sm">Stripe</span>
          </div>
        );
      }

      if (company.sslCommerzCustomerId) {
        return (
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-emerald-500" />
            <span className="text-sm">SSLCommerz</span>
          </div>
        );
      }

      return <span className="text-xs text-muted-foreground">—</span>;
    },
  }),

  // ============================================
  // SUBSCRIPTION EXPIRY
  // ============================================
  columnHelper.accessor("subscriptionExpiry", {
    header: "Expires",
    cell: ({ getValue }) => {
      const date = getValue();
      if (!date) {
        return <span className="text-xs text-muted-foreground">—</span>;
      }

      const expiryDate = new Date(date);
      const isExpired = expiryDate < new Date();

      return (
        <span
          className={`text-sm ${
            isExpired ? "text-rose-500 font-medium" : "text-muted-foreground"
          }`}
        >
          {format(expiryDate, "MMM dd, yyyy")}
        </span>
      );
    },
  }),

  // ============================================
  // CREATED AT
  // ============================================
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
];
