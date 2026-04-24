import React from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../utils/cn'
import { Button } from '../primitives/button'
import { Input } from '../primitives/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../primitives/select'
import { Skeleton } from '../primitives/skeleton'

interface DataTableProps<T> {
  columns: ColumnDef<T>[]
  data: T[]
  pageSize?: number
  searchable?: boolean
  searchColumn?: string
  loading?: boolean
}

export function DataTableColumnHeader({ column, title }: { column: any; title: string }) {
  if (!column.getCanSort()) return <span>{title}</span>
  const sorted = column.getIsSorted()
  return (
    <button
      onClick={() => column.toggleSorting(sorted === 'asc')}
      className="flex items-center gap-1 hover:text-[hsl(var(--foreground))]"
    >
      {title}
      {sorted === 'asc' ? <ArrowUp className="h-3 w-3" /> : sorted === 'desc' ? <ArrowDown className="h-3 w-3" /> : <ArrowUpDown className="h-3 w-3 opacity-50" />}
    </button>
  )
}

export function DataTablePagination({ table }: { table: any }) {
  return (
    <div className="flex items-center justify-between px-2 py-3">
      <span className="text-sm text-[hsl(var(--muted-foreground))]">
        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </span>
      <div className="flex items-center gap-2">
        <Select
          value={String(table.getState().pagination.pageSize)}
          onValueChange={(v) => table.setPageSize(Number(v))}
        >
          <SelectTrigger className="h-8 w-[70px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            {[10, 20, 50].map((n) => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export function DataTableToolbar({ table, searchColumn }: { table: any; searchColumn?: string }) {
  if (!searchColumn) return null
  return (
    <div className="py-3">
      <Input
        placeholder="Search..."
        value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ''}
        onChange={(e) => table.getColumn(searchColumn)?.setFilterValue(e.target.value)}
        className="max-w-sm h-8"
      />
    </div>
  )
}

export function DataTable<T>({ columns, data, pageSize = 10, searchable, searchColumn, loading }: DataTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    initialState: { pagination: { pageSize } },
    state: { sorting },
  })

  if (loading) return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
    </div>
  )

  return (
    <div className="w-full">
      {searchable && <DataTableToolbar table={table} searchColumn={searchColumn} />}
      <div className="rounded-md border border-[hsl(var(--border))] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[hsl(var(--muted)/0.4)]">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => (
                  <th key={h.id} className="px-4 py-3 text-left font-medium text-[hsl(var(--muted-foreground))]">
                    {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, i) => (
              <tr key={row.id} className={cn('border-t border-[hsl(var(--border))] hover:bg-[hsl(var(--muted)/0.3)] transition-colors', i % 2 === 0 ? '' : 'bg-[hsl(var(--muted)/0.1)]')}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <tr><td colSpan={columns.length} className="px-4 py-8 text-center text-[hsl(var(--muted-foreground))]">No results.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
