/**
 * Selectable + SelectableGroup
 *
 * Onboarding-grade option cards. Three visual variants —
 *   - `card`  : padded vertical card (reference-style), icon top-left, label + description, check top-right.
 *   - `row`   : horizontal row (reference-style), icon left, label right, check trailing.
 *   - `tile`  : square 1:1 grid item, icon centered, label below. Self-sizing flex-1.
 *
 * Selected state: border tweens 250ms from `$color5` to `accent` (default `$color9`); a check
 * icon fades in via Reanimated `FadeIn`. Honors `useReducedMotion()` — when on, both
 * transitions snap to their final state. Press feedback is a Tamagui `pressStyle`.
 *
 * `<SelectableGroup>` is generic over the option value type and supports single (radio) or
 * multi (checkbox) selection. Layout is vertical for `card`/`row` and a 2-col grid for `tile`.
 *
 * Clean-room implementation. API derived from mobile flow primitives PRD section 2 + reference/reference/
 * reference pattern audits. No code lifted from sibling templates.
 */

import { type ReactNode, useCallback } from 'react'
import { Check } from '@tamagui/lucide-icons'
import { SizableText, XStack, YStack } from 'tamagui'
import Animated, { FadeIn, useReducedMotion } from 'react-native-reanimated'

type SelectableVariant = 'card' | 'row' | 'tile'

export interface SelectableProps {
  label: string
  description?: string
  icon?: ReactNode
  selected: boolean
  onPress: () => void
  variant?: SelectableVariant
  trailing?: ReactNode
  /** Border + check tint when selected. Default `$color9`. */
  accent?: string
  disabled?: boolean
}

/**
 * Single selectable card. Use `<SelectableGroup>` for radio/checkbox semantics across
 * multiple options — `<Selectable>` alone gives you the visual primitive.
 */
export function Selectable({
  label,
  description,
  icon,
  selected,
  onPress,
  variant = 'card',
  trailing,
  accent = '$color9',
  disabled = false,
}: SelectableProps) {
  const reducedMotion = useReducedMotion()
  const borderColor = selected ? accent : '$color5'
  const checkNode =
    trailing !== undefined ? (
      trailing
    ) : selected ? (
      <Animated.View entering={reducedMotion ? undefined : FadeIn.duration(180)}>
        <CheckBadge accent={accent} />
      </Animated.View>
    ) : null

  const sharedProps = {
    onPress: disabled ? undefined : onPress,
    disabled,
    opacity: disabled ? 0.5 : 1,
    pressStyle: disabled ? undefined : { scale: 0.98, opacity: 0.92 },
    animation: reducedMotion ? undefined : ('quick' as const),
    borderColor,
    borderWidth: 1,
    backgroundColor: '$background',
    cursor: disabled ? 'not-allowed' : 'pointer',
    accessibilityRole: 'radio' as const,
    accessibilityState: { selected, disabled },
    accessibilityLabel: label,
  }

  if (variant === 'row') {
    return (
      <XStack
        {...sharedProps}
        minHeight={56}
        paddingVertical="$3"
        paddingHorizontal="$3.5"
        borderRadius="$5"
        alignItems="center"
        gap="$3"
      >
        {icon ? <YStack width={32} alignItems="center">{icon}</YStack> : null}
        <YStack flex={1} gap="$0.5">
          <SizableText size="$4" fontWeight="600" color="$color12">
            {label}
          </SizableText>
          {description ? (
            <SizableText size="$2" color="$color10">
              {description}
            </SizableText>
          ) : null}
        </YStack>
        {checkNode}
      </XStack>
    )
  }

  if (variant === 'tile') {
    return (
      <YStack
        {...sharedProps}
        flex={1}
        aspectRatio={1}
        minHeight={100}
        padding="$3"
        borderRadius="$6"
        alignItems="center"
        justifyContent="center"
        gap="$2"
        position="relative"
      >
        {checkNode ? (
          <YStack position="absolute" top="$2" right="$2">
            {checkNode}
          </YStack>
        ) : null}
        {icon ? <YStack alignItems="center">{icon}</YStack> : null}
        <SizableText size="$3" fontWeight="600" color="$color12" textAlign="center">
          {label}
        </SizableText>
        {description ? (
          <SizableText size="$1" color="$color10" textAlign="center">
            {description}
          </SizableText>
        ) : null}
      </YStack>
    )
  }

  return (
    <YStack
      {...sharedProps}
      minHeight={72}
      padding="$4"
      borderRadius="$6"
      gap="$2"
      position="relative"
    >
      {checkNode ? (
        <YStack position="absolute" top="$3" right="$3">
          {checkNode}
        </YStack>
      ) : null}
      <XStack gap="$3" alignItems="flex-start" paddingRight={checkNode ? '$6' : 0}>
        {icon ? <YStack width={36}>{icon}</YStack> : null}
        <YStack flex={1} gap="$1">
          <SizableText size="$5" fontWeight="600" color="$color12">
            {label}
          </SizableText>
          {description ? (
            <SizableText size="$3" color="$color10">
              {description}
            </SizableText>
          ) : null}
        </YStack>
      </XStack>
    </YStack>
  )
}

