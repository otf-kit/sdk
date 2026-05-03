import { Link } from 'expo-router'
import {
  ScrollView,
  YStack,
  XStack,
  H1,
  H2,
  SizableText,
  Separator,
  useMedia,
} from '@otf/ui-native'
import { CATALOG, readyCount } from '../components/catalog'

export default function ShowcaseHome() {
  const media = useMedia()
  const horizontalPadding = media.gtSm ? '$6' : '$4'

  const totalEntries = CATALOG.reduce((acc, c) => acc + c.entries.length, 0)
  const totalReady = CATALOG.reduce((acc, c) => acc + readyCount(c), 0)

  return (
    <ScrollView flex={1} backgroundColor="$background" contentContainerStyle={{ paddingBottom: 96 }}>
      <YStack
        paddingHorizontal={horizontalPadding}
        paddingTop="$7"
        paddingBottom="$5"
        maxWidth={960}
        width="100%"
        alignSelf="center"
        gap="$4"
      >
        <YStack gap="$2">
          <SizableText size="$2" color="$color10" textTransform="uppercase" letterSpacing={1}>
            @otf/ui-native
          </SizableText>
          <H1 size="$13" fontWeight="800" letterSpacing={-1.2}>
            Mobile primitives, exercised.
          </H1>
          <SizableText size="$6" color="$color11" maxWidth={680}>
            Every primitive, interface block, layout, and pattern in
            @otf/ui-native — rendered with every prop variant, on every
            palette, in light and dark.
          </SizableText>
        </YStack>
        <XStack gap="$3" flexWrap="wrap">
          <Stat label="Categories" value={CATALOG.length.toString()} />
          <Stat label="Entries" value={totalEntries.toString()} />
          <Stat label="Ready" value={`${totalReady} / ${totalEntries}`} />
        </XStack>
      </YStack>

      <Separator />

      <YStack
        paddingHorizontal={horizontalPadding}
        paddingVertical="$6"
        maxWidth={960}
        width="100%"
        alignSelf="center"
        gap="$6"
      >
        {CATALOG.map((category) => (
          <YStack key={category.id} gap="$3">
            <YStack gap="$1">
              <XStack alignItems="baseline" justifyContent="space-between" gap="$3">
                <H2 size="$8" fontWeight="700">
                  {category.title}
                </H2>
                <SizableText size="$3" color="$color10">
                  {readyCount(category)} ready / {category.entries.length} total
                </SizableText>
              </XStack>
              <SizableText size="$3" color="$color11" maxWidth={680}>
                {category.description}
              </SizableText>
            </YStack>
            <YStack
              flexWrap="wrap"
              flexDirection="row"
              gap="$3"
            >
              {category.entries.map((entry) => {
                const href = `/${category.id}/${entry.slug}`
                return (
                  <Link key={entry.slug} href={href as never} asChild>
                    <YStack
                      flexBasis={media.gtSm ? '32%' : '100%'}
                      minWidth={240}
                      flexGrow={1}
                      padding="$4"
                      gap="$2"
                      borderRadius="$4"
                      borderWidth={1}
                      borderColor="$borderColor"
                      backgroundColor="$background"
                      hoverStyle={{ backgroundColor: '$backgroundHover', borderColor: '$borderColorHover' }}
                      pressStyle={{ scale: 0.99 }}
                      cursor="pointer"
                    >
                      <XStack alignItems="center" justifyContent="space-between" gap="$2">
                        <SizableText size="$5" fontWeight="600" color="$color12">
                          {entry.title}
                        </SizableText>
                        <StatusBadge status={entry.status} />
                      </XStack>
                      <SizableText size="$2" color="$color10" numberOfLines={2}>
                        {entry.description}
                      </SizableText>
                    </YStack>
                  </Link>
                )
              })}
            </YStack>
          </YStack>
        ))}
      </YStack>
    </ScrollView>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <YStack
      paddingHorizontal="$4"
      paddingVertical="$3"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      backgroundColor="$backgroundHover"
      gap="$0.5"
      minWidth={140}
    >
      <SizableText size="$1" color="$color10" textTransform="uppercase" letterSpacing={0.5}>
        {label}
      </SizableText>
      <SizableText size="$7" fontWeight="700" color="$color12">
        {value}
      </SizableText>
    </YStack>
  )
}

function StatusBadge({ status }: { status: 'ready' | 'stub' | 'coming-soon' }) {
  const palette = {
    ready: { bg: '$green5', fg: '$green11', label: 'ready' },
    stub: { bg: '$yellow5', fg: '$yellow11', label: 'stub' },
    'coming-soon': { bg: '$color5', fg: '$color11', label: 'soon' },
  } as const
  const tone = palette[status]
  return (
    <YStack
      paddingHorizontal="$2"
      paddingVertical="$0.5"
      borderRadius="$2"
      backgroundColor={tone.bg}
    >
      <SizableText size="$1" color={tone.fg} fontWeight="600" textTransform="uppercase" letterSpacing={0.4}>
        {tone.label}
      </SizableText>
    </YStack>
  )
}
