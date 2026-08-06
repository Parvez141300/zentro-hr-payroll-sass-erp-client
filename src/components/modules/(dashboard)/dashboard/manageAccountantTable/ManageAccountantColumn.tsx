/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IAccountant } from "@/types/accountant.type";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<IAccountant>();

export const accountantColumns : ColumnDef<IAccountant, any>[] = [
  columnHelper.display({
    id: "serial",
    header: "SL",
    cell: (info) => info.row.index + 1,
  }),
  columnHelper.display({
    id: "employeeCode",
    header: "Employee Code",
    cell: (info) => info.getValue(),
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
  columnHelper.display({
    id: "name",
    header: "Accountant Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    id: "phone",
    header: "Phone",
    cell: (info) => info.getValue(),
  }),
];
