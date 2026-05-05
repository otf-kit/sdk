'use client'

import React, { createContext, useCallback, useContext, useMemo } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
  type DraggableAttributes,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import { cn } from '../utils/cn'

// ── Types ────────────────────────────────────────────────────────

export interface SortableItem {
  id: UniqueIdentifier
  [key: string]: unknown
}

export interface SortableListProps<T extends SortableItem> {
  items: T[]
  /** Called with reordered array after a drag ends */
  onReorder: (items: T[]) => void
  /** Render the content of each row */
  renderItem: (item: T, index: number) => React.ReactNode
  /** Render the drag overlay (defaults to same as renderItem) */
  renderOverlay?: (item: T) => React.ReactNode
  /** Show drag handle grip icon (default true) */
  showHandle?: boolean
  className?: string
  itemClassName?: string
}

// ── Internal context ─────────────────────────────────────────────

interface SortableRowContextValue {
  attributes: DraggableAttributes
  listeners: ReturnType<typeof useSortable>['listeners']
  showHandle: boolean
}

const defaultAttributes: DraggableAttributes = {
  role: 'button',
  tabIndex: 0,
  'aria-disabled': false,
  'aria-pressed': undefined,
  'aria-roledescription': 'sortable',
  'aria-describedby': '',
}

const SortableRowCtx = createContext<SortableRowContextValue>({
  attributes: defaultAttributes,
  listeners: undefined,
  showHandle: true,
})

export function useSortableRow() {
  return useContext(SortableRowCtx)
}

// ── SortableRow ──────────────────────────────────────────────────

function SortableRow({
  id,
  children,
  showHandle,
  className,
}: {
  id: UniqueIdentifier
  children: React.ReactNode
  showHandle: boolean
  className?: string
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <SortableRowCtx.Provider value={{ attributes, listeners, showHandle }}>
      <div
        ref={setNodeRef}
        style={style}
        data-slot="sortable-item"
        data-dragging={isDragging || undefined}
        className={cn(
          'flex items-center gap-2 rounded-md',
          'border border-transparent',
          'transition-colors',
          isDragging && 'opacity-50 border-border bg-accent/30',
          className
        )}
      >
        {showHandle && (
          <button
            {...attributes}
            {...listeners}
            aria-label="Drag to reorder"
            tabIndex={0}
            className={cn(
              'flex-shrink-0 cursor-grab active:cursor-grabbing',
              'rounded p-0.5 text-muted-foreground/50',
              'hover:text-muted-foreground hover:bg-accent',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              'transition-colors'
            )}
          >
            <GripVertical className="h-4 w-4" />
          </button>
        )}
        <div className={cn('flex-1 min-w-0', !showHandle && 'cursor-grab active:cursor-grabbing')}>
          {children}
        </div>
      </div>
    </SortableRowCtx.Provider>
  )
}

// ── SortableList ──────────────────────────────────────────────────

/**
 * Drag-to-reorder vertical list powered by @dnd-kit/sortable.
 *
 * @example
 * <SortableList
 *   items={tasks}
 *   onReorder={setTasks}
 *   renderItem={(task) => (
 *     <div className="px-3 py-2 text-sm">{task.title}</div>
 *   )}
 * />
 */
export function SortableList<T extends SortableItem>({
  items,
  onReorder,
  renderItem,
  renderOverlay,
  showHandle = true,
  className,
  itemClassName,
}: SortableListProps<T>) {
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const ids = useMemo(() => items.map((item) => item.id), [items])
  const activeItem = useMemo(
    () => (activeId != null ? items.find((i) => i.id === activeId) ?? null : null),
    [activeId, items]
  )
  const activeIndex = useMemo(
    () => (activeId != null ? items.findIndex((i) => i.id === activeId) : -1),
    [activeId, items]
  )

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id)
  }, [])

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      setActiveId(null)
      if (over && active.id !== over.id) {
        const oldIndex = items.findIndex((i) => i.id === active.id)
        const newIndex = items.findIndex((i) => i.id === over.id)
        onReorder(arrayMove(items, oldIndex, newIndex))
      }
    },
    [items, onReorder]
  )

  const handleDragCancel = useCallback(() => setActiveId(null), [])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <div
          data-slot="sortable-list"
          role="list"
          className={cn('flex flex-col gap-1', className)}
        >
          {items.map((item, index) => (
            <SortableRow
              key={item.id}
              id={item.id}
              showHandle={showHandle}
              className={itemClassName}
            >
              {renderItem(item, index)}
            </SortableRow>
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeItem != null && (
          <div
            className={cn(
              'flex items-center gap-2 rounded-md',
              'border border-border bg-card shadow-lg',
              'opacity-95',
              itemClassName
            )}
          >
            {showHandle && (
              <span className="flex-shrink-0 p-0.5 text-muted-foreground">
                <GripVertical className="h-4 w-4" />
              </span>
            )}
            <div className="flex-1 min-w-0">
              {renderOverlay
                ? renderOverlay(activeItem)
                : renderItem(activeItem, activeIndex)}
            </div>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}
