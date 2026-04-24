import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
  Badge,
  Avatar, AvatarFallback, AvatarImage,
  Separator,
  Progress,
  Button,
} from '@otf/ui'

const meta: Meta = { title: 'Primitives/Display', tags: ['autodocs'] }
export default meta

export const CardStory: StoryObj = {
  name: 'Card',
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">Requires a connected GitHub repository.</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),
}

export const BadgeStory: StoryObj = {
  name: 'Badge',
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Error</Badge>
      <Badge className="bg-green-500 text-white border-transparent">Success</Badge>
    </div>
  ),
}

export const AvatarStory: StoryObj = {
  name: 'Avatar',
  render: () => (
    <div className="flex gap-3 items-center">
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar className="h-14 w-14">
        <AvatarImage src="https://github.com/vercel.png" alt="Vercel" />
        <AvatarFallback>V</AvatarFallback>
      </Avatar>
    </div>
  ),
}

export const SeparatorStory: StoryObj = {
  name: 'Separator',
  render: () => (
    <div className="w-64 space-y-4">
      <div>
        <h4 className="text-sm font-medium">Horizontal</h4>
        <p className="text-xs text-[hsl(var(--muted-foreground))]">Below me is a separator</p>
        <Separator className="my-2" />
        <p className="text-xs text-[hsl(var(--muted-foreground))]">Above me is a separator</p>
      </div>
      <div className="flex items-center h-8 gap-2 text-sm">
        <span>Left</span>
        <Separator orientation="vertical" />
        <span>Center</span>
        <Separator orientation="vertical" />
        <span>Right</span>
      </div>
    </div>
  ),
}

export const ProgressStory: StoryObj = {
  name: 'Progress',
  render: () => (
    <div className="w-64 space-y-4">
      <Progress value={33} />
      <Progress value={66} className="h-3" />
      <Progress value={100} />
      <Progress value={0} />
    </div>
  ),
}
