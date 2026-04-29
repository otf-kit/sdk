import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { TrendingUp, Users, ShoppingCart, Settings, Bell } from 'lucide-react'
import {
  SidebarLayoutDashboard, SidebarLayoutMinimal, SidebarLayoutGroups,
  SidebarLayoutUser, SidebarLayoutSearch,
  StackedLayoutTabs, StackedLayoutBranded,
  NotificationSettings, WorkspaceMembers, IntegrationCard,
  FeedbackModal, InviteModal, ManageTagsModal, SelectUsersModal,
  UserMenu, OrgMenu, RolesMenu,
  MetricCard, MetricCardWithIcon, MetricCardWithButton,
  ChatDetail, MessagesCard,
  FileCards, FilesList,
  TaskCard, TaskCardWithLabels, SortableTaskList,
  FloatingActionButton, FloatingThemePicker,
  Switch,
} from '@otf/ui'

const meta: Meta = { title: 'Blocks', tags: ['autodocs'] }
export default meta

export const SidebarDashboard: StoryObj = { name: 'Sidebar / Dashboard', render: () => <SidebarLayoutDashboard /> }
export const SidebarMinimal: StoryObj = { name: 'Sidebar / Minimal', render: () => <SidebarLayoutMinimal /> }
export const SidebarGroups: StoryObj = { name: 'Sidebar / Groups', render: () => <SidebarLayoutGroups /> }
export const SidebarUser: StoryObj = { name: 'Sidebar / User Profile', render: () => <SidebarLayoutUser /> }
export const SidebarSearch: StoryObj = { name: 'Sidebar / Search', render: () => <SidebarLayoutSearch /> }

export const StackedTabs: StoryObj = { name: 'Stacked / Tabs', render: () => <StackedLayoutTabs /> }
export const StackedBranded: StoryObj = { name: 'Stacked / Branded', render: () => <StackedLayoutBranded /> }

export const NotifSettings: StoryObj = {
  name: 'Settings / Notifications',
  render: () => <div className="max-w-lg"><NotificationSettings /></div>,
}
export const MembersSettings: StoryObj = {
  name: 'Settings / Members',
  render: () => <div className="max-w-2xl"><WorkspaceMembers /></div>,
}
export const IntegrationCards: StoryObj = {
  name: 'Settings / Integrations',
  render: () => (
    <div className="max-w-xl space-y-3">
      <IntegrationCard name="Slack" description="Send notifications and updates to your Slack workspace." connected />
      <IntegrationCard name="GitHub" description="Sync your repositories and automate workflows." />
      <IntegrationCard name="Zapier" description="Connect with 5000+ apps using Zapier." />
    </div>
  ),
}

export const FeedbackModalStory: StoryObj = {
  name: 'Modal / Feedback',
  render: () => <div className="max-w-sm border rounded-[var(--radius)] overflow-hidden"><FeedbackModal /></div>,
}
export const InviteModalStory: StoryObj = {
  name: 'Modal / Invite',
  render: () => <div className="max-w-md border rounded-[var(--radius)] overflow-hidden"><InviteModal /></div>,
}
export const ManageTagsStory: StoryObj = {
  name: 'Modal / Manage Tags',
  render: () => <div className="max-w-sm border rounded-[var(--radius)] overflow-hidden"><ManageTagsModal /></div>,
}
export const SelectUsersStory: StoryObj = {
  name: 'Modal / Select Users',
  render: () => <div className="max-w-sm border rounded-[var(--radius)] overflow-hidden"><SelectUsersModal /></div>,
}

export const UserMenuStory: StoryObj = { name: 'Menu / User', render: () => <div className="p-4"><UserMenu /></div> }
export const OrgMenuStory: StoryObj = { name: 'Menu / Organization', render: () => <div className="p-4"><OrgMenu /></div> }
export const RolesMenuStory: StoryObj = { name: 'Menu / Roles', render: () => <div className="p-4"><RolesMenu /></div> }

