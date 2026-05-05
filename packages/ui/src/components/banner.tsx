import React from 'react'
import { Info, CheckCircle2, AlertTriangle, XCircle, X, ArrowRight } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

// ─── Variant config ──────────────────────────────────────────────────────────

const bannerVariants = cva(
  'relative flex items-start gap-3 rounded-lg border px-4 py-3.5 text-sm transition-all',
  {
    variants: {
      variant: {
        info:    'border-blue-200/80   bg-blue-50/60   dark:border-blue-800/60  dark:bg-blue-950/30',
        success: 'border-green-200/80  bg-green-50/60  dark:border-green-800/60 dark:bg-green-950/30',
        warning: 'border-yellow-200/80 bg-yellow-50/60 dark:border-yellow-800/60 dark:bg-yellow-950/30',
        error:   'border-red-200/80    bg-red-50/60    dark:border-red-800/60   dark:bg-red-950/30',
        neutral: 'border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.5)]',
      },
    },
    defaultVariants: { variant: 'info' },
  }
)

const accentVariants = cva('absolute left-0 top-[12%] bottom-[12%] w-[3px] rounded-full', {
  variants: {
    variant: {
      info:    'bg-blue-500',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      error:   'bg-red-500',
      neutral: 'bg-[hsl(var(--foreground)/0.3)]',
    },
  },
  defaultVariants: { variant: 'info' },
})

const iconVariants = cva('mt-0.5 h-4 w-4 shrink-0', {
  variants: {
    variant: {
      info:    'text-blue-500   dark:text-blue-400',
      success: 'text-green-500  dark:text-green-400',
      warning: 'text-yellow-500 dark:text-yellow-400',
      error:   'text-red-500    dark:text-red-400',
      neutral: 'text-[hsl(var(--muted-foreground))]',
    },
  },
  defaultVariants: { variant: 'info' },
})

const titleVariants = cva('font-semibold leading-snug', {
  variants: {
    variant: {
      info:    'text-blue-900   dark:text-blue-100',
      success: 'text-green-900  dark:text-green-100',
      warning: 'text-yellow-900 dark:text-yellow-100',
      error:   'text-red-900    dark:text-red-100',
      neutral: 'text-[hsl(var(--foreground))]',
    },
  },
  defaultVariants: { variant: 'info' },
})

const descriptionVariants = cva('mt-0.5 leading-snug opacity-80', {
  variants: {
    variant: {
      info:    'text-blue-800   dark:text-blue-200',
      success: 'text-green-800  dark:text-green-200',
      warning: 'text-yellow-800 dark:text-yellow-200',
      error:   'text-red-800    dark:text-red-200',
      neutral: 'text-[hsl(var(--muted-foreground))]',
    },
  },
  defaultVariants: { variant: 'info' },
})

const actionVariants = cva(
  'inline-flex items-center gap-1 text-xs font-medium underline-offset-2 hover:underline transition-opacity hover:opacity-80',
  {
    variants: {
      variant: {
        info:    'text-blue-700   dark:text-blue-300',
        success: 'text-green-700  dark:text-green-300',
        warning: 'text-yellow-700 dark:text-yellow-300',
        error:   'text-red-700    dark:text-red-300',
        neutral: 'text-[hsl(var(--foreground))]',
      },
    },
    defaultVariants: { variant: 'info' },
  }
)

// ─── Icons ───────────────────────────────────────────────────────────────────

const ICONS: Record<NonNullable<BannerVariant>, React.ReactNode> = {
  info:    <Info className="h-4 w-4" />,
  success: <CheckCircle2 className="h-4 w-4" />,
  warning: <AlertTriangle className="h-4 w-4" />,
  error:   <XCircle className="h-4 w-4" />,
  neutral: <Info className="h-4 w-4" />,
}

// ─── Types ───────────────────────────────────────────────────────────────────

type BannerVariant = VariantProps<typeof bannerVariants>['variant']

export interface BannerAction {
  label: string
  onClick: () => void
  icon?: boolean
}

export interface BannerProps extends VariantProps<typeof bannerVariants> {
  title?: string
  description?: string
  dismissible?: boolean
  onDismiss?: () => void
  action?: BannerAction
  icon?: boolean
  className?: string
  children?: React.ReactNode
}

// ─── Component ───────────────────────────────────────────────────────────────

export function Banner({
  variant = 'info',
  title,
  description,
  dismissible,
  onDismiss,
  action,
  icon = true,
  className,
  children,
}: BannerProps) {
  const [dismissed, setDismissed] = React.useState(false)
  const [exiting, setExiting] = React.useState(false)

  const handleDismiss = () => {
    setExiting(true)
    setTimeout(() => {
      setDismissed(true)
      onDismiss?.()
    }, 200)
  }

  if (dismissed) return null

  return (
    <div
      className={cn(
        bannerVariants({ variant }),
        'pl-[18px]',
        exiting && 'opacity-0 translate-x-1 scale-[0.98]',
        'transition-all duration-200',
        className
      )}
    >
      {/* left accent bar */}
      <span className={accentVariants({ variant })} aria-hidden />

      {/* icon */}
      {icon && (
        <span className={iconVariants({ variant })}>
          {ICONS[variant as NonNullable<BannerVariant>]}
        </span>
      )}

      {/* body */}
      <div className="min-w-0 flex-1 space-y-1">
        {title && (
          <p className={cn(titleVariants({ variant }), 'text-sm')}>{title}</p>
        )}
        {description && (
          <p className={cn(descriptionVariants({ variant }), 'text-sm')}>{description}</p>
        )}
        {children && (
          <div className={cn(descriptionVariants({ variant }), 'text-sm')}>{children}</div>
        )}
        {action && (
          <button
            onClick={action.onClick}
            className={cn(actionVariants({ variant }), 'mt-1.5')}
          >
            {action.label}
            {action.icon !== false && <ArrowRight className="h-3 w-3" />}
          </button>
        )}
      </div>

      {/* dismiss */}
      {dismissible && (
        <button
          onClick={handleDismiss}
          aria-label="Dismiss"
          className="shrink-0 rounded-md p-0.5 text-[hsl(var(--muted-foreground))] opacity-60 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
