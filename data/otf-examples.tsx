// @ts-nocheck — @otf/ui forwardRef types don't resolve from JS bundle without .d.ts; safe at runtime
'use client'

import { useState, type CSSProperties } from 'react'
import {
  Button,
  Avatar, AvatarImage, AvatarFallback,
  Badge,
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Input,
  Tabs, TabsList, TabsTrigger, TabsContent,
  Skeleton,
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger,
  Banner,
  Stat, StatGroup,
  Kanban,
  ChatDetail,
  SidebarLayoutDashboard,
  AreaChart,
} from '@otf/ui'
import { BarChart3, User, Star, Mail, Lock, ArrowRight, Check } from 'lucide-react'

// HSL token set that @otf/ui components expect (hsl(var(--X)) inline styles)
const OTF_DARK_THEME: CSSProperties = {
  '--background':            '25 12% 8%',
  '--foreground':            '35 15% 90%',
  '--card':                  '25 12% 10%',
  '--card-foreground':       '35 15% 90%',
  '--popover':               '25 12% 11%',
  '--popover-foreground':    '35 15% 90%',
  '--primary':               '25 95% 58%',
  '--primary-foreground':    '0 0% 100%',
  '--secondary':             '25 12% 15%',
  '--secondary-foreground':  '35 15% 80%',
  '--muted':                 '25 12% 14%',
  '--muted-foreground':      '25 10% 55%',
  '--accent':                '25 12% 15%',
  '--accent-foreground':     '25 95% 58%',
  '--destructive':           '0 84% 60%',
  '--destructive-foreground':'0 0% 100%',
  '--border':                '25 12% 18%',
  '--input':                 '25 12% 18%',
  '--ring':                  '25 95% 58%',
  '--radius':                '0.5rem',
  '--radius-sm':             '0.375rem',
  '--radius-md':             '0.625rem',
  '--radius-lg':             '1rem',
  '--radius-xl':             '1.5rem',
} as CSSProperties