export const MetricCards: StoryObj = {
  name: 'KPI / Metric Cards',
  render: () => (
    <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,220px),1fr))' }}>
      <MetricCard label="Total Revenue" value="$48,295" change="+12.5%" trend="up" />
      <MetricCard label="Active Users" value="2,847" change="-3.2%" trend="down" />
      <MetricCardWithIcon label="New Orders" value="384" change="+8.1%" trend="up" icon={<ShoppingCart className="h-5 w-5" />} />
      <MetricCardWithIcon label="Team Members" value="28" change="+2" trend="up" icon={<Users className="h-5 w-5" />} iconColor="bg-green-100 text-green-600" />
      <MetricCardWithButton label="MRR Growth" value="$12.4K" change="+18.3%" trend="up" actionLabel="View report" />
    </div>
  ),
}

export const ChatDetailStory: StoryObj = { name: 'Chat / Detail', render: () => <div className="max-w-lg"><ChatDetail /></div> }
export const MessagesCardStory: StoryObj = { name: 'Chat / Messages Card', render: () => <div className="max-w-sm"><MessagesCard /></div> }

export const FileCardsStory: StoryObj = { name: 'Files / Cards', render: () => <div className="max-w-2xl p-4"><FileCards /></div> }
export const FilesListStory: StoryObj = { name: 'Files / List', render: () => <div className="max-w-2xl"><FilesList /></div> }

export const TaskCards: StoryObj = {
  name: 'Tasks / Cards',
  render: () => (
    <div className="grid gap-4 max-w-2xl" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,240px),1fr))' }}>
      <TaskCard title="Redesign onboarding" description="Update the user onboarding flow." priority="High" assigneeInitials="AC" dueDate="Mar 20" />
      <TaskCard title="Fix login bug" description="Users are getting 401 errors on mobile." priority="High" assigneeInitials="BS" dueDate="Mar 18" />
      <TaskCardWithLabels title="Write API docs" description="Document all REST endpoints." priority="Medium" assigneeInitials="JD" dueDate="Mar 25" labels={['Docs', 'Backend']} />
      <TaskCardWithLabels title="Add dark mode" description="Implement system-aware dark mode." priority="Low" assigneeInitials="TR" dueDate="Apr 1" labels={['Frontend', 'Design', 'UI']} />
    </div>
  ),
}
export const TaskListStory: StoryObj = { name: 'Tasks / Sortable List', render: () => <div className="max-w-lg"><SortableTaskList /></div> }

export const FABThemePicker: StoryObj = {
  name: 'FAB / Theme Picker',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="relative w-full h-[400px] bg-background flex items-center justify-center">
      <div className="text-center space-y-1">
        <p className="text-sm font-semibold text-foreground">FloatingThemePicker</p>
        <p className="text-xs text-muted-foreground">Click the palette button — bottom right</p>
      </div>
      <FloatingThemePicker />
    </div>
  ),
}

export const FABGeneric: StoryObj = {
  name: 'FAB / Generic (custom sections)',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="relative w-full h-[400px] bg-background flex items-center justify-center">
      <div className="text-center space-y-1">
        <p className="text-sm font-semibold text-foreground">FloatingActionButton</p>
        <p className="text-xs text-muted-foreground">Generic FAB — any icon, any sections</p>
      </div>
      <FloatingActionButton
        icon={<Settings className="h-[18px] w-[18px]" />}
        label="Open settings"
        title="Quick Settings"
        position="bottom-right"
        sections={[
          {
            label: 'Notifications',
            content: (
              <div className="space-y-2">
                {['Email alerts', 'Push', 'Digest'].map(item => (
                  <div key={item} className="flex items-center justify-between">
                    <span className="text-xs text-foreground">{item}</span>
                    <Switch />
                  </div>
                ))}
              </div>
            ),
          },
        ]}
      />
    </div>
  ),
}
