import type { ComponentType } from 'react'
import {
  ButtonDemo,        buttonCode,
  AvatarDemo,        avatarCode,
  BadgeDemo,         badgeCode,
  CardDemo,          cardCode,
  InputDemo,         inputCode,
  TabsDemo,          tabsCode,
  SkeletonDemo,      skeletonCode,
  DialogDemo,        dialogCode,
  BannerDemo,        bannerCode,
  StatDemo,          statCode,
  KanbanDemo,        kanbanCode,
  AreaChartDemo,     areaChartCode,
  ChatDetailDemo,    chatDetailCode,
  SidebarLayoutDemo, sidebarLayoutCode,
} from './otf-examples'

export const examples: Record<string, { Demo: ComponentType; code: string }> = {
  'button':                     { Demo: ButtonDemo,        code: buttonCode },
  'avatar':                     { Demo: AvatarDemo,        code: avatarCode },
  'badge':                      { Demo: BadgeDemo,         code: badgeCode },
  'card':                       { Demo: CardDemo,          code: cardCode },
  'input':                      { Demo: InputDemo,         code: inputCode },
  'tabs':                       { Demo: TabsDemo,          code: tabsCode },
  'skeleton':                   { Demo: SkeletonDemo,      code: skeletonCode },
  'dialog':                     { Demo: DialogDemo,        code: dialogCode },
  'banner':                     { Demo: BannerDemo,        code: bannerCode },
  'stat':                       { Demo: StatDemo,          code: statCode },
  'kanban':                     { Demo: KanbanDemo,        code: kanbanCode },
  'area-chart':                 { Demo: AreaChartDemo,     code: areaChartCode },
  'chat-detail':                { Demo: ChatDetailDemo,    code: chatDetailCode },
  'sidebar-layout-dashboard':   { Demo: SidebarLayoutDemo, code: sidebarLayoutCode },
}