// ── Scaled block wrapper for large layout demos ───────────────────────────────
function ScaledBlock({ children, naturalHeight, previewHeight = 400 }: { children: React.ReactNode; naturalHeight: number; previewHeight?: number }) {
  const scale = previewHeight / naturalHeight
  return (
    <div className="w-full overflow-hidden rounded-lg border border-[hsl(25_12%_18%)] bg-[hsl(25_12%_8%)]"
      style={{ height: `${previewHeight}px`, ...OTF_DARK_THEME }}>
      <div style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${(100 / scale).toFixed(2)}%`,
        height: `${naturalHeight}px`,
        pointerEvents: 'none',
      }}>
        {children}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Button
// ═══════════════════════════════════════════════════════════════════════════════
export function ButtonDemo() {
  const [loading, setLoading] = useState(false)
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg">
      <div className="flex flex-wrap justify-center gap-3">
        <Button className="">Default</Button>
        <Button className="" variant="secondary">Secondary</Button>
        <Button className="" variant="outline">Outline</Button>
        <Button className="" variant="ghost">Ghost</Button>
        <Button className="" variant="destructive">Destructive</Button>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button className="" size="sm">Small</Button>
        <Button className="" size="default">Default</Button>
        <Button className="" size="lg">Large</Button>
        <Button className="" size="icon" variant="outline"><ArrowRight className="h-4 w-4" /></Button>
      </div>
      <Button
        className="min-w-[160px]"
        onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000) }}
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Loading…
          </span>
        ) : (
          <span className="flex items-center gap-2"><Check className="h-4 w-4" />Click to load</span>
        )}
      </Button>
    </div>
  )
}
export const buttonCode = `import { Button } from '@otf/ui'

export function Example() {
  return (
    <div className="flex gap-3">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  )
}`

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Avatar
// ═══════════════════════════════════════════════════════════════════════════════
const avatarUsers = [
  { name: 'Alice Johnson', color: 'from-orange-400 to-rose-500' },
  { name: 'Bob Smith',     color: 'from-blue-400 to-cyan-500' },
  { name: 'Carol White',   color: 'from-emerald-400 to-teal-500' },
  { name: 'Dan Lee',       color: 'from-violet-400 to-purple-500' },
]
export function AvatarDemo() {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex -space-x-3">
        {avatarUsers.map((u) => (
          <Avatar key={u.name} className="h-10 w-10 border-2 border-background">
            <AvatarImage className="" src="" alt={u.name} />
            <AvatarFallback className={`bg-gradient-to-br text-white text-xs font-semibold ${u.color}`}>
              {u.name.split(' ').map((n) => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        ))}
        <Avatar className="h-10 w-10 border-2 border-background">
          <AvatarFallback className="bg-secondary text-muted-foreground text-xs font-medium">+8</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-end gap-4">
        {(['h-8 w-8', 'h-10 w-10', 'h-12 w-12', 'h-16 w-16'] as const).map((size, i) => (
          <Avatar key={i} className={`${size} border border-border`}>
            <AvatarImage className="" src="" alt="User" />
            <AvatarFallback className="bg-gradient-to-br from-orange-400 to-rose-500 text-white font-semibold" style={{ fontSize: `${(i + 1) * 3 + 8}px` }}>
              AJ
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
    </div>
  )
}
export const avatarCode = `import { Avatar, AvatarImage, AvatarFallback } from '@otf/ui'

export function UserAvatar({ user }: { user: { name: string; image?: string } }) {
  const initials = user.name.split(' ').map((n) => n[0]).join('')
  return (
    <Avatar>
      <AvatarImage src={user.image} alt={user.name} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  )
}`

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Badge
// ═══════════════════════════════════════════════════════════════════════════════
export function BadgeDemo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap justify-center gap-3">
        <Badge className="" variant="default">Default</Badge>
        <Badge className="" variant="secondary">Secondary</Badge>
        <Badge className="" variant="outline">Outline</Badge>
        <Badge className="" variant="destructive">Destructive</Badge>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {[
          { label: 'Active',    bg: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20', dot: 'bg-emerald-500' },
          { label: 'Pending',   bg: 'bg-amber-500/10 text-amber-500 border-amber-500/20',       dot: 'bg-amber-500' },
          { label: 'Failed',    bg: 'bg-red-500/10 text-red-500 border-red-500/20',             dot: 'bg-red-500' },
          { label: 'Reviewing', bg: 'bg-blue-500/10 text-blue-500 border-blue-500/20',          dot: 'bg-blue-500' },
          { label: 'Draft',     bg: 'bg-secondary text-muted-foreground border-border',         dot: 'bg-muted-foreground/50' },
        ].map(({ label, bg, dot }) => (
          <span key={label} className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${bg}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}
export const badgeCode = `import { Badge } from '@otf/ui'

export function Example() {
  return (
    <div className="flex gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  )
}`

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Card
// ═══════════════════════════════════════════════════════════════════════════════
export function CardDemo() {
  return (
    <div className="w-full max-w-sm">
      <Card className="">
        <CardHeader className="">
          <div className="flex items-center gap-3 mb-1">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gradient-to-br from-orange-400 to-rose-500 text-white text-sm font-semibold">AJ</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">Alice Johnson</CardTitle>
              <CardDescription className="">Senior Frontend Engineer</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Building delightful UIs at scale. Passionate about design systems, accessibility, and developer experience.
          </p>
          <div className="mt-4 flex gap-2">
            <Badge className="" variant="secondary">React</Badge>
            <Badge className="" variant="secondary">TypeScript</Badge>
            <Badge className="" variant="secondary">Design</Badge>
          </div>
        </CardContent>
        <CardFooter className="gap-2">
          <Button className="flex-1" variant="outline" size="sm">Message</Button>
          <Button className="flex-1" size="sm">Follow</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
export const cardCode = `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@otf/ui'

export function ProfileCard({ user }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
        <CardDescription>{user.role}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{user.bio}</p>
      </CardContent>
      <CardFooter>
        <Button>Follow</Button>
      </CardFooter>
    </Card>
  )
}`

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Input
// ═══════════════════════════════════════════════════════════════════════════════
export function InputDemo() {
  const [pw, setPw] = useState('')
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" type="email" placeholder="you@example.com" />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" type="password" placeholder="••••••••" value={pw} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPw(e.target.value)} />
        </div>
        {pw.length > 0 && pw.length < 8 && <p className="text-xs text-destructive">Must be at least 8 characters</p>}
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Disabled</label>
        <Input className="" disabled placeholder="Not editable" />
      </div>
    </div>
  )
}
export const inputCode = `import { Input } from '@otf/ui'

export function LoginForm() {
  return (
    <form className="space-y-4">
      <Input type="email" placeholder="you@example.com" />
      <Input type="password" placeholder="••••••••" />
      <Button type="submit">Sign in</Button>
    </form>
  )
}`

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Tabs
// ═══════════════════════════════════════════════════════════════════════════════
export function TabsDemo() {
  return (
    <div className="w-full max-w-lg">
      <Tabs className="" defaultValue="overview">
        <TabsList className="w-full">
          <TabsTrigger className="flex-1" value="overview">Overview</TabsTrigger>
          <TabsTrigger className="flex-1" value="analytics">Analytics</TabsTrigger>
          <TabsTrigger className="flex-1" value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent className="mt-4 space-y-3" value="overview">
          <Card className="">
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground">3 active sprints, 12 open issues, 89% velocity this quarter.</p>
              <div className="mt-3 flex gap-2">
                <Badge className="" variant="secondary">In Progress: 8</Badge>
                <Badge className="" variant="outline">Done: 42</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent className="mt-4" value="analytics">
          <Card className="">
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground">Page views up 24% this week. Avg session 4m 32s. Bounce rate 22%.</p>
              <div className="mt-3 h-2 rounded-full bg-secondary overflow-hidden">
                <div className="h-full w-[76%] rounded-full bg-primary" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent className="mt-4" value="settings">
          <Card className="">
            <CardContent className="pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Email notifications</span>
                <Badge className="" variant="secondary">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Two-factor auth</span>
                <Badge className="" variant="default">Active</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
export const tabsCode = `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@otf/ui'

export function Example() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview content</TabsContent>
      <TabsContent value="analytics">Analytics content</TabsContent>
    </Tabs>
  )
}`

// ═══════════════════════════════════════════════════════════════════════════════
// 7. Skeleton
// ═══════════════════════════════════════════════════════════════════════════════
export function SkeletonDemo() {
  return (
    <div className="w-full max-w-sm space-y-6">
      <Card className="">
        <CardContent className="pt-4 space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="h-3.5 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
          <Skeleton className="h-3 w-3/5" />
          <div className="flex gap-2 pt-1">
            <Skeleton className="h-7 w-20 rounded-full" />
            <Skeleton className="h-7 w-20 rounded-full" />
          </div>
        </CardContent>
      </Card>
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg border border-border p-3">
            <Skeleton className="h-8 w-8 rounded-md" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-2.5 w-20" />
            </div>
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
export const skeletonCode = `import { Skeleton } from '@otf/ui'

