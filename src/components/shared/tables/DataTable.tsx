// components/shared/tables/DataTable.tsx
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
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  EllipsisVertical,
  Eye,
  PencilIcon,
  TrashIcon,
  X,
} from "lucide-react";
import React from "react";
import LoadingCircle from "../loadings/LoadingCircle";
import TablePagination from "./TablePagination";
import TableSearchField from "./TableSearchField";

interface IDataTableActions<TData> {
  onView?: (data: TData) => void;
  onEdit?: (data: TData) => void;
  onDelete?: (data: TData) => void;
}

interface IDataTableToolbar {
  search?: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  };
  filters?: React.ReactNode; // parent যা চায় বসাবে, দরকার না হলে undefined
  onClearFilters?: () => void; // দিলে "Clear filters" বাটন দেখাবে
  actions?: React.ReactNode; // যেমন department এর "Create Department" বাটন+dialog
}

interface IDataTablePagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  limitOptions?: number[];
}

interface IDataTableProps<TData> {
  title: string;
  description?: string;
  data: TData[];
  columns: ColumnDef<TData>[];
  actions?: IDataTableActions<TData>;
  emptyMessage?: string;
  isLoading?: boolean;
  sorting?: {
    state: SortingState;
    onSortingChange: (state: SortingState) => void;
  };
  toolbar?: IDataTableToolbar;
  pagination?: IDataTablePagination;
}

const DataTable = <TData,>({
  title,
  description,
  data,
  columns,
  actions,
  emptyMessage,
  isLoading,
  sorting,
  toolbar,
  pagination,
}: IDataTableProps<TData>) => {
  const tableColumns: ColumnDef<TData>[] = actions
    ? [
        ...columns,
        {
          id: "actions",
          header: "Actions",
          enableSorting: false,
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
                    {actions.onView && (
                      <DropdownMenuItem
                        onClick={() => actions.onView?.(rowData)}
                      >
                        <Eye /> View
                      </DropdownMenuItem>
                    )}
                    {
                      // edit
                      actions.onEdit && (
                        <DropdownMenuItem
                          onClick={() => actions.onEdit?.(rowData)}
                        >
                          <PencilIcon /> Edit
                        </DropdownMenuItem>
                      )
                    }
                  </DropdownMenuGroup>
                  {actions.onDelete && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => actions.onDelete?.(rowData)}
                        >
                          <TrashIcon /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </>
                  )}
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
    manualSorting: !!sorting?.state,
    getSortedRowModel: getSortedRowModel(),
    state: {
      ...(sorting ? { sorting: sorting.state } : {}),
    },
    onSortingChange: sorting
      ? (updater) => {
          const currentSortingState = sorting.state;
          const nextSortingState =
            typeof updater === "function"
              ? updater(currentSortingState)
              : updater;
          sorting.onSortingChange(nextSortingState);
        }
      : undefined,
  });

  const hasToolbar =
    toolbar?.search ||
    toolbar?.filters ||
    toolbar?.actions ||
    toolbar?.onClearFilters;

  return (
    <div className="relative">
      <div className="flex justify-between items-end mb-8">
        <div className="space-y-1">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {toolbar?.actions && <div>{toolbar.actions}</div>}
      </div>
      {/* Toolbar: search + filters (left) | create action (right) */}
      {hasToolbar && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {/* search field */}
            {toolbar?.search && (
              <>
                {/* <div className="relative w-full max-w-xs">
                  <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder={toolbar.search.placeholder || "Search..."}
                    value={toolbar.search.value}
                    onChange={(e) => toolbar.search?.onChange(e.target.value)}
                    className="pl-8"
                  />
                </div> */}

                <TableSearchField
                  value={toolbar.search.value}
                  onChange={toolbar.search.onChange}
                  placeholder={toolbar.search.placeholder}
                />
              </>
            )}

            {/* filter component */}
            {toolbar?.filters}

            {/* clear filters button */}
            {toolbar?.onClearFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toolbar.onClearFilters}
                className="gap-1"
              >
                <X className="w-4 h-4" /> Clear filters
              </Button>
            )}
          </div>
        </div>
      )}

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
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="font-bold">
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <Button
                        variant={"ghost"}
                        className={"cursor-pointer"}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {header.column.getIsSorted() === "asc" ? (
                          <ArrowUp className="w-5 h-5" />
                        ) : header.column.getIsSorted() === "desc" ? (
                          <ArrowDown className="w-5 h-5" />
                        ) : (
                          <ArrowUpDown className="w-5 h-5" />
                        )}
                      </Button>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )
                    )}
                  </TableHead>
                ))}
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

      {/* pagination component */}
      {pagination && (
        <TablePagination
          page={pagination.page}
          limit={pagination.limit}
          total={pagination.total}
          totalPages={pagination.totalPages}
          onPageChange={pagination.onPageChange}
          onLimitChange={pagination.onLimitChange}
          limitOptions={pagination.limitOptions}
        />
      )}
    </div>
  );
};

export default DataTable;
