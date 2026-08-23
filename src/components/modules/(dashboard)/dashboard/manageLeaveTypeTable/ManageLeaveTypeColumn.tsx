/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { ILeaveType } from "@/types/leaveType.type";
import DateConversion from "@/components/shared/dateConversion/DateConversion";

const columnHelper = createColumnHelper<ILeaveType>();

export const leaveTypeColumn: ColumnDef<ILeaveType, any>[] = [
  columnHelper.display({
    id: "serial",
    header: "SL",
    cell: (info) => info.row.index + 1,
  }),
  columnHelper.accessor("name", {
    id: "name",
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("daysAllowed", {
    id: "daysAllowed",
    header: "Days Allowed",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("createdAt", {
    header: "Created At",
    cell: (info) => DateConversion({ date: new Date(info.getValue()) }),
  }),
];
