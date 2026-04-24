import React from 'react'
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '../utils/cn'

export interface KanbanCardDef { id: string; title: string; description?: string; badge?: string }
export interface KanbanColumnDef { id: string; title: string; cards: KanbanCardDef[] }

export function KanbanCard({ card, isDragging }: { card: KanbanCardDef; isDragging?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card.id })
  const style = { transform: CSS.Transform.toString(transform), transition }
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}
      className={cn('rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3 cursor-grab active:cursor-grabbing select-none', isDragging && 'shadow-lg opacity-80')}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-[hsl(var(--foreground))] leading-tight">{card.title}</p>
        {card.badge && (
          <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded-full bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] font-medium">{card.badge}</span>
        )}
      </div>
      {card.description && <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))] line-clamp-2">{card.description}</p>}
    </div>
  )
}

export function KanbanColumn({ column, isOver }: { column: KanbanColumnDef; isOver?: boolean }) {
  return (
    <div className={cn('flex w-64 shrink-0 flex-col gap-2 rounded-md bg-[hsl(var(--muted)/0.4)] p-3 transition-colors', isOver && 'bg-[hsl(var(--muted)/0.7)]')}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">{column.title}</h3>
        <span className="text-xs text-[hsl(var(--muted-foreground))] bg-[hsl(var(--muted))] rounded-full px-2 py-0.5">{column.cards.length}</span>
      </div>
      <SortableContext items={column.cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-2 min-h-[60px]">
          {column.cards.map((card) => <KanbanCard key={card.id} card={card} />)}
        </div>
      </SortableContext>
    </div>
  )
}

interface KanbanProps {
  columns: KanbanColumnDef[]
  onMoveCard?: (cardId: string, fromCol: string, toCol: string) => void
  className?: string
}

export function Kanban({ columns: initialColumns, onMoveCard, className }: KanbanProps) {
  const [cols, setCols] = React.useState<KanbanColumnDef[]>(initialColumns)
  const [activeCard, setActiveCard] = React.useState<KanbanCardDef | null>(null)
  const [overColId, setOverColId] = React.useState<string | null>(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const findColByCard = (cardId: string) => cols.find((c) => c.cards.some((card) => card.id === cardId))

  const onDragStart = ({ active }: DragStartEvent) => {
    const col = findColByCard(active.id as string)
    setActiveCard(col?.cards.find((c) => c.id === active.id) ?? null)
  }

  const onDragOver = ({ over }: DragOverEvent) => {
    if (!over) { setOverColId(null); return }
    const colId = cols.find((c) => c.id === over.id)?.id ?? findColByCard(over.id as string)?.id ?? null
    setOverColId(colId)
  }

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveCard(null); setOverColId(null)
    if (!over || active.id === over.id) return
    const fromCol = findColByCard(active.id as string)
    const toCol = cols.find((c) => c.id === over.id) ?? findColByCard(over.id as string)
    if (!fromCol || !toCol || fromCol.id === toCol.id) return

    const card = fromCol.cards.find((c) => c.id === active.id)!
    setCols((prev) => prev.map((c) => {
      if (c.id === fromCol.id) return { ...c, cards: c.cards.filter((card) => card.id !== active.id) }
      if (c.id === toCol.id) return { ...c, cards: [...c.cards, card] }
      return c
    }))
    onMoveCard?.(active.id as string, fromCol.id, toCol.id)
  }

  return (
    <DndContext sensors={sensors} onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={onDragEnd}>
      <div className={cn('flex gap-4 overflow-x-auto pb-4', className)}>
        {cols.map((col) => <KanbanColumn key={col.id} column={col} isOver={overColId === col.id} />)}
      </div>
      <DragOverlay>
        {activeCard && <KanbanCard card={activeCard} isDragging />}
      </DragOverlay>
    </DndContext>
  )
}
