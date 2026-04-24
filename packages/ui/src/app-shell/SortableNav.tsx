'use client'

import React, { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
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
import { useSidebar, type SidebarItemProps } from './Sidebar'

// ── Types ──────────────────────────────────────────────────────
export interface SortableNavItem extends SidebarItemProps {
  id: string
}

export interface SortableNavProps {
  items: SortableNavItem[]
  onReorder: (items: SortableNavItem[]) => void
  className?: string
}

// ── Sortable item ──────────────────────────────────────────────
function SortableNavItemWrapper({ item }: { item: SortableNavItem }) {
  const { collapsed } = useSidebar()
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const Tag = item.href ? 'a' : 'button'

  return (
    <div
      ref={setNodeRef}
      style={style}
      data-slot="sortable-nav-item"
      data-dragging={isDragging || undefined}
      className={cn(
        'group flex items-center gap-1 rounded-md',
        isDragging && 'opacity-50 z-50',
      )}
    >
      {!collapsed && (
        <span
          {...attributes}
          {...listeners}
          className={cn(
            'flex h-4 w-4 shrink-0 items-center justify-center cursor-grab',
            'opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground',
          )}
          aria-label="Drag to reorder"
        >
          <GripVertical className="h-3 w-3" />
        </span>
      )}
      <Tag
        href={item.href as string}
        onClick={item.onClick}
        title={collapsed ? item.label : undefined}
        data-active={item.active || undefined}
        className={cn(
          'flex items-center gap-2.5 flex-1 rounded-md px-2 py-1.5',
          'text-sm font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          item.active
            ? 'bg-accent text-accent-foreground'
            : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground',
        )}
      >
        {item.icon && <span className="h-4 w-4 shrink-0 [&>svg]:h-4 [&>svg]:w-4">{item.icon}</span>}
        {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
        {!collapsed && item.badge && <span className="shrink-0">{item.badge}</span>}
      </Tag>
    </div>
  )
}

// ── Container ──────────────────────────────────────────────────
export function SortableNav({ items, onReorder, className }: SortableNavProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = items.findIndex((i) => i.id === active.id)
    const newIndex = items.findIndex((i) => i.id === over.id)
    onReorder(arrayMove(items, oldIndex, newIndex))
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        <nav data-slot="sortable-nav" className={cn('space-y-0.5 px-2 py-1', className)}>
          {items.map((item) => (
            <SortableNavItemWrapper key={item.id} item={item} />
          ))}
        </nav>
      </SortableContext>
    </DndContext>
  )
}
