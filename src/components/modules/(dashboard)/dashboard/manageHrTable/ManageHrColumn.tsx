/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IHrManager } from "@/types/hrManager.type";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<IHrManager>();

export const ManageHrColumn: ColumnDef<IHrManager, any>[] = [
  columnHelper.display({
    id: "serial",
    header: "SL",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  }),
  columnHelper.accessor("employeeCode", {
    header: "Employee Code",
  }),
  columnHelper.accessor("photoUrl", {
    header: "Photo",
    enableSorting: false,
    cell: ({ row }) => {
      const photoUrl = row.original.photoUrl;
      return photoUrl ? (
        <Avatar>
          <AvatarImage
            src={photoUrl || "https://github.com/shadcn.png"}
            alt={row.original.name || "Hr Manager Photo"}
          />
          <AvatarFallback>
            {row.original.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ) : (
        "N/A"
      );
    },
  }),
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("officePhone", {
    header: "Office Phone",
  }),
];
