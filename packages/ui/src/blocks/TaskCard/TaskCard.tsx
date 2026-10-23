import React from 'react'
import { Calendar } from 'lucide-react'
import { cn } from '../../utils/cn'
import { Card, CardContent } from '../../primitives/card'
import { Avatar, AvatarFallback } from '../../primitives/avatar'
import { Badge } from '../../primitives/badge'

const PRIORITY_COLOR: Record<string, string> = {
  High: 'bg-red-500/10 text-red-800 border-red-200 dark:text-red-400 dark:border-red-500/30',
  Medium: 'bg-yellow-500/10 text-yellow-800 border-yellow-200 dark:text-yellow-400 dark:border-yellow-500/30',
  Low: 'bg-green-500/10 text-green-800 border-green-200 dark:text-green-400 dark:border-green-500/30',
}

export interface TaskCardProps {
  title?: string
  description?: string
  assigneeInitials?: string
  dueDate?: string
  priority?: 'High' | 'Medium' | 'Low'
  className?: string
}

export function TaskCard({
  title = 'Redesign onboarding flow',
  description = 'Update the user onboarding experience with the new design language.',
  assigneeInitials = 'AC',
  dueDate = 'Mar 20',
  priority = 'High',
  className,
}: TaskCardProps) {
  return (
    <Card className={cn('cursor-pointer hover:shadow-md transition-shadow', className)}>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold leading-tight">{title}</p>
          <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full border font-medium shrink-0', PRIORITY_COLOR[priority])}>
            {priority}
          </span>
        </div>
        <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <Avatar className="h-6 w-6"><AvatarFallback className="text-[10px]">{assigneeInitials}</AvatarFallback></Avatar>
          <div className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]">
            <Calendar className="h-3 w-3" />{dueDate}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const LABEL_COLORS = ['bg-blue-100 text-blue-700', 'bg-purple-100 text-purple-700', 'bg-green-100 text-green-800']

export interface TaskCardWithLabelsProps extends TaskCardProps {
  labels?: string[]
}

export function TaskCardWithLabels({
  labels = ['Design', 'Frontend'],
  ...props
}: TaskCardWithLabelsProps) {
  return (
    <Card className={cn('cursor-pointer hover:shadow-md transition-shadow', props.className)}>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold leading-tight">{props.title ?? 'Redesign onboarding flow'}</p>
          <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full border font-medium shrink-0', PRIORITY_COLOR[props.priority ?? 'High'])}>
            {props.priority ?? 'High'}
          </span>
        </div>
        <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed line-clamp-2">
          {props.description ?? 'Update the user onboarding experience with the new design language.'}
        </p>
        <div className="flex flex-wrap gap-1">
          {labels.map((l, i) => (
            <span key={l} className={cn('text-[10px] px-1.5 py-0.5 rounded-full font-medium', LABEL_COLORS[i % LABEL_COLORS.length])}>{l}</span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <Avatar className="h-6 w-6"><AvatarFallback className="text-[10px]">{props.assigneeInitials ?? 'AC'}</AvatarFallback></Avatar>
          <div className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]">
            <Calendar className="h-3 w-3" />{props.dueDate ?? 'Mar 20'}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
