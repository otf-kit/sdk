import React, { useState } from 'react'
import { cn } from '../../utils/cn'
import { Checkbox } from '../../primitives/checkbox'
import { Avatar, AvatarFallback } from '../../primitives/avatar'

type Priority = 'High' | 'Medium' | 'Low'
type Status = 'In Progress' | 'Todo' | 'Done'

interface Task {
  id: string
  title: string
  assignee: string
  priority: Priority
  status: Status
  done: boolean
}

const TASKS: Task[] = [
  { id: '1', title: 'Redesign onboarding flow', assignee: 'AC', priority: 'High', status: 'In Progress', done: false },
  { id: '2', title: 'Fix authentication bug', assignee: 'BS', priority: 'High', status: 'In Progress', done: false },
  { id: '3', title: 'Write API documentation', assignee: 'JD', priority: 'Medium', status: 'Todo', done: false },
  { id: '4', title: 'Add dark mode support', assignee: 'TR', priority: 'Low', status: 'Todo', done: false },
  { id: '5', title: 'Setup CI/CD pipeline', assignee: 'SK', priority: 'Medium', status: 'Done', done: true },
  { id: '6', title: 'Deploy to staging', assignee: 'ML', priority: 'Low', status: 'Done', done: true },
]

const PRIORITY_DOT: Record<Priority, string> = {
  High: 'bg-red-500',
  Medium: 'bg-yellow-500',
  Low: 'bg-green-500',
}

const SECTIONS: Status[] = ['In Progress', 'Todo', 'Done']

function TaskRow({ task, onToggle }: { task: Task; onToggle: () => void }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5 hover:bg-[hsl(var(--accent)/0.5)] rounded-md transition-colors">
      <Checkbox checked={task.done} onCheckedChange={onToggle} />
      <span className={cn('flex-1 text-sm', task.done && 'line-through text-[hsl(var(--muted-foreground))]')}>{task.title}</span>
      <span className={cn('h-2 w-2 rounded-full shrink-0', PRIORITY_DOT[task.priority])} title={task.priority} />
      <Avatar className="h-6 w-6 shrink-0"><AvatarFallback className="text-[10px]">{task.assignee}</AvatarFallback></Avatar>
    </div>
  )
}

export interface SortableTaskListProps { className?: string }

export function SortableTaskList({ className }: SortableTaskListProps) {
  const [tasks, setTasks] = useState(TASKS)
  const toggle = (id: string) => setTasks(ts => ts.map(t => t.id === id ? { ...t, done: !t.done } : t))

  return (
    <div className={cn('rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 space-y-4', className)}>
      {SECTIONS.map(section => {
        const items = tasks.filter(t => t.status === section)
        return (
          <div key={section}>
            <div className="flex items-center gap-2 mb-1.5">
              <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide">{section}</p>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">({items.length})</span>
            </div>
            <div className="space-y-0.5">
              {items.map(task => <TaskRow key={task.id} task={task} onToggle={() => toggle(task.id)} />)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
