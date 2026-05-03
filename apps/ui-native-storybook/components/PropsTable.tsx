import { Fragment } from 'react'
import { SizableText, View, XStack, YStack } from '@otf/ui-native'
import type { PropDef } from './types'

interface PropsTableProps {
  props: PropDef[]
}

/**
 * Hand-authored props reference table. Matches the shadcn/ui + Tamagui
 * docs pattern: 4 columns (Prop, Type, Default, Description) with subtle
 * row dividers + monospace prop / type cells.
 *
 * Mobile breakpoint: stacks each prop into a card with label + value rows.
 */
export function PropsTable({ props }: PropsTableProps) {
  if (!props.length) {
    return (
      <View
        paddingVertical="$4"
        paddingHorizontal="$4"
        borderRadius={12}
        borderWidth={1}
        borderColor="$borderColor"
      >
        <SizableText size="$3" color="$color10">
          No props documented.
        </SizableText>
      </View>
    )
  }

  return (
    <YStack
      borderRadius={12}
      borderWidth={1}
      borderColor="$borderColor"
      overflow="hidden"
    >
      {/* Header row */}
      <XStack
        paddingHorizontal="$4"
        paddingVertical="$3"
        backgroundColor="$backgroundStrong"
        borderBottomWidth={1}
        borderBottomColor="$borderColor"
        gap="$3"
      >
        <View flexBasis={160} flexShrink={0}>
          <SizableText size="$1" color="$color10" textTransform="uppercase" letterSpacing={0.5}>
            Prop
          </SizableText>
        </View>
        <View flexBasis={220} flexShrink={0} display="none" $gtSm={{ display: 'flex' }}>
          <SizableText size="$1" color="$color10" textTransform="uppercase" letterSpacing={0.5}>
            Type
          </SizableText>
        </View>
        <View flexBasis={80} flexShrink={0} display="none" $gtMd={{ display: 'flex' }}>
          <SizableText size="$1" color="$color10" textTransform="uppercase" letterSpacing={0.5}>
            Default
          </SizableText>
        </View>
        <View flex={1}>
          <SizableText size="$1" color="$color10" textTransform="uppercase" letterSpacing={0.5}>
            Description
          </SizableText>
        </View>
      </XStack>

      {/* Rows */}
      {props.map((p, i) => (
        <Fragment key={p.name}>
          <XStack
            paddingHorizontal="$4"
            paddingVertical="$3"
            gap="$3"
            backgroundColor={i % 2 === 0 ? 'transparent' : '$backgroundStrong'}
            alignItems="flex-start"
            $sm={{ flexDirection: 'column', gap: '$2' }}
          >
            <View flexBasis={160} flexShrink={0}>
              <XStack alignItems="center" gap="$2" flexWrap="wrap">
                <SizableText size="$3" fontFamily="$mono" color="$color12" fontWeight="600">
                  {p.name}
                </SizableText>
                {p.required ? (
                  <View
                    paddingHorizontal="$1.5"
                    paddingVertical={2}
                    borderRadius={4}
                    backgroundColor="$red4"
                  >
                    <SizableText size="$1" color="$red11" fontWeight="600">
                      required
                    </SizableText>
                  </View>
                ) : null}
              </XStack>
            </View>
            <View
              flexBasis={220}
              flexShrink={0}
              display="none"
              $gtSm={{ display: 'flex' }}
            >
              <SizableText
                size="$2"
                fontFamily="$mono"
                color="$color11"
                wordWrap="break-word"
              >
                {p.type}
              </SizableText>
            </View>
            <View
              flexBasis={80}
              flexShrink={0}
              display="none"
              $gtMd={{ display: 'flex' }}
            >
              {p.default ? (
                <SizableText size="$2" fontFamily="$mono" color="$color10">
                  {p.default}
                </SizableText>
              ) : (
                <SizableText size="$2" color="$color9">
                  —
                </SizableText>
              )}
            </View>
            <View flex={1}>
              <SizableText size="$3" color="$color11" lineHeight={20}>
                {p.description}
              </SizableText>
              {/* On small screens, type + default fold under description */}
              <YStack $gtSm={{ display: 'none' }} marginTop="$2" gap={2}>
                <SizableText size="$1" fontFamily="$mono" color="$color10">
                  type: {p.type}
                </SizableText>
                {p.default ? (
                  <SizableText size="$1" fontFamily="$mono" color="$color10">
                    default: {p.default}
                  </SizableText>
                ) : null}
              </YStack>
            </View>
          </XStack>
        </Fragment>
      ))}
    </YStack>
  )
}
