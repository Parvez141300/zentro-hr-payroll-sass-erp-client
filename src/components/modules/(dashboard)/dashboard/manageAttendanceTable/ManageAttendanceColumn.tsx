/* eslint-disable @typescript-eslint/no-explicit-any */
import DateConversion from "@/components/shared/dateConversion/DateConversion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IAttendance } from "@/types/attendance.type";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<IAttendance>();

export const attendanceColumn: ColumnDef<IAttendance, any>[] = [
  columnHelper.display({
    id: "serial",
    header: "SL",
    cell: (info) => info.row.index + 1,
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
  columnHelper.accessor("date", {
    header: "Date",
    cell: (info) =>
      DateConversion({
        date: info.row.original.date,
        formatString: "dd MMM yyyy",
      }),
  }),
  columnHelper.accessor("checkIn", {
    header: "Check In",
    cell: (info) =>
      DateConversion({ date: info!.getValue(), formatString: "hh:mm aa" }) ||
      "N/A",
  }),
  columnHelper.accessor("checkOut", {
    header: "Check Out",
    cell: (info) =>
      DateConversion({ date: info!.getValue(), formatString: "hh:mm aa" }) ||
      "N/A",
  }),
];
