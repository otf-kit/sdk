'use client'

import React from 'react'
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
  pointerWithin,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { useVirtualizer } from '@tanstack/react-virtual'
import { ChevronRight } from 'lucide-react'
import { cn } from '../utils/cn'

// ── Types ────────────────────────────────────────────────────────

export type TreeNode = {
  id: string
  label: string
  icon?: React.ReactNode
  children?: TreeNode[]
  data?: unknown
}

export type TreeMovePosition = 'before' | 'after' | 'inside'

export type TreeProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> & {
  data: TreeNode[]
  defaultExpandedIds?: string[]
  /** Controlled expanded ids. */
  expandedIds?: string[]
  onExpandedChange?: (ids: string[]) => void
  selectedId?: string
  onSelect?: (node: TreeNode) => void
  /** Define to enable drag-reorder. Omit to disable drag entirely. */
  onMove?: (sourceId: string, targetId: string, position: TreeMovePosition) => void
  /** Show vertical guide lines from caret to children. Default true. */
  showLines?: boolean
  /** Use @tanstack/react-virtual to virtualize visible rows. Default false. */
  virtualize?: boolean
  /** Used when virtualize=true. Default 32. */
  estimatedRowHeight?: number
}

// ── Internals ────────────────────────────────────────────────────

interface FlatRow {
  node: TreeNode
  depth: number
  parentId: string | null
  hasChildren: boolean
  expanded: boolean
}

function flatten(
  nodes: TreeNode[],
  expanded: Set<string>,
  depth = 0,
  parentId: string | null = null,
  out: FlatRow[] = []
): FlatRow[] {
  for (const node of nodes) {
    const hasChildren = !!node.children && node.children.length > 0
    const isExpanded = expanded.has(node.id)
    out.push({ node, depth, parentId, hasChildren, expanded: isExpanded })
    if (hasChildren && isExpanded) {
      flatten(node.children!, expanded, depth + 1, node.id, out)
    }
  }
  return out
}

// ── Drop zone (one of three per row) ─────────────────────────────

function DropZone({
  id,
  className,
  activeClassName,
}: {
  id: string
  className?: string
  activeClassName?: string
}) {
  const { setNodeRef, isOver } = useDroppable({ id })
  return (
    <div
      ref={setNodeRef}
      data-slot="tree-dropzone"
      className={cn(className, isOver && activeClassName)}
    />
  )
}

// ── Row ──────────────────────────────────────────────────────────

interface TreeRowProps {
  row: FlatRow
  selectedId?: string
  showLines: boolean
  draggable: boolean
  onToggle: (id: string) => void
  onSelect?: (node: TreeNode) => void
  onRowKeyDown: (e: React.KeyboardEvent<HTMLDivElement>, row: FlatRow) => void
  registerRef: (id: string, el: HTMLDivElement | null) => void
  focusedId: string | null
  setFocusedId: (id: string) => void
  style?: React.CSSProperties
}

