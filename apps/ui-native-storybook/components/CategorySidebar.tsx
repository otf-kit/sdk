import { Link, usePathname } from 'expo-router'
import {
  YStack,
  XStack,
  SizableText,
  ScrollView,
  Separator,
  type ColorTokens,
} from '@otf/ui-native'
import { CATALOG, readyCount, type Category, type EntryStatus } from './catalog'

interface CategorySidebarProps {
  // Show on web by default; consumer hides it on mobile breakpoints.
  width?: number
}

function statusDot(status: EntryStatus): { color: ColorTokens; label: string } {
  switch (status) {
    case 'ready':
      return { color: '$green10' as ColorTokens, label: 'ready' }
    case 'stub':
      return { color: '$yellow10' as ColorTokens, label: 'stub' }
    case 'coming-soon':
      return { color: '$color8' as ColorTokens, label: 'soon' }
  }
}

function CategoryBlock({ category, pathname }: { category: Category; pathname: string }) {
  return (
    <YStack gap="$1.5" paddingVertical="$2">
      <XStack alignItems="center" justifyContent="space-between" paddingHorizontal="$3">
        <SizableText size="$2" fontWeight="700" color="$color12" textTransform="uppercase" letterSpacing={0.5}>
          {category.title}
        </SizableText>
        <SizableText size="$1" color="$color10">
          {readyCount(category)}/{category.entries.length}
        </SizableText>
      </XStack>
      <YStack>
        {category.entries.map((entry) => {
          const href = `/${category.id}/${entry.slug}`
          const active = pathname === href
          const dot = statusDot(entry.status)
          return (
            <Link key={entry.slug} href={href as never} asChild>
              <XStack
                paddingHorizontal="$3"
                paddingVertical="$2"
                alignItems="center"
                justifyContent="space-between"
                gap="$2"
                backgroundColor={active ? '$backgroundFocus' : 'transparent'}
                borderLeftWidth={2}
                borderLeftColor={active ? '$color12' : 'transparent'}
                hoverStyle={{ backgroundColor: '$backgroundHover' }}
                cursor="pointer"
              >
                <SizableText
                  size="$3"
                  color={active ? '$color12' : '$color11'}
                  fontWeight={active ? '600' : '400'}
                  numberOfLines={1}
                  flex={1}
                >
                  {entry.title}
                </SizableText>
                <YStack width={6} height={6} borderRadius={3} backgroundColor={dot.color} />
              </XStack>
            </Link>
          )
        })}
      </YStack>
    </YStack>
  )
}

export function CategorySidebar({ width = 260 }: CategorySidebarProps) {
  const pathname = usePathname()
  return (
    <YStack
      width={width}
      borderRightWidth={1}
      borderRightColor="$borderColor"
      backgroundColor="$background"
      height="100%"
    >
      <Link href="/" asChild>
        <XStack
          padding="$4"
          alignItems="center"
          gap="$2"
          hoverStyle={{ backgroundColor: '$backgroundHover' }}
          cursor="pointer"
        >
          <YStack width={28} height={28} borderRadius="$3" backgroundColor="$color12" alignItems="center" justifyContent="center">
            <SizableText size="$3" fontWeight="800" color="$background">
              O
            </SizableText>
          </YStack>
          <YStack>
            <SizableText size="$3" fontWeight="700" color="$color12">
              @otf/ui-native
            </SizableText>
            <SizableText size="$1" color="$color10">
              Showcase
            </SizableText>
          </YStack>
        </XStack>
      </Link>
      <Separator />
      <ScrollView flex={1}>
        <YStack paddingVertical="$2">
          {CATALOG.map((category, i) => (
            <YStack key={category.id}>
              {i > 0 ? <Separator marginVertical="$1" /> : null}
              <CategoryBlock category={category} pathname={pathname} />
            </YStack>
          ))}
        </YStack>
      </ScrollView>
    </YStack>
  )
}
