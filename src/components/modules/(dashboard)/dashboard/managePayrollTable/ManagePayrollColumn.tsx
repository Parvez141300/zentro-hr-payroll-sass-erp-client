/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPayroll } from "@/types/payroll.type";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import DateConversion from "@/components/shared/dateConversion/DateConversion";

const columnHelper = createColumnHelper<IPayroll>();

export const payrollColumn: ColumnDef<IPayroll, any>[] = [
  columnHelper.display({
    id: "serial",
    header: "SL",
    cell: (info) => info.row.index + 1,
  }),

  columnHelper.accessor("employee", {
    header: "Employee",
    cell: (info) => {
      const employee = info.getValue();
      return employee?.name || "N/A";
    },
  }),

  columnHelper.accessor("employee", {
    id: "employeeCode",
    header: "Employee Code",
    cell: (info) => {
      const employee = info.getValue();
      return employee?.employeeCode || "N/A";
    },
  }),

  columnHelper.accessor("netSalary", {
    header: "Net Salary",
    cell: (info) => {
      const value = info.getValue();
      return `BDT ${value.toLocaleString()}`;
    },
  }),

  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const status = info.getValue();
      const variantMap: Record<
        string,
        "default" | "secondary" | "destructive" | "outline"
      > = {
        DRAFT: "secondary",
        PENDING: "outline",
        APPROVED: "default",
        PAID: "default",
        REJECTED: "destructive",
        CANCELLED: "secondary",
      };

      const labelMap: Record<string, string> = {
        DRAFT: "Draft",
        PENDING: "Pending",
        APPROVED: "Approved",
        PAID: "Paid",
        REJECTED: "Rejected",
        CANCELLED: "Cancelled",
      };

      return (
        <Badge variant={variantMap[status] || "secondary"} className="text-xs">
          {labelMap[status] || status}
        </Badge>
      );
    },
  }),

  columnHelper.accessor("salaryType", {
    header: "Salary Type",
    cell: (info) => {
      const salaryType = info.getValue();
      const variantMap: Record<
        string,
        "default" | "secondary" | "destructive" | "outline"
      > = {
        MONTHLY: "default",
        DAILY: "secondary",
        HOURLY: "outline",
      };

      const labelMap: Record<string, string> = {
        MONTHLY: "Monthly",
        DAILY: "Daily",
        HOURLY: "Hourly",
      };

      return (
        <Badge variant={variantMap[salaryType] || "secondary"} className="text-xs">
          {labelMap[salaryType] || salaryType}
        </Badge>
      );
    },
  }),

  columnHelper.accessor("paidAt", {
    header: "Payment Date",
    cell: (info) => {
      const date = info.getValue();
      return date ? DateConversion({ date: new Date(date) }) : "N/A";
    },
  }),
];