// Always mirror real layout — never plain spinners
export function UserCardSkeleton() {
  return (
    <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  )
}`

// ═══════════════════════════════════════════════════════════════════════════════
// 8. Dialog
// ═══════════════════════════════════════════════════════════════════════════════
export function DialogDemo() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); setDone(true); setTimeout(() => { setDone(false); setOpen(false) }, 1200) }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader className="">
          <DialogTitle className="">Create new project</DialogTitle>
          <DialogDescription className="">Configure your project settings below. You can change these later.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Project name</label>
            <Input className="" placeholder="My awesome project" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Description</label>
            <Input className="" placeholder="What's this project about?" />
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <Button className="flex-1" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button className="flex-1" onClick={handleSubmit} disabled={loading}>
            {done ? <><Check className="h-4 w-4 mr-1.5" />Created!</> : loading ? 'Creating…' : 'Create project'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export const dialogCode = `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@otf/ui'

export function CreateProjectDialog() {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New Project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new project</DialogTitle>
          <DialogDescription>Configure your project settings.</DialogDescription>
        </DialogHeader>
        {/* form content */}
      </DialogContent>
    </Dialog>
  )
}`

// ═══════════════════════════════════════════════════════════════════════════════
// 9. Banner
// ═══════════════════════════════════════════════════════════════════════════════
export function BannerDemo() {
  return (
    <div className="w-full max-w-lg space-y-3">
      <Banner className="" variant="info"    title="Update available" description="Version 3.2.0 includes performance improvements." dismissible onDismiss={() => {}} action={undefined}>{undefined}</Banner>
      <Banner className="" variant="success" title="Payment received"  description="$149 charged. Your kit is ready to download."       dismissible onDismiss={() => {}} action={undefined}>{undefined}</Banner>
      <Banner className="" variant="warning" title="Trial ending soon" description="Your trial expires in 3 days. Upgrade to keep access." dismissible onDismiss={() => {}} action={{ label: 'Upgrade', onClick: () => {} }}>{undefined}</Banner>
      <Banner className="" variant="error"   title="Build failed"      description="Pipeline #42 failed on step 'test'. Check logs."     dismissible onDismiss={() => {}} action={undefined}>{undefined}</Banner>
    </div>
  )
}
export const bannerCode = `import { Banner } from '@otf/ui'

