/* eslint-disable @typescript-eslint/no-explicit-any */
import DateConversion from "@/components/shared/dateConversion/DateConversion";
import { IDepartment } from "@/types/department.type";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<IDepartment>();

export const departmentColumns: ColumnDef<IDepartment, any>[] = [
  columnHelper.display({
    id: "serial",
    header: "SL",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  }),
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("description", {
    header: "Description",
    cell: ({ row }) => <span>{row.original.description || "N/A"}</span>,
  }),
  columnHelper.accessor("createdAt", {
    header: "Date & Time",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span>
            Created:{" "}
            {DateConversion({
              date: row.original.createdAt,
              formatString: "dd MMM yyyy",
            })}
          </span>
          <span>
            Updated:{" "}
            {DateConversion({
              date: row.original.updatedAt,
              formatString: "dd MMM yyyy",
            })}
          </span>
        </div>
      );
    },
  }),
];
