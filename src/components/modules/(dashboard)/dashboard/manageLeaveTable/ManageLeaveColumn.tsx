/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ILeave } from "@/types/leave.type";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<ILeave>();

export const leaveColumn: ColumnDef<ILeave, any>[] = [
  columnHelper.display({
    id: "serial",
    header: "SL",
    cell: (info) => info.row.index + 1,
    enableSorting: false,
  }),
  columnHelper.accessor("employee.photoUrl", {
    header: "Photo",
    enableSorting: false,
    cell: ({ row }) => {
      const photoUrl = row.original.employee?.photoUrl;
      return (
        <Avatar>
          <AvatarImage
            src={photoUrl || "https://github.com/shadcn.png"}
            alt={row.original.employee?.name || "Employee Photo"}
          />
          <AvatarFallback>
            {row.original.employee?.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      );
    },
  }),
  columnHelper.accessor("employee.name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("leaveType.name", {
    header: "Leave Type",
  }),
  columnHelper.accessor("startDate", {
    header: "Start Date",
  }),
  columnHelper.accessor("endDate", {
    header: "End Date",
  }),
  columnHelper.accessor("status", {
    header: "Status",
  }),
];
