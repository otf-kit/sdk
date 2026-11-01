import React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '../utils/cn'

export type SwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> & {
  /** `sm` (40x24, default) for dense web rows, `md` (51x31) to match the native OtfSwitch default. */
  size?: 'sm' | 'md'
}

const SIZES = {
  sm: {
    root: 'h-6 w-10',
    thumb:
      'data-[state=unchecked]:size-4 data-[state=unchecked]:left-[2.5px] data-[state=checked]:size-5 data-[state=checked]:left-[16.5px] group-active/switch:data-[state=unchecked]:h-5 group-active/switch:data-[state=unchecked]:w-[26px] group-active/switch:data-[state=unchecked]:left-[0.5px] group-active/switch:data-[state=checked]:w-[26px] group-active/switch:data-[state=checked]:left-[10.5px]',
  },
  md: {
    root: 'h-[31px] w-[51px]',
    thumb:
      'data-[state=unchecked]:size-[23px] data-[state=unchecked]:left-[2.5px] data-[state=checked]:size-[27px] data-[state=checked]:left-[20.5px] group-active/switch:data-[state=unchecked]:h-[27px] group-active/switch:data-[state=unchecked]:w-[35px] group-active/switch:data-[state=unchecked]:left-[0.5px] group-active/switch:data-[state=checked]:w-[35px] group-active/switch:data-[state=checked]:left-[12.5px]',
  },
}

/** The OTF toggle on web, same look as the native OtfSwitch: muted ring + small thumb off, accent + full thumb on. */
export const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, SwitchProps>(
  ({ className, size = 'sm', ...props }, ref) => (
    <SwitchPrimitive.Root
      ref={ref}
      data-slot="switch"
      className={cn(
        'group/switch peer relative inline-flex shrink-0 cursor-pointer rounded-full border-[1.5px] transition-colors duration-300',
        SIZES[size].root,
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]',
        'disabled:cursor-not-allowed disabled:opacity-40',
        'data-[state=unchecked]:border-[hsl(var(--muted-foreground))] data-[state=unchecked]:bg-[hsl(var(--muted))]',
        'data-[state=checked]:border-[hsl(var(--primary))] data-[state=checked]:bg-[hsl(var(--primary))]',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'pointer-events-none absolute top-1/2 block -translate-y-1/2 rounded-full bg-white',
          'shadow-[0_3px_8px_rgba(0,0,0,0.15),0_1px_1px_rgba(0,0,0,0.16)]',
          'transition-all duration-[420ms] ease-[cubic-bezier(0.34,1.36,0.64,1)] motion-reduce:transition-none',
          SIZES[size].thumb
        )}
      />
    </SwitchPrimitive.Root>
  )
)
Switch.displayName = SwitchPrimitive.Root.displayName
