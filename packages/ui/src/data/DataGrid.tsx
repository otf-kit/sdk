'use client'

import React, { useCallback, useId, useMemo, useState } from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  ColumnResizeMode,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronDown,
  Columns3,
} from 'lucide-react'
import { cn } from '../utils/cn'

// ── Local primitives (avoid broken SDK paths) ─────────────

function Checkbox({
  checked,
  onCheckedChange,
  className,
}: {
  checked: boolean | 'indeterminate'
  onCheckedChange: (v: boolean) => void
  className?: string
}) {
  return (
    <input
      type="checkbox"
      checked={checked === true}
      ref={(el) => {
        if (el) el.indeterminate = checked === 'indeterminate'
      }}
      onChange={(e) => onCheckedChange(e.target.checked)}
      className={cn(
        'h-4 w-4 rounded border border-input accent-primary cursor-pointer',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
        className
      )}
    />
  )
}

// ── Types ────────────────────────────────────────────────────────

export interface DataGridProps<T extends object> {
  columns: ColumnDef<T, unknown>[]
  data: T[]
  /** Enable row checkboxes + bulk selection */
  selectable?: boolean
  /** Called when selection changes */
  onSelectionChange?: (rows: T[]) => void
  /** Enable column sorting */
  sortable?: boolean
  /** Enable column visibility toggle */
  columnVisibility?: boolean
  /** Enable column resize */
  resizable?: boolean
  /** Enable client-side column filtering */
  filterable?: boolean
  /** Virtualise rows for large datasets — enable when rows > ~100 */
  virtual?: boolean
  /** Height of the scroll container when virtual=true (default 480) */
  virtualHeight?: number
  /** Row height estimate for virtualizer (default 40) */
  rowHeight?: number
  /** Slot rendered when data is empty */
  emptyState?: React.ReactNode
  /** Slot rendered while loading */
  loading?: boolean
  /** Number of skeleton rows to show while loading (default 5) */
  skeletonRows?: number
  className?: string
  /** Called on row click */
  onRowClick?: (row: T) => void
}

// ── Sort icon helper ─────────────────────────────────────────────

function SortIcon({ dir }: { dir: 'asc' | 'desc' | false }) {
  if (dir === 'asc') return <ArrowUp className="h-3.5 w-3.5 shrink-0" />
  if (dir === 'desc') return <ArrowDown className="h-3.5 w-3.5 shrink-0" />
  return <ArrowUpDown className="h-3.5 w-3.5 shrink-0 opacity-30" />
}

// ── Column visibility dropdown ───────────────────────────────────

