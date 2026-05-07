import React from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  RowSelectionState,
  ColumnResizeMode,
} from '@tanstack/react-table'
import { cn } from '../utils/cn'
import { Checkbox } from '../../primitives/checkbox'

interface DataGridProps<T extends object> {
  columns: ColumnDef<T, any>[]
  data: T[]
  onDataChange?: (data: T[]) => void
  editable?: boolean
  className?: string
}

function EditableCell<T>({ value: initial, onSave }: { value: unknown; onSave: (v: string) => void }) {
  const [editing, setEditing] = React.useState(false)
  const [val, setVal] = React.useState(String(initial ?? ''))

  const commit = () => { onSave(val); setEditing(false) }

  if (editing) {
    return (
      <input
        autoFocus
        className="w-full bg-transparent outline outline-1 outline-[hsl(var(--ring))] rounded px-1 text-sm"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') setEditing(false) }}
      />
    )
  }
  return (
    <span className="cursor-pointer w-full block" onDoubleClick={() => setEditing(true)}>
      {String(initial ?? '')}
    </span>
  )
}

const selectionCol = <T,>(): ColumnDef<T> => ({
  id: '_select',
  header: ({ table }) => (
    <Checkbox checked={table.getIsAllRowsSelected()} onCheckedChange={(v) => table.toggleAllRowsSelected(!!v)} />
  ),
  cell: ({ row }) => (
    <Checkbox checked={row.getIsSelected()} onCheckedChange={(v) => row.toggleSelected(!!v)} />
  ),
  size: 40,
  enableResizing: false,
})

export function DataGrid<T extends object>({ columns, data: initialData, onDataChange, editable, className }: DataGridProps<T>) {
  const [data, setData] = React.useState<T[]>(initialData)
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const columnResizeMode: ColumnResizeMode = 'onChange'

  const editableColumns = React.useMemo(() => {
    if (!editable) return columns
    return columns.map((col) => ({
      ...col,
      cell: (info: any) => (
        <EditableCell
          value={info.getValue()}
          onSave={(v) => {
            const updated = data.map((row, i) =>
              i === info.row.index ? { ...row, [info.column.id]: v } : row
            ) as T[]
            setData(updated)
            onDataChange?.(updated)
          }}
        />
      ),
    }))
  }, [columns, data, editable, onDataChange])

  const allColumns = React.useMemo(() => [selectionCol<T>(), ...editableColumns], [editableColumns])

  const table = useReactTable({
    data,
    columns: allColumns,
    columnResizeMode,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
    enableColumnResizing: true,
  })

  return (
    <div className={cn('overflow-auto rounded-md border border-[hsl(var(--border))]', className)}>
      <table className="w-full text-sm" style={{ width: table.getCenterTotalSize() }}>
        <thead className="bg-[hsl(var(--muted)/0.4)]">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((h) => (
                <th key={h.id} style={{ width: h.getSize() }} className="relative px-3 py-2 text-left font-medium text-[hsl(var(--muted-foreground))] border-r border-[hsl(var(--border))] last:border-r-0">
                  {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                  {h.column.getCanResize() && (
                    <div onMouseDown={h.getResizeHandler()} className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-[hsl(var(--primary)/0.4)]" />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={cn('border-t border-[hsl(var(--border))] hover:bg-[hsl(var(--muted)/0.3)] transition-colors', row.getIsSelected() && 'bg-[hsl(var(--primary)/0.06)]')}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} style={{ width: cell.column.getSize() }} className="px-3 py-2 border-r border-[hsl(var(--border))] last:border-r-0">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
