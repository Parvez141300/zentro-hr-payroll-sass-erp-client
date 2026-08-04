/* eslint-disable @typescript-eslint/no-explicit-any */
import DateConversion from "@/components/shared/dateConversion/DateConversion";
import { IDesignation } from "@/types/designation.type";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<IDesignation>();

export const designationColumns: ColumnDef<IDesignation, any>[] = [
    columnHelper.display({
        id: "serial",
        header: "SL",
        cell: (info) => info.row.index + 1,
    }),
    columnHelper.accessor("title", {
        header: "Title",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("description", {
        header: "Description",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("department.name", {
        header: "Department",
        cell: (info) => info.getValue(),
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