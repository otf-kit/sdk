import React, { useState } from 'react'
import { cn } from '../../utils/cn'
import { Button } from '../../primitives/button'
import { Textarea } from '../../primitives/textarea'

const REACTIONS = ['😊', '😐', '😕', '😡', '🤩']

export interface FeedbackModalProps {
  onSubmit?: (data: { reaction: string; text: string }) => void
  className?: string
}

export function FeedbackModal({ onSubmit, className }: FeedbackModalProps) {
  const [reaction, setReaction] = useState('')
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    onSubmit?.({ reaction, text })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className={cn('flex flex-col items-center gap-3 py-8 px-6 text-center', className)}>
        <span className="text-4xl">🎉</span>
        <p className="font-semibold">Thanks for your feedback!</p>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">We'll use it to improve your experience.</p>
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col gap-4 p-6', className)}>
      <div>
        <h2 className="text-base font-semibold">Send Feedback</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-0.5">How are you feeling about the product?</p>
      </div>
      <div className="flex gap-2">
        {REACTIONS.map(r => (
          <button
            key={r}
            onClick={() => setReaction(r)}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-md border text-xl transition-colors',
              reaction === r
                ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)]'
                : 'border-[hsl(var(--border))] hover:bg-[hsl(var(--accent))]'
            )}
          >
            {r}
          </button>
        ))}
      </div>
      <Textarea
        placeholder="Tell us more (optional)..."
        value={text}
        onChange={e => setText(e.target.value)}
        className="resize-none"
        rows={4}
      />
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm">Cancel</Button>
        <Button size="sm" onClick={handleSubmit} disabled={!reaction}>Submit</Button>
      </div>
    </div>
  )
}