function ColumnVisibilityDropdown({
  columns,
  visibility,
  onVisibilityChange,
}: {
  columns: Array<{ id: string; label: string }>
  visibility: VisibilityState
  onVisibilityChange: (id: string, visible: boolean) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium',
          'bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'transition-colors'
        )}
      >
        <Columns3 className="h-3.5 w-3.5" />
        Columns
        <ChevronDown className="h-3 w-3" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-20 min-w-[140px] rounded-md border border-border bg-popover shadow-lg py-1">
            {columns.map((col) => (
              <label
                key={col.id}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-foreground hover:bg-accent cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 accent-primary"
                  checked={visibility[col.id] !== false}
                  onChange={(e) => onVisibilityChange(col.id, e.target.checked)}
                />
                {col.label}
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// ── Skeleton row ─────────────────────────────────────────────────

function SkeletonRow({ cols }: { cols: number }) {
  return (
    <tr className="border-t border-border">
      {Array.from({ length: cols }, (_, i) => (
        <td key={i} className="px-3 py-2.5">
          <div
            className="h-4 rounded bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:400%_100%] animate-[shimmer_2s_ease-in-out_infinite]"
            style={{ width: `${60 + Math.random() * 30}%` }}
          />
        </td>
      ))}
    </tr>
  )
}

// ── DataGrid ──────────────────────────────────────────────────────

export function DataGrid<T extends object>({
  columns,
  data,
  selectable = false,
  onSelectionChange,
  sortable = true,
  columnVisibility: showColumnVisibility = false,
  resizable = true,
  filterable = false,
  virtual = false,
  virtualHeight = 480,
  rowHeight = 40,
  emptyState,
  loading = false,
  skeletonRows = 5,
  className,
  onRowClick,
}: DataGridProps<T>) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [colVisibility, setColVisibility] = useState<VisibilityState>({})
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  // Selection column
  const selectionColumn: ColumnDef<T, unknown> = useMemo(
    () => ({
      id: '_select',
      size: 40,
      enableResizing: false,
      enableSorting: false,
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected()
              ? true
              : table.getIsSomePageRowsSelected()
                ? 'indeterminate'
                : false
          }
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(v)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(v)}
        />
      ),
    }),
    []
  )

  const allColumns = useMemo(
    () => (selectable ? [selectionColumn, ...columns] : columns),
    [selectable, selectionColumn, columns]
  )

  const table = useReactTable({
    data,
    columns: allColumns,
    columnResizeMode: 'onChange' as ColumnResizeMode,
    state: {
      rowSelection,
      sorting,
      columnFilters,
      columnVisibility: colVisibility,
    },
    onRowSelectionChange: (updater) => {
      const next =
        typeof updater === 'function' ? updater(rowSelection) : updater
      setRowSelection(next)
      if (onSelectionChange) {
        const selectedRows = Object.keys(next)
          .filter((k) => next[k])
          .map((k) => data[Number(k)])
          .filter(Boolean) as T[]
        onSelectionChange(selectedRows)
      }
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: sortable ? getSortedRowModel() : undefined,
    getFilteredRowModel: filterable ? getFilteredRowModel() : undefined,
    enableColumnResizing: resizable,
    enableRowSelection: selectable,
  })

  const { rows } = table.getRowModel()

  // Virtualiser
  const virtualizer = useVirtualizer({
    count: virtual ? rows.length : 0,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: () => rowHeight,
    overscan: 10,
  })

  const visibleColumnDefs = table
    .getAllLeafColumns()
    .filter((c) => c.id !== '_select' && c.getIsVisible())

  const columnVisibilityItems = visibleColumnDefs.map((c) => ({
    id: c.id,
    label: typeof c.columnDef.header === 'string'
      ? c.columnDef.header
      : c.id,
  }))

  const renderRows = () => {
    if (loading) {
      return Array.from({ length: skeletonRows }, (_, i) => (
        <SkeletonRow key={i} cols={allColumns.length} />
      ))
    }

    if (rows.length === 0) {
      return (
        <tr>
          <td
            colSpan={allColumns.length}
            className="py-16 text-center text-sm text-muted-foreground"
          >
            {emptyState ?? 'No results.'}
          </td>
        </tr>
      )
    }

    if (virtual) {
      const virtualItems = virtualizer.getVirtualItems()
      return (
        <>
          {virtualItems.length > 0 && (
            <tr style={{ height: virtualItems[0]!.start }}>
              <td colSpan={allColumns.length} />
            </tr>
          )}
          {virtualItems.map((vRow) => {
            const row = rows[vRow.index]!
            return (
              <tr
                key={row.id}
                data-index={vRow.index}
                className={cn(
                  'border-t border-border transition-colors',
                  onRowClick && 'cursor-pointer',
                  row.getIsSelected()
                    ? 'bg-primary/5'
                    : 'hover:bg-accent/40'
                )}
                onClick={() => onRowClick?.(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                    className="px-3 py-2 text-sm border-r border-border last:border-r-0 truncate max-w-0"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            )
          })}
          {virtualItems.length > 0 && (
            <tr
              style={{
                height:
                  virtualizer.getTotalSize() -
                  (virtualItems[virtualItems.length - 1]?.end ?? 0),
              }}
            >
              <td colSpan={allColumns.length} />
            </tr>
          )}
        </>
      )
    }

    return rows.map((row) => (
      <tr
        key={row.id}
        className={cn(
          'border-t border-border transition-colors',
          onRowClick && 'cursor-pointer',
          row.getIsSelected() ? 'bg-primary/5' : 'hover:bg-accent/40'
        )}
        onClick={() => onRowClick?.(row.original)}
      >
        {row.getVisibleCells().map((cell) => (
          <td
            key={cell.id}
            style={{ width: cell.column.getSize() }}
            className="px-3 py-2 text-sm border-r border-border last:border-r-0 truncate max-w-0"
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    ))
  }

  return (
    <div data-slot="data-grid" className={cn('flex flex-col gap-2', className)}>
      {/* Toolbar */}
      {showColumnVisibility && (
        <div className="flex items-center justify-end gap-2">
          <ColumnVisibilityDropdown
            columns={columnVisibilityItems}
            visibility={colVisibility}
            onVisibilityChange={(id, visible) =>
              setColVisibility((prev) => ({ ...prev, [id]: visible }))
            }
          />
        </div>
      )}

      {/* Table */}
      <div
        ref={virtual ? scrollContainerRef : undefined}
        className="overflow-auto rounded-md border border-border"
        style={virtual ? { height: virtualHeight } : undefined}
      >
        <table
          className="w-full text-sm"
          style={{ width: table.getCenterTotalSize() }}
        >
          <thead className="sticky top-0 z-10 bg-muted/60 backdrop-blur-sm">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => (
                  <th
                    key={h.id}
                    style={{ width: h.getSize() }}
                    className="relative px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider border-r border-border last:border-r-0 whitespace-nowrap"
                  >
                    <div
                      className={cn(
                        'flex items-center gap-1.5 select-none',
                        h.column.getCanSort() && 'cursor-pointer hover:text-foreground transition-colors'
                      )}
                      onClick={h.column.getCanSort() ? h.column.getToggleSortingHandler() : undefined}
                    >
                      {h.isPlaceholder
                        ? null
                        : flexRender(h.column.columnDef.header, h.getContext())}
                      {h.column.getCanSort() && (
                        <SortIcon dir={h.column.getIsSorted()} />
                      )}
                    </div>
                    {/* Resize handle */}
                    {h.column.getCanResize() && (
                      <div
                        onMouseDown={h.getResizeHandler()}
                        onTouchStart={h.getResizeHandler()}
                        className={cn(
                          'absolute right-0 top-0 h-full w-1 cursor-col-resize touch-none select-none',
                          'hover:bg-primary/40',
                          h.column.getIsResizing() && 'bg-primary/60'
                        )}
                      />
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>{renderRows()}</tbody>
        </table>
      </div>

      {/* Row count */}
      {selectable && Object.keys(rowSelection).length > 0 && (
        <p className="text-xs text-muted-foreground">
          {Object.keys(rowSelection).filter((k) => rowSelection[k]).length} of{' '}
          {data.length} row(s) selected
        </p>
      )}
    </div>
  )
}