export function Example() {
  return (
    <Banner
      variant="warning"
      title="Trial ending soon"
      description="Your trial expires in 3 days."
      dismissible
      action={{ label: 'Upgrade now', onClick: () => router.push('/pricing') }}
    />
  )
}`

// ═══════════════════════════════════════════════════════════════════════════════
// 10. Stat
// ═══════════════════════════════════════════════════════════════════════════════
export function StatDemo() {
  return (
    <div className="w-full max-w-2xl">
      <StatGroup className="">
        <Stat className="" label="Total Revenue"  value="$48,295" trend={12.5}  trendLabel="vs last month"  icon={<BarChart3 className="h-4 w-4" />} description="" />
        <Stat className="" label="Active Users"   value="2,340"   trend={-3.2}  trendLabel="vs last week"   icon={<User className="h-4 w-4" />}     description="" />
        <Stat className="" label="Avg Rating"     value="4.8 / 5" trend={0.3}   trendLabel="this quarter"   icon={<Star className="h-4 w-4" />}     description="" />
      </StatGroup>
    </div>
  )
}
export const statCode = `import { Stat, StatGroup } from '@otf/ui'
import { BarChart3, User, Star } from 'lucide-react'

export function DashboardMetrics() {
  return (
    <StatGroup>
      <Stat label="Total Revenue" value="$48,295" trend={12.5} trendLabel="vs last month" icon={<BarChart3 className="h-4 w-4" />} description="" />
      <Stat label="Active Users"  value="2,340"   trend={-3.2} trendLabel="vs last week"  icon={<User className="h-4 w-4" />}     description="" />
      <Stat label="Avg Rating"    value="4.8"     trend={0.3}  trendLabel="this quarter"  icon={<Star className="h-4 w-4" />}     description="" />
    </StatGroup>
  )
}`

// ═══════════════════════════════════════════════════════════════════════════════
// 11. Kanban — cards have EITHER badge OR description, not both
// ═══════════════════════════════════════════════════════════════════════════════
const KANBAN_COLS = [
  { id: 'todo',     title: 'To Do',       cards: [{ id: 'c1', title: 'Design login page',  badge: 'UI'      }, { id: 'c2', title: 'Write API docs',           badge: 'Docs'    }] },
  { id: 'progress', title: 'In Progress', cards: [{ id: 'c3', title: 'Implement auth flow', description: 'OAuth + JWT tokens' }] },
  { id: 'review',   title: 'In Review',   cards: [{ id: 'c4', title: 'Payment integration', description: 'Stripe webhooks'   }] },
  { id: 'done',     title: 'Done',        cards: [{ id: 'c5', title: 'Set up CI/CD',        badge: 'DevOps'  }, { id: 'c6', title: 'Database schema',         badge: 'DB'      }] },
]
export function KanbanDemo() {
  return (
    <ScaledBlock naturalHeight={420} previewHeight={360}>
      <div style={{ height: '420px', display: 'flex', flexDirection: 'column' }}>
        <Kanban className="" columns={KANBAN_COLS} onMoveCard={() => {}} />
      </div>
    </ScaledBlock>
  )
}
export const kanbanCode = `import { Kanban } from '@otf/ui'

