"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onRowClick?: (row:TData) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
  <div
    className="
      overflow-hidden
      rounded-none border-0 bg-white text-zinc-900 shadow-sm
      ring-1 ring-zinc-200/60
      dark:bg-zinc-900 dark:text-zinc-50 dark:ring-zinc-800
      [&_tr]:border-b [&_tr:last-child]:border-0
    "
  >
    <Table className="w-full">
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              onClick={() => onRowClick?.(row.original)}
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className="
                cursor-pointer transition-colors
                hover:bg-zinc-50/70 dark:hover:bg-zinc-800/60
                data-[state=selected]:bg-indigo-50 dark:data-[state=selected]:bg-indigo-950/40
              "
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className="py-3 first:pl-4 last:pr-4 align-middle text-sm"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="h-24 text-center text-zinc-500"
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>
);
}