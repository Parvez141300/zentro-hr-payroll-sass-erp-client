/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IEmployee } from "@/types/employee.type";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import MarkAttendanceDialog from "./MarkAttendanceDialog";
import { Badge } from "@/components/ui/badge";

const columnHelper = createColumnHelper<IEmployee>();

export const markEmployeeAttendanceColumn: ColumnDef<IEmployee, any>[] = [
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
  columnHelper.accessor("user.employee.attendances.status", {
    header: "Status",
    cell: ({ row }) => {
      const status = row.original?.user?.employee?.attendances!.status;
      return (
        <span>
          {status ? (
            <Badge>{status}</Badge>
          ) : (
            <Badge variant="destructive">N/A</Badge>
          )}
        </span>
      );
    },
  }),
  columnHelper.display({
    id: "mark attendance",
    header: "Mark Attendance",
    cell: (info) => <MarkAttendanceDialog employeeId={info.row.original.id} />,
  }),
];
