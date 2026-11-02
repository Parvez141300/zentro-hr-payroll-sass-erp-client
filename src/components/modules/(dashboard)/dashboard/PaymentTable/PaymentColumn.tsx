/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPayment } from "@/types/payment.type";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
  PaymentGateway,
  PaymentStatus,
  SubscriptionPlan,
} from "@/types/enums.type";

const columnHelper = createColumnHelper<IPayment>();

// ==================== HELPERS ====================
// ✅ Column-এর আগে define করতে হবে

const formatPaymentStatus = (status: PaymentStatus) =>
  status
    .toLowerCase()
    .split("_")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

const getPaymentStatusVariant = (status: PaymentStatus) => {
  switch (status) {
    case PaymentStatus.SUCCESS:
      return "default";
    case PaymentStatus.PENDING:
      return "secondary";
    case PaymentStatus.FAILED:
      return "destructive";
    case PaymentStatus.REFUNDED:
      return "outline";
    default:
      return "outline";
  }
};

const formatPlan = (plan: SubscriptionPlan) =>
  plan
    .toLowerCase()
    .split("_")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

const formatGateway = (gateway: PaymentGateway) =>
  gateway === PaymentGateway.STRIPE ? "Stripe" : "SSLCommerz";

const formatAmount = (amountUSD: number | null, amountBDT: number | null) => {
  if (amountBDT != null) return `৳ ${amountBDT.toLocaleString()}`;
  if (amountUSD != null) return `$${amountUSD.toLocaleString()}`;
  return "N/A";
};

const formatDate = (date: Date | string | null) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// ==================== COLUMNS ====================

export const paymentColumn: ColumnDef<IPayment, any>[] = [
  columnHelper.display({
    id: "serial",
    header: "SL",
    cell: (info) => info.row.index + 1,
  }),

  columnHelper.accessor("plan", {
    header: "Plan",
    cell: ({ row }) => (
      <span className="font-semibold">{formatPlan(row.original.plan)}</span>
    ),
  }),

  columnHelper.accessor("gateway", {
    header: "Gateway",
    cell: ({ row }) => (
      <Badge variant="outline">{formatGateway(row.original.gateway)}</Badge>
    ),
  }),

  columnHelper.display({
    id: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span className="font-semibold text-green-600">
        {formatAmount(row.original.amountUSD, row.original.amountBDT)}
      </span>
    ),
  }),

  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={getPaymentStatusVariant(row.original.status)}>
        {formatPaymentStatus(row.original.status)}
      </Badge>
    ),
  }),

  columnHelper.accessor("paidAt", {
    header: "Paid At",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatDate(row.original.paidAt)}
      </span>
    ),
  }),

  columnHelper.display({
    id: "subscriptionPeriod",
    header: "Subscription Period",
    cell: ({ row }) => {
      const { subscriptionStart, subscriptionEnd } = row.original;
      if (!subscriptionStart || !subscriptionEnd) {
        return <span className="text-muted-foreground text-sm">N/A</span>;
      }
      return (
        <span className="text-sm">
          {formatDate(subscriptionStart)} — {formatDate(subscriptionEnd)}
        </span>
      );
    },
  }),

  columnHelper.display({
    id: "invoice",
    header: "Invoice",
    cell: ({ row }) => {
      const url = row.original.invoiceUrl;
      if (!url) return <span className="text-muted-foreground">N/A</span>;
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline text-sm"
        >
          Download
        </a>
      );
    },
  }),

  columnHelper.accessor("createdAt", {
    header: "Created",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatDate(row.original.createdAt)}
      </span>
    ),
  }),
];
