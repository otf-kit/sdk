/**
 * ListItem
 *
 * Layout primitive for list rows. Used universally for settings, devices,
 * notifications, links, and any "icon + title + subtitle (+ trailing)" row.
 *
 * Right-slot variants:
 *   - `'chevron'`              → ChevronRight icon (default when `href` is set)
 *   - `'switch'`               → Tamagui Switch driven by `switchValue` + `onSwitchChange`
 *   - `{ value: string }`      → right-aligned muted label
 *   - `{ badge, tone }`        → small pill (default | success | warning | danger)
 *   - any `ReactNode`          → rendered as-is (existing behavior preserved)
 *   - undefined                → no right slot (existing behavior preserved)
 *
 * The `href` shorthand auto-renders a chevron and pushes via `expo-router` on press.
 *
 * Backwards compatible: every prop, render branch, and visual output from the
 * pre-extension version still works unchanged.
 */

import type { ReactNode } from 'react'
import { ChevronRight } from '@tamagui/lucide-icons'
import { router } from 'expo-router'
import { SizableText, styled, Switch, View, XStack, YStack } from 'tamagui'

const ListItemFrame = styled(XStack, {
  name: 'OtfListItem',
  alignItems: 'center',
  gap: '$3',
  padding: '$3',
  borderRadius: '$3',

  variants: {
    pressable: {
      true: {
        cursor: 'pointer',
        hoverStyle: { backgroundColor: '$color2' },
        pressStyle: { backgroundColor: '$color3', opacity: 0.9 },
      },
    },
  } as const,
})

export type ListItemBadgeTone = 'default' | 'success' | 'warning' | 'danger'

export type ListItemRightValue = { value: string }
export type ListItemRightBadge = { badge: string; tone?: ListItemBadgeTone }

export type ListItemRight =
  | ReactNode
  | 'chevron'
  | 'switch'
  | ListItemRightValue
  | ListItemRightBadge

export type ListItemProps = {
  icon?: ReactNode
  title: string
  subtitle?: string
  /**
   * Right-side slot. Accepts a custom ReactNode (existing), or one of:
   * `'chevron'`, `'switch'`, `{ value }`, `{ badge, tone }`.
   */
  right?: ListItemRight
  /** When `right === 'switch'`, the Switch's checked state. */
  switchValue?: boolean
  /** When `right === 'switch'`, fired on toggle. */
  onSwitchChange?: (next: boolean) => void
  /** Optional accessibility label for the Switch (when `right === 'switch'`). */
  switchAccessibilityLabel?: string
  /**
   * Shorthand: when set and `right` is undefined, defaults to `'chevron'`
   * and `onPress` becomes `router.push(href)` (composing with any provided onPress).
   */
  href?: string
  onPress?: () => void
}

const BADGE_TONE_STYLES: Record<
  ListItemBadgeTone,
  { backgroundColor: string; color: string }
> = {
  default: { backgroundColor: '$color5', color: '$color12' },
  success: { backgroundColor: '#22c55e1a', color: '#22c55e' },
  warning: { backgroundColor: '#f59e0b1a', color: '#f59e0b' },
  danger: { backgroundColor: '#ef44441a', color: '#ef4444' },
}

function isValueRight(r: unknown): r is ListItemRightValue {
  return (
    typeof r === 'object' &&
    r !== null &&
    'value' in r &&
    typeof (r as { value: unknown }).value === 'string' &&
    !('badge' in r)
  )
}

function isBadgeRight(r: unknown): r is ListItemRightBadge {
  return (
    typeof r === 'object' &&
    r !== null &&
    'badge' in r &&
    typeof (r as { badge: unknown }).badge === 'string'
  )
}

function renderRight(
  right: ListItemRight | undefined,
  switchValue: boolean | undefined,
  onSwitchChange: ((next: boolean) => void) | undefined,
  switchAccessibilityLabel: string | undefined,
  title: string,
): ReactNode {
  if (right === undefined || right === null) return null

  if (right === 'chevron') {
    return <ChevronRight size={20} color="$color9" />
  }

  if (right === 'switch') {
    return (
      <Switch
        size="$3"
        checked={switchValue ?? false}
        onCheckedChange={onSwitchChange}
        accessibilityRole="switch"
        accessibilityLabel={switchAccessibilityLabel ?? title}
        accessibilityState={{ checked: switchValue ?? false }}
      >
        <Switch.Thumb animation="quick" />
      </Switch>
    )
  }

  if (isValueRight(right)) {
    return (
      <SizableText size="$3" color="$color10">
        {right.value}
      </SizableText>
    )
  }

  if (isBadgeRight(right)) {
    const tone: ListItemBadgeTone = right.tone ?? 'default'
    const style = BADGE_TONE_STYLES[tone]
    return (
      <View
        paddingHorizontal="$2"
        paddingVertical="$1"
        borderRadius="$10"
        backgroundColor={style.backgroundColor}
      >
        <SizableText size="$1" fontWeight="600" color={style.color}>
          {right.badge}
        </SizableText>
      </View>
    )
  }

  return right as ReactNode
}

export function ListItem({
  icon,
  title,
  subtitle,
  right,
  switchValue,
  onSwitchChange,
  switchAccessibilityLabel,
  href,
  onPress,
}: ListItemProps) {
  const resolvedRight: ListItemRight | undefined =
    right === undefined && href !== undefined ? 'chevron' : right

  const handlePress = (() => {
    if (!href && !onPress) return undefined
    return () => {
      onPress?.()
      if (href) router.push(href)
    }
  })()

  return (
    <ListItemFrame pressable={!!handlePress} onPress={handlePress}>
      {icon && <View>{icon}</View>}
      <YStack flex={1} gap="$1">
        <SizableText size="$4" fontWeight="500" color="$color12">
          {title}
        </SizableText>
        {subtitle && (
          <SizableText size="$2" color="$color9">
            {subtitle}
          </SizableText>
        )}
      </YStack>
      {renderRight(
        resolvedRight,
        switchValue,
        onSwitchChange,
        switchAccessibilityLabel,
        title,
      )}
    </ListItemFrame>
  )
}