const columns = [
  { id: 'todo',     title: 'To Do',       cards: [{ id: '1', title: 'Design login page', badge: 'UI' }] },
  { id: 'progress', title: 'In Progress', cards: [{ id: '2', title: 'Auth flow', description: 'OAuth + JWT' }] },
  { id: 'done',     title: 'Done',        cards: [{ id: '3', title: 'CI/CD setup', badge: 'DevOps' }] },
]

export function ProjectBoard() {
  const [cols, setCols] = useState(columns)
  return (
    <Kanban
      columns={cols}
      onMoveCard={(cardId, fromCol, toCol) => {
        // update cols state
      }}
    />
  )
}`

// ═══════════════════════════════════════════════════════════════════════════════
// 12. Area Chart
// ═══════════════════════════════════════════════════════════════════════════════
const CHART_DATA = [
  { month: 'Jan', Revenue: 12400, Users: 840  },
  { month: 'Feb', Revenue: 18200, Users: 1120 },
  { month: 'Mar', Revenue: 15800, Users: 980  },
  { month: 'Apr', Revenue: 24600, Users: 1540 },
  { month: 'May', Revenue: 22100, Users: 1380 },
  { month: 'Jun', Revenue: 31400, Users: 1960 },
  { month: 'Jul', Revenue: 28900, Users: 1820 },
  { month: 'Aug', Revenue: 38200, Users: 2340 },
]
export function AreaChartDemo() {
  return (
    <div className="w-full max-w-xl">
      <div className="mb-3 flex items-baseline gap-3">
        <span className="text-2xl font-bold">$38.2k</span>
        <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-500">↑ +32.4% this month</span>
      </div>
      <AreaChart className="" data={CHART_DATA} dataKey={['Revenue', 'Users']} xAxisKey="month" height={200} showLegend curved />
    </div>
  )
}
export const areaChartCode = `import { AreaChart } from '@otf/ui'

const data = [
  { month: 'Jan', Revenue: 12400, Users: 840 },
  { month: 'Feb', Revenue: 18200, Users: 1120 },
  // ...
]

export function RevenueChart() {
  return (
    <AreaChart
      data={data}
      dataKey={['Revenue', 'Users']}
      xAxisKey="month"
      height={240}
      showLegend
      curved
    />
  )
}`

// ═══════════════════════════════════════════════════════════════════════════════
// 13. Chat Detail
// ═══════════════════════════════════════════════════════════════════════════════
export function ChatDetailDemo() {
  return (
    <ScaledBlock naturalHeight={480} previewHeight={400}>
      <ChatDetail className="" />
    </ScaledBlock>
  )
}
export const chatDetailCode = `import { ChatDetail } from '@otf/ui'

export function InboxPage() {
  return (
    <div className="h-screen">
      <ChatDetail className="h-full" />
    </div>
  )
}`

// ═══════════════════════════════════════════════════════════════════════════════
// 14. App Shell (SidebarLayoutDashboard)
// ═══════════════════════════════════════════════════════════════════════════════
export function SidebarLayoutDemo() {
  return (
    <ScaledBlock naturalHeight={600} previewHeight={400}>
      <SidebarLayoutDashboard className="" />
    </ScaledBlock>
  )
}
export const sidebarLayoutCode = `import { SidebarLayoutDashboard } from '@otf/ui'

export function DashboardPage() {
  return (
    <div className="h-screen">
      <SidebarLayoutDashboard className="h-full" />
    </div>
  )
}`
