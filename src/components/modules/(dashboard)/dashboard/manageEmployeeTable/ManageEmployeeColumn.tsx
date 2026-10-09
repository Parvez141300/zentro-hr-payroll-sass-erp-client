/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { IEmployee } from "@/types/employee.type";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<IEmployee>();

export const employeeColumn: ColumnDef<IEmployee, any>[] = [
  columnHelper.display({
    id: "serial",
    header: "SL",
    cell: (info) => info.row.index + 1,
  }),
  columnHelper.accessor("employeeCode", {
    header: "Employee Code",
    cell: ({ row }) => {
      const employeeCode = row.original.employeeCode;
      return <span>{employeeCode || "N/A"}</span>;
    },
  }),
  columnHelper.accessor("photoUrl", {
    header: "Photo",
    enableSorting: false,
    cell: ({ row }) => {
      const photoUrl = row.original.photoUrl;
      return (
        <Avatar>
          <AvatarImage
            src={photoUrl || "https://github.com/shadcn.png"}
            alt={row.original.name || "Employee Photo"}
          />
          <AvatarFallback>
            {row.original.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      );
    },
  }),
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("phone", {
    header: "Phone",
    cell: ({ row }) => {
      const phone = row.original.phone;
      return <span>{phone || "N/A"}</span>;
    },
  }),
  columnHelper.accessor("salaryType", {
    header: "Salary Type",
    cell: ({ row }) => {
      const salaryType = row.original.salaryType;
      return (
        <Badge
          variant={
            salaryType === "MONTHLY"
              ? "default"
              : salaryType === "DAILY"
                ? "secondary"
                : "outline"
          }
        >
          {salaryType || "N/A"}
        </Badge>
      );
    },
  }),
  columnHelper.display({
    id: "payroll",
    header: "Payroll",
    cell: (info) => {
      const employeeCode = info.row.original.employeeCode;
      return <span>{employeeCode || "N/A"}</span>;
    },
  }),
];
