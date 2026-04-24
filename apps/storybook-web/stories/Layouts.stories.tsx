import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Home, Settings, Users, FileText, BarChart3, Bell, Search, Plus, LogOut } from 'lucide-react'
import { AppShell, AppShellSidebar, AppShellMain } from '@otf/ui/layouts-app-shell'
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarItem, SidebarSeparator } from '@otf/ui/layouts-sidebar'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@otf/ui/layouts-navbar'
import { Page, PageHeader, PageTitle, PageDescription, PageActions, PageBody } from '@otf/ui/layouts-page'
import { SplitPage, SplitPageList, SplitPageDetail } from '@otf/ui/layouts-split-page'
import { Stack, HStack, VStack } from '@otf/ui/layouts-stack'
import { Container } from '@otf/ui/layouts-container'
import { ResizeBox, ResizeHandle } from '@otf/ui/layouts-resize-box'

const meta: Meta = { title: 'Layouts', tags: ['autodocs'] }
export default meta
type Story = StoryObj

const SidebarDemo = ({ collapsed, onCollapse }: { collapsed: boolean; onCollapse: () => void }) => (
  <Sidebar collapsed={collapsed} onCollapse={onCollapse} width="220px">
    <SidebarHeader>
      {!collapsed && <span className="font-semibold text-sm text-[hsl(var(--foreground))]">MyApp</span>}
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Main</SidebarGroupLabel>
        <SidebarItem icon={<Home size={16} />} label="Dashboard" active />
        <SidebarItem icon={<BarChart3 size={16} />} label="Analytics" badge={3} />
        <SidebarItem icon={<Users size={16} />} label="Team" />
        <SidebarItem icon={<FileText size={16} />} label="Documents" />
      </SidebarGroup>
      <SidebarSeparator />
      <SidebarGroup>
        <SidebarGroupLabel>Account</SidebarGroupLabel>
        <SidebarItem icon={<Bell size={16} />} label="Notifications" badge="9+" />
        <SidebarItem icon={<Settings size={16} />} label="Settings" />
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarItem icon={<LogOut size={16} />} label="Sign out" />
    </SidebarFooter>
  </Sidebar>
)

export const AppShellLayout: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false)
    return (
      <div className="min-h-[500px] border border-[hsl(var(--border))] rounded-lg overflow-hidden">
        <AppShell style={{ height: 500 }}>
          <AppShellSidebar>
            <SidebarDemo collapsed={collapsed} onCollapse={() => setCollapsed(v => !v)} />
          </AppShellSidebar>
          <AppShellMain>
            <Navbar border sticky={false}>
              <NavbarBrand><span className="font-semibold text-sm">Dashboard</span></NavbarBrand>
              <NavbarContent align="end">
                <NavbarItem><Search size={16} className="text-[hsl(var(--muted-foreground))]" /></NavbarItem>
                <NavbarItem><Bell size={16} className="text-[hsl(var(--muted-foreground))]" /></NavbarItem>
              </NavbarContent>
            </Navbar>
            <Page>
              <PageHeader>
                <div><PageTitle>Dashboard</PageTitle><PageDescription>Welcome back! Here's what's happening.</PageDescription></div>
                <PageActions>
                  <button className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
                    <Plus size={14} /> New Project
                  </button>
                </PageActions>
              </PageHeader>
              <PageBody>
                <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))' }}>
                  {['Projects', 'Team Members', 'Open Issues', 'Deployments'].map((label, i) => (
                    <div key={label} className="p-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
                      <div className="text-2xl font-bold text-[hsl(var(--foreground))]">{(i + 1) * 12}</div>
                      <div className="text-sm text-[hsl(var(--muted-foreground))]">{label}</div>
                    </div>
                  ))}
                </div>
              </PageBody>
            </Page>
          </AppShellMain>
        </AppShell>
      </div>
    )
  },
}