function TreeRow({
  row,
  selectedId,
  showLines,
  draggable,
  onToggle,
  onSelect,
  onRowKeyDown,
  registerRef,
  focusedId,
  setFocusedId,
  style,
}: TreeRowProps) {
  const { node, depth, hasChildren, expanded } = row
  const isSelected = selectedId === node.id
  const isFocused = focusedId === node.id

  const draggableState = useDraggable({
    id: node.id,
    disabled: !draggable,
  })
  const setDragRef = draggableState.setNodeRef
  const dragAttributes = draggable ? draggableState.attributes : undefined
  const dragListeners = draggable ? draggableState.listeners : undefined
  const isDragging = draggable ? draggableState.isDragging : false

  const handleClick = () => {
    setFocusedId(node.id)
    onSelect?.(node)
  }

  const indent = depth * 16

  return (
    <div
      ref={(el) => {
        setDragRef(el)
        registerRef(node.id, el)
      }}
      role="treeitem"
      aria-level={depth + 1}
      aria-selected={isSelected || undefined}
      aria-expanded={hasChildren ? expanded : undefined}
      tabIndex={isFocused ? 0 : -1}
      data-slot="tree-row"
      data-dragging={isDragging || undefined}
      data-selected={isSelected || undefined}
      onClick={handleClick}
      onKeyDown={(e) => onRowKeyDown(e, row)}
      onFocus={() => setFocusedId(node.id)}
      style={style}
      className={cn(
        'relative flex items-center gap-1.5 rounded-md px-1.5 py-1 text-sm select-none',
        'cursor-pointer outline-none',
        'hover:bg-accent/60',
        'focus-visible:ring-2 focus-visible:ring-ring',
        isSelected && 'bg-accent text-accent-foreground',
        isDragging && 'opacity-50'
      )}
      {...dragAttributes}
      {...dragListeners}
    >
      {/* Indent + guide lines */}
      <span
        aria-hidden="true"
        className="relative flex-shrink-0"
        style={{ width: indent }}
      >
        {showLines && depth > 0 && (
          <span
            className="absolute top-0 bottom-0 border-l border-border/60"
            style={{ left: indent - 8 }}
          />
        )}
      </span>

      {/* Caret */}
      <span
        onClick={(e) => {
          if (!hasChildren) return
          e.stopPropagation()
          onToggle(node.id)
        }}
        className={cn(
          'flex h-4 w-4 flex-shrink-0 items-center justify-center rounded text-muted-foreground',
          hasChildren && 'hover:bg-accent hover:text-foreground'
        )}
      >
        {hasChildren ? (
          <ChevronRight
            className={cn(
              'h-3.5 w-3.5 motion-safe:transition-transform',
              expanded && 'rotate-90'
            )}
          />
        ) : null}
      </span>

      {/* Icon */}
      {node.icon != null && (
        <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center text-muted-foreground">
          {node.icon}
        </span>
      )}

      {/* Label */}
      <span className="flex-1 min-w-0 truncate">{node.label}</span>

      {/* Drop zones (rendered only when drag is enabled) */}
      {draggable && (
        <>
          <DropZone
            id={`before:${node.id}`}
            className="absolute inset-x-0 top-0 h-1.5 z-10"
            activeClassName="bg-primary/80 rounded-full"
          />
          <DropZone
            id={`inside:${node.id}`}
            className="absolute inset-x-0 top-1.5 bottom-1.5 z-0"
            activeClassName="ring-2 ring-primary rounded-md"
          />
          <DropZone
            id={`after:${node.id}`}
            className="absolute inset-x-0 bottom-0 h-1.5 z-10"
            activeClassName="bg-primary/80 rounded-full"
          />
        </>
      )}
    </div>
  )
}

// ── Tree ─────────────────────────────────────────────────────────

/**
 * Recursive expandable Tree built from primitives.
 * - Uncontrolled: pass `defaultExpandedIds`.
 * - Controlled: pass `expandedIds` + `onExpandedChange`.
 * - Drag-reorder: provide `onMove`. Omit to disable drag.
 * - Virtualization: opt-in via `virtualize` (uses @tanstack/react-virtual).
 */
