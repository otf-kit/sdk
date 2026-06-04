import {
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bell,
  BellOff,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Copy,
  Heart,
  Home,
  Image as ImageIcon,
  Info,
  Loader,
  Lock,
  Mail,
  Menu,
  MessageCircle,
  Minus,
  MoreHorizontal,
  Pause,
  Pencil,
  Play,
  Plus,
  Search,
  Send,
  Settings,
  Share2,
  Star,
  Trash2,
  Unlock,
  User,
  Users,
  X,
} from '@tamagui/lucide-icons'
import type { ComponentType } from 'react'

// Portable component type so the exported ICONS map has a nameable type (the
// raw tamagui IconComponent type isn't portable across the pnpm graph → TS2742).
type IconComponent = ComponentType<{ size?: number; color?: string }>

export type IconName =
  | 'home' | 'search' | 'back' | 'forward' | 'close' | 'menu' | 'more' | 'plus'
  | 'minus' | 'check' | 'star' | 'starOutline' | 'heart' | 'heartOutline'
  | 'share' | 'edit' | 'trash' | 'copy' | 'chat' | 'mail' | 'bell' | 'bellOff'
  | 'send' | 'play' | 'pause' | 'camera' | 'image' | 'info' | 'warning'
  | 'error' | 'success' | 'loading' | 'user' | 'users' | 'settings' | 'lock'
  | 'unlock' | 'arrowUp' | 'arrowDown' | 'arrowLeft' | 'arrowRight'
  | 'chevronUp' | 'chevronDown' | 'chevronLeft' | 'chevronRight'

// Semantic-name → Lucide component map. (This used to map names to unicode
// glyphs and emoji, which are banned by AGENTS.md and read template-grade in a
// kit that ships @tamagui/lucide-icons. The public API is unchanged:
// <Icon name="close" size={20} color="$color12" />.)
export const ICONS: Record<IconName, IconComponent> = {
  home: Home,
  search: Search,
  back: ArrowLeft,
  forward: ArrowRight,
  close: X,
  menu: Menu,
  more: MoreHorizontal,
  plus: Plus,
  minus: Minus,
  check: Check,
  star: Star,
  starOutline: Star,
  heart: Heart,
  heartOutline: Heart,
  share: Share2,
  edit: Pencil,
  trash: Trash2,
  copy: Copy,
  chat: MessageCircle,
  mail: Mail,
  bell: Bell,
  bellOff: BellOff,
  send: Send,
  play: Play,
  pause: Pause,
  camera: Camera,
  image: ImageIcon,
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
  success: CheckCircle2,
  loading: Loader,
  user: User,
  users: Users,
  settings: Settings,
  lock: Lock,
  unlock: Unlock,
  arrowUp: ArrowUp,
  arrowDown: ArrowDown,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  chevronUp: ChevronUp,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
}

export type IconProps = { name: IconName; size?: number; color?: string }

export function Icon({ name, size = 20, color = '$color12' }: IconProps) {
  const Cmp = ICONS[name]
  return <Cmp size={size} color={color} />
}
