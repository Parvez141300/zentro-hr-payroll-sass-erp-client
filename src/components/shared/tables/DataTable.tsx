"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { EllipsisVertical, Eye, PencilIcon, TrashIcon } from "lucide-react";

import React from "react";
import LoadingCircle from "../loadings/LoadingCircle";

interface IDataTableActions<TData> {
  onView?: (data: TData) => void;
  onEdit?: (data: TData) => void;
  onDelete?: (data: TData) => void;
}

interface IDataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  actions?: IDataTableActions<TData>;
  emptyMessage?: string;
  isLoading?: boolean;
}

const DataTable = <TData,>({
  data,
  columns,
  actions,
  emptyMessage,
  isLoading,
}: IDataTableProps<TData>) => {

  const tableColumns: ColumnDef<TData>[] = actions
    ? [
        ...columns,
        // action column
        {
          id: "actions",
          header: "Actions",
          cell: ({ row }) => {
            const rowData = row.original;
            return (
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="outline">
                      <EllipsisVertical />
                    </Button>
                  }
                />
                <DropdownMenuContent align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => actions.onView?.(rowData)}>
                      <Eye /> View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => actions.onEdit?.(rowData)}>
                      <PencilIcon /> Edit
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => actions.onDelete?.(rowData)}
                    >
                      <TrashIcon /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            );
          },
        },
      ]
    : columns;

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center z-10 bg-background/50 backdrop-blur-sm">
          <LoadingCircle />
        </div>
      )}
      {/* Table */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="font-bold">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {emptyMessage || "No Data Available!"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
