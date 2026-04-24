import type { Meta, StoryObj } from '@storybook/react'
import {
  Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription,
  Popover, PopoverTrigger, PopoverContent,
  Tooltip, TooltipProvider, TooltipTrigger, TooltipContent,
} from '@otf/ui'
import { Button } from '@otf/ui'

const meta = {
  title: 'Overlays/All',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta

export default meta

export const SheetDemo: StoryObj = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>This is a sheet panel sliding from the right.</SheetDescription>
        </SheetHeader>
        <div className="py-4 text-foreground">Sheet body content goes here.</div>
      </SheetContent>
    </Sheet>
  ),
}

export const PopoverDemo: StoryObj = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-foreground">Popover Title</h4>
          <p className="text-sm text-muted-foreground">This popover has enter/exit animations.</p>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

export const TooltipDemo: StoryObj = {
  render: () => (
    <TooltipProvider>
      <div className="flex gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>This is a tooltip</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
}
