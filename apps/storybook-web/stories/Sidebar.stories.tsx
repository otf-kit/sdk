import type { Meta, StoryObj } from '@storybook/react'
import { AppSidebar, useSidebar, Shell, BillingStatus, SidebarResizer } from '@otfdashkit/ui'
import { Button } from '@otfdashkit/ui'
import { Home, Settings, Users, BarChart3, FileText, Bell } from 'lucide-react'

const meta = {
  title: 'AppShell/Sidebar',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta

export default meta

export const Default: StoryObj = {
  render: () => (
    <div className="h-screen flex">
      <AppSidebar>
        <AppSidebar.Header>
          <span className="text-sm font-bold text-foreground">Acme Inc</span>
        </AppSidebar.Header>
        <AppSidebar.Nav>
          <AppSidebar.Item icon={<Home />} label="Dashboard" active />
          <AppSidebar.Item icon={<Users />} label="Team" />
          <AppSidebar.Item icon={<BarChart3 />} label="Analytics" />
          <AppSidebar.Item icon={<FileText />} label="Documents" />
          <AppSidebar.Separator label="Settings" />
          <AppSidebar.Item icon={<Settings />} label="Settings" />
          <AppSidebar.Item icon={<Bell />} label="Notifications" badge={<span className="text-xs bg-primary text-primary-foreground rounded-full px-1.5">3</span>} />
        </AppSidebar.Nav>
        <AppSidebar.Footer>
          <BillingStatus plan="Pro" usage="3 of 5 seats" progress={60} onUpgrade={() => {}} />
        </AppSidebar.Footer>
        <SidebarResizer />
      </AppSidebar>
      <main className="flex-1 p-6 text-foreground">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Sidebar with collapse, resize, and billing status.</p>
      </main>
    </div>
  ),
}