export const PageLayout: Story = {
  render: () => (
    <div className="border border-[hsl(var(--border))] rounded-lg overflow-hidden min-h-[400px]">
      <Page>
        <PageHeader>
          <div>
            <PageTitle>Settings</PageTitle>
            <PageDescription>Manage your account and preferences.</PageDescription>
          </div>
          <PageActions>
            <button className="text-sm px-3 py-1.5 rounded-md border border-[hsl(var(--border))] text-[hsl(var(--foreground))]">Cancel</button>
            <button className="text-sm px-3 py-1.5 rounded-md bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">Save changes</button>
          </PageActions>
        </PageHeader>
        <PageBody>
          <div className="max-w-lg space-y-4">
            {['Display Name', 'Email Address', 'Username'].map(field => (
              <div key={field}>
                <label className="text-sm font-medium text-[hsl(var(--foreground))]">{field}</label>
                <input className="mt-1 w-full px-3 py-2 text-sm rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]" placeholder={`Enter ${field.toLowerCase()}`} />
              </div>
            ))}
          </div>
        </PageBody>
      </Page>
    </div>
  ),
}

const emails = ['Team meeting notes', 'Q4 report draft', 'Design review feedback', 'Onboarding docs', 'Release changelog']

export const SplitPageLayout: Story = {
  render: () => {
    const [active, setActive] = useState(0)
    return (
      <div className="border border-[hsl(var(--border))] rounded-lg overflow-hidden" style={{ height: 400 }}>
        <SplitPage>
          <SplitPageList width="260px">
            {emails.map((title, i) => (
              <div
                key={i}
                onClick={() => setActive(i)}
                className={`px-4 py-3 cursor-pointer border-b border-[hsl(var(--border))] ${i === active ? 'bg-[hsl(var(--accent))]' : 'hover:bg-[hsl(var(--accent))]'}`}
              >
                <div className="text-sm font-medium text-[hsl(var(--foreground))] truncate">{title}</div>
                <div className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">2 hours ago</div>
              </div>
            ))}
          </SplitPageList>
          <SplitPageDetail>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">{emails[active]}</h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mt-2">This is the detail view for "{emails[active]}". Select an item from the list to view its contents here.</p>
            </div>
          </SplitPageDetail>
        </SplitPage>
      </div>
    )
  },
}

const Box = ({ label }: { label: string }) => (
  <div className="px-3 py-2 rounded-md bg-[hsl(var(--accent))] text-[hsl(var(--foreground))] text-sm font-medium whitespace-nowrap">
    {label}
  </div>
)

export const StackLayouts: Story = {
  render: () => (
    <VStack gap={6} className="p-4">
      <div>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2 font-medium uppercase tracking-wider">HStack (row, gap=4)</p>
        <HStack gap={4} align="center" wrap>
          {['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'].map(l => <Box key={l} label={l} />)}
        </HStack>
      </div>
      <div>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2 font-medium uppercase tracking-wider">VStack (col, gap=2)</p>
        <VStack gap={2} className="max-w-xs">
          {['First', 'Second', 'Third'].map(l => <Box key={l} label={l} />)}
        </VStack>
      </div>
      <div>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2 font-medium uppercase tracking-wider">Stack justify=between</p>
        <HStack gap={2} justify="between" className="border border-[hsl(var(--border))] rounded-md p-3">
          <Box label="Left" />
          <Box label="Center" />
          <Box label="Right" />
        </HStack>
      </div>
    </VStack>
  ),
}

export const ContainerSizes: Story = {
  render: () => (
    <VStack gap={4} className="p-4">
      {(['sm', 'md', 'lg', 'xl', 'full'] as const).map(size => (
        <Container key={size} size={size} className="border border-[hsl(var(--border))] rounded-md py-3 bg-[hsl(var(--accent))]">
          <span className="text-sm text-[hsl(var(--foreground))] font-medium">size="{size}"</span>
          <span className="text-xs text-[hsl(var(--muted-foreground))] ml-2">max-w-screen-{size !== 'full' ? size : 'none'}</span>
        </Container>
      ))}
    </VStack>
  ),
}

export const ResizeBoxDemo: Story = {
  render: () => (
    <div className="p-4">
      <p className="text-xs text-[hsl(var(--muted-foreground))] mb-3 font-medium uppercase tracking-wider">Drag the handle to resize</p>
      <ResizeBox
        resize="both"
        minWidth={200}
        minHeight={120}
        className="border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] p-4"
        style={{ width: 320, height: 180 }}
      >
        <p className="text-sm text-[hsl(var(--muted-foreground))]">This box is resizable. Drag the bottom-right corner to resize it.</p>
        <ResizeHandle />
      </ResizeBox>
    </div>
  ),
}
