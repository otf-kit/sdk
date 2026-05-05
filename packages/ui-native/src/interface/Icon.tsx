import { SizableText } from 'tamagui'

export const ICONS = {
  home: '\u2302', search: '\u2315', back: '\u2039', forward: '\u203A',
  close: '\u2715', menu: '\u2630', more: '\u22EF', plus: '+',
  minus: '\u2212', check: '\u2713', star: '\u2605', starOutline: '\u2606',
  heart: '\u2665', heartOutline: '\u2661', share: '\u2934', edit: '\u270E',
  trash: '\u232B', copy: '\u2398', chat: '\u{1F4AC}', mail: '\u2709',
  bell: '\u{1F514}', bellOff: '\u{1F515}', send: '\u27A4', play: '\u25B6',
  pause: '\u23F8', camera: '\u{1F4F7}', image: '\u{1F5BC}', info: '\u2139',
  warning: '\u26A0', error: '\u2715', success: '\u2713', loading: '\u27F3',
  user: '\u{1F464}', users: '\u{1F465}', settings: '\u2699',
  lock: '\u{1F512}', unlock: '\u{1F513}',
  arrowUp: '\u2191', arrowDown: '\u2193', arrowLeft: '\u2190', arrowRight: '\u2192',
  chevronUp: '\u2303', chevronDown: '\u2304', chevronLeft: '\u2039', chevronRight: '\u203A',
} as const

export type IconName = keyof typeof ICONS
export type IconProps = { name: IconName; size?: number; color?: string }

export function Icon({ name, size = 20, color = '$color12' }: IconProps) {
  return (
    <SizableText fontSize={size} lineHeight={size} color={color} textAlign="center" width={size} height={size}>
      {ICONS[name]}
    </SizableText>
  )
}
