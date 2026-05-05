import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Tabs, TabsList, TabsTrigger, TabsContent,
  Card, CardContent, CardDescription, CardHeader, CardTitle,
  Button,
  Input,
} from '@otfdashkit/ui'

const meta: Meta<typeof Tabs> = {
  title: 'Primitives/Tabs',
  component: Tabs,
  tags: ['autodocs'],
}
export default meta

export const Default: StoryObj = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Make changes to your account here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <label className="text-sm font-medium">Name</label>
              <Input defaultValue="John Doe" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your password here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <label className="text-sm font-medium">Current password</label>
              <Input type="password" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>General app settings.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Save preferences</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
}