export const Tree = React.forwardRef<HTMLDivElement, TreeProps>(
  (
    {
      data,
      defaultExpandedIds,
      expandedIds,
      onExpandedChange,
      selectedId,
      onSelect,
      onMove,
      showLines = true,
      virtualize = false,
      estimatedRowHeight = 32,
      className,
      ...props
    },
    ref
  ) => {
    // Expanded state (controlled or uncontrolled)
    const isControlled = expandedIds !== undefined
    const [internalExpanded, setInternalExpanded] = React.useState<Set<string>>(
      () => new Set(defaultExpandedIds ?? [])
    )
    const expandedSet = React.useMemo(
      () => (isControlled ? new Set(expandedIds) : internalExpanded),
      [isControlled, expandedIds, internalExpanded]
    )

    const commitExpanded = React.useCallback(
      (next: Set<string>) => {
        if (!isControlled) setInternalExpanded(next)
        onExpandedChange?.(Array.from(next))
      },
      [isControlled, onExpandedChange]
    )

    const toggle = React.useCallback(
      (id: string) => {
        const next = new Set(expandedSet)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        commitExpanded(next)
      },
      [expandedSet, commitExpanded]
    )

    const expand = React.useCallback(
      (id: string) => {
        if (expandedSet.has(id)) return
        const next = new Set(expandedSet)
        next.add(id)
        commitExpanded(next)
      },
      [expandedSet, commitExpanded]
    )

    const collapse = React.useCallback(
      (id: string) => {
        if (!expandedSet.has(id)) return
        const next = new Set(expandedSet)
        next.delete(id)
        commitExpanded(next)
      },
      [expandedSet, commitExpanded]
    )

    const rows = React.useMemo(
      () => flatten(data, expandedSet),
      [data, expandedSet]
    )

    // Focus management for keyboard navigation
    const [focusedId, setFocusedId] = React.useState<string | null>(
      () => selectedId ?? data[0]?.id ?? null
    )
    const rowRefs = React.useRef(new Map<string, HTMLDivElement>())
    const registerRef = React.useCallback(
      (id: string, el: HTMLDivElement | null) => {
        if (el) rowRefs.current.set(id, el)
        else rowRefs.current.delete(id)
      },
      []
    )

    const moveFocus = React.useCallback((id: string) => {
      setFocusedId(id)
      const el = rowRefs.current.get(id)
      el?.focus()
    }, [])

    const onRowKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>, row: FlatRow) => {
        const idx = rows.findIndex((r) => r.node.id === row.node.id)
        if (idx === -1) return

        switch (e.key) {
          case 'ArrowDown': {
            e.preventDefault()
            const next = rows[idx + 1]
            if (next) moveFocus(next.node.id)
            break
          }
          case 'ArrowUp': {
            e.preventDefault()
            const prev = rows[idx - 1]
            if (prev) moveFocus(prev.node.id)
            break
          }
          case 'ArrowRight': {
            e.preventDefault()
            if (row.hasChildren && !row.expanded) {
              expand(row.node.id)
            } else if (row.hasChildren && row.expanded) {
              const next = rows[idx + 1]
              if (next) moveFocus(next.node.id)
            }
            break
          }
          case 'ArrowLeft': {
            e.preventDefault()
            if (row.hasChildren && row.expanded) {
              collapse(row.node.id)
            } else if (row.parentId) {
              moveFocus(row.parentId)
            }
            break
          }
          case 'Enter':
          case ' ': {
            e.preventDefault()
            onSelect?.(row.node)
            break
          }
        }
      },
      [rows, moveFocus, expand, collapse, onSelect]
    )

    // Drag sensors
    const sensors = useSensors(
      useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
      useSensor(KeyboardSensor)
    )

    const [activeDragId, setActiveDragId] = React.useState<string | null>(null)

    const handleDragStart = React.useCallback((e: DragStartEvent) => {
      setActiveDragId(String(e.active.id))
    }, [])

    const handleDragEnd = React.useCallback(
      (e: DragEndEvent) => {
        setActiveDragId(null)
        const { active, over } = e
        if (!over || !onMove) return
        const sourceId = String(active.id)
        const overId = String(over.id)
        const sepIdx = overId.indexOf(':')
        if (sepIdx === -1) return
        const position = overId.slice(0, sepIdx) as TreeMovePosition
        const targetId = overId.slice(sepIdx + 1)
        if (sourceId === targetId) return
        onMove(sourceId, targetId, position)
      },
      [onMove]
    )

    const handleDragCancel = React.useCallback(() => setActiveDragId(null), [])

    // Virtualized rendering
    const scrollerRef = React.useRef<HTMLDivElement | null>(null)
    const virtualizer = useVirtualizer({
      count: virtualize ? rows.length : 0,
      getScrollElement: () => scrollerRef.current,
      estimateSize: () => estimatedRowHeight,
      overscan: 8,
      getItemKey: (i) => rows[i]?.node.id ?? i,
    })

    void activeDragId // kept for future drag overlay; suppress unused-var.

    const renderRow = (row: FlatRow, style?: React.CSSProperties) => (
      <TreeRow
        key={row.node.id}
        row={row}
        selectedId={selectedId}
        showLines={showLines}
        draggable={!!onMove}
        onToggle={toggle}
        onSelect={onSelect}
        onRowKeyDown={onRowKeyDown}
        registerRef={registerRef}
        focusedId={focusedId}
        setFocusedId={setFocusedId}
        style={style}
      />
    )

    const treeBody = virtualize ? (
      <div
        ref={scrollerRef}
        data-slot="tree-scroller"
        className="relative h-full max-h-[480px] overflow-auto"
      >
        <div
          style={{ height: virtualizer.getTotalSize(), position: 'relative', width: '100%' }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const row = rows[virtualItem.index]
            if (!row) return null
            return renderRow(row, {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${virtualItem.start}px)`,
              height: virtualItem.size,
            })
          })}
        </div>
      </div>
    ) : (
      <div data-slot="tree-list" className="flex flex-col">
        {rows.map((row) => renderRow(row))}
      </div>
    )

    const content = onMove ? (
      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        {treeBody}
      </DndContext>
    ) : (
      treeBody
    )

    return (
      <div
        ref={ref}
        role="tree"
        data-slot="tree"
        className={cn('w-full text-foreground', className)}
        {...props}
      >
        {content}
      </div>
    )
  }
)
Tree.displayName = 'Tree'
