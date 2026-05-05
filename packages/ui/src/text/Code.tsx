'use client'

import React from 'react'
import { cn } from '../utils/cn'

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  /** Render as a block <pre><code> instead of inline */
  block?: boolean
}

export const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ block, className, children, ...props }, ref) => {
    if (block) {
      return (
        <pre
          data-slot="code-block"
          className={cn(
            'rounded-md border border-border bg-muted/40 px-3 py-2.5 font-mono text-sm text-foreground overflow-x-auto',
            className
          )}
        >
          <code ref={ref as React.Ref<HTMLElement>} {...props}>
            {children}
          </code>
        </pre>
      )
    }
    return (
      <code
        ref={ref as React.Ref<HTMLElement>}
        data-slot="code-inline"
        className={cn(
          'rounded bg-muted/50 px-[0.3em] py-[0.15em] font-mono text-[0.9em] text-foreground',
          className
        )}
        {...props}
      >
        {children}
      </code>
    )
  }
)
Code.displayName = 'Code'
