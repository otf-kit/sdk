import React, { useState } from 'react'
import { X, Pencil } from 'lucide-react'
import { cn } from '../utils/cn'
import { Input } from '../primitives/input'
import { Button } from '../primitives/button'

const COLORS = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-red-500', 'bg-pink-500']

interface Tag { id: string; name: string; color: string }

const INITIAL_TAGS: Tag[] = [
  { id: '1', name: 'Design', color: 'bg-blue-500' },
  { id: '2', name: 'Engineering', color: 'bg-green-500' },
  { id: '3', name: 'Marketing', color: 'bg-yellow-500' },
  { id: '4', name: 'Research', color: 'bg-purple-500' },
]

export interface ManageTagsModalProps { className?: string }

export function ManageTagsModal({ className }: ManageTagsModalProps) {
  const [tags, setTags] = useState<Tag[]>(INITIAL_TAGS)
  const [newTag, setNewTag] = useState('')
  const [colorIdx, setColorIdx] = useState(0)

  const addTag = () => {
    if (!newTag.trim()) return
    const id = `tag-${Date.now()}`
    setTags(t => [...t, { id, name: newTag.trim(), color: COLORS[colorIdx % COLORS.length]! }])
    setNewTag('')
    setColorIdx(i => i + 1)
  }

  return (
    <div className={cn('flex flex-col gap-4 p-6', className)}>
      <div>
        <h2 className="text-base font-semibold">Manage Tags</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-0.5">Create and organize your tags.</p>
      </div>
      <div className="flex gap-2">
        <div className={cn('h-9 w-9 shrink-0 rounded-md cursor-pointer transition-opacity', COLORS[colorIdx % COLORS.length])}
          onClick={() => setColorIdx(i => i + 1)} title="Click to change color" />
        <Input className="flex-1 h-9 text-sm" placeholder="New tag name..." value={newTag}
          onChange={e => setNewTag(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTag()} />
        <Button size="sm" className="h-9" onClick={addTag}>Add</Button>
      </div>
      <div className="space-y-1.5">
        {tags.map(tag => (
          <div key={tag.id} className="flex items-center gap-2 rounded-md border border-[hsl(var(--border))] px-3 py-2">
            <span className={cn('h-3 w-3 rounded-full shrink-0', tag.color)} />
            <span className="flex-1 text-sm">{tag.name}</span>
            <button className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button onClick={() => setTags(ts => ts.filter(t => t.id !== tag.id))}
              className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