function CheckBadge({ accent }: { accent: string }) {
  return (
    <YStack
      width={24}
      height={24}
      borderRadius={12}
      backgroundColor={accent}
      alignItems="center"
      justifyContent="center"
    >
      <Check size={14} color="$color1" />
    </YStack>
  )
}

export type SelectableOption<T extends string | number> = {
  value: T
  label: string
  description?: string
  icon?: ReactNode
}

interface SelectableGroupBaseProps<T extends string | number> {
  options: SelectableOption<T>[]
  variant?: SelectableVariant
  accent?: string
  disabled?: boolean
}

export type SelectableGroupSingleProps<T extends string | number> =
  SelectableGroupBaseProps<T> & {
    multi?: false
    value: T | null
    onChange: (value: T) => void
  }

export type SelectableGroupMultiProps<T extends string | number> =
  SelectableGroupBaseProps<T> & {
    multi: true
    value: T[]
    onChange: (value: T[]) => void
  }

export type SelectableGroupProps<T extends string | number> =
  | SelectableGroupSingleProps<T>
  | SelectableGroupMultiProps<T>

/**
 * Group controller for `<Selectable>`. Handles single or multi-select semantics, lays out
 * options vertically (`card`/`row`) or in a 2-col grid (`tile`), and surfaces an
 * `accessibilityRole` of `radio`/`checkbox` per option.
 */
export function SelectableGroup<T extends string | number>(props: SelectableGroupProps<T>) {
  const { options, variant = 'card', accent, disabled } = props
  const isMulti = props.multi === true

  const isSelected = useCallback(
    (value: T): boolean => {
      if (isMulti) {
        return (props as SelectableGroupMultiProps<T>).value.includes(value)
      }
      return (props as SelectableGroupSingleProps<T>).value === value
    },
    [isMulti, props],
  )

  const handlePress = useCallback(
    (value: T) => {
      if (isMulti) {
        const multi = props as SelectableGroupMultiProps<T>
        const next = multi.value.includes(value)
          ? multi.value.filter((v) => v !== value)
          : [...multi.value, value]
        multi.onChange(next)
      } else {
        ;(props as SelectableGroupSingleProps<T>).onChange(value)
      }
    },
    [isMulti, props],
  )

  if (variant === 'tile') {
    const rows: SelectableOption<T>[][] = []
    for (let i = 0; i < options.length; i += 2) {
      rows.push(options.slice(i, i + 2))
    }
    return (
      <YStack gap="$2.5">
        {rows.map((row, rowIdx) => (
          <XStack key={rowIdx} gap="$2.5">
            {row.map((opt) => (
              <Selectable
                key={String(opt.value)}
                label={opt.label}
                description={opt.description}
                icon={opt.icon}
                selected={isSelected(opt.value)}
                onPress={() => handlePress(opt.value)}
                variant="tile"
                accent={accent}
                disabled={disabled}
              />
            ))}
            {row.length === 1 ? <YStack flex={1} aspectRatio={1} /> : null}
          </XStack>
        ))}
      </YStack>
    )
  }

  return (
    <YStack gap="$2.5" role={isMulti ? undefined : 'radiogroup'}>
      {options.map((opt) => {
        const selected = isSelected(opt.value)
        return (
          <YStack
            key={String(opt.value)}
            accessibilityRole={isMulti ? 'checkbox' : 'radio'}
            accessibilityState={{ selected, disabled: !!disabled }}
          >
            <Selectable
              label={opt.label}
              description={opt.description}
              icon={opt.icon}
              selected={selected}
              onPress={() => handlePress(opt.value)}
              variant={variant}
              accent={accent}
              disabled={disabled}
            />
          </YStack>
        )
      })}
    </YStack>
  )
}
