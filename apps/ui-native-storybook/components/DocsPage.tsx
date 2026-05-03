import type { ReactNode } from 'react'
import { Platform } from 'react-native'
import {
  H1,
  H2,
  ScrollView,
  Separator,
  SizableText,
  View,
  XStack,
  YStack,
  useMedia,
} from '@otf/ui-native'
import { CodeBlock } from './CodeBlock'
import { InstallBlock } from './InstallBlock'
import { PreviewCodeTabs } from './PreviewCodeTabs'
import { PropsTable } from './PropsTable'
import type { ComponentMeta } from './types'

interface DocsPageProps {
  meta: ComponentMeta
  /** Live preview content — typically existing <Section> variants from the original ShowcaseFrame. */
  children: ReactNode
}

/**
 * shadcn/ui + Tamagui-style docs page shell. Replaces ShowcaseFrame for new
 * routes. Renders, top to bottom:
 *
 *   1. Breadcrumb (category) + H1 + description + tag chips
 *   2. Preview / Code tabs — children render in Preview, meta.usage in Code
 *   3. Installation block (`bun add @otf/ui-native`)
 *   4. Usage code (separate from Code tab — always visible, doc-friendly)
 *   5. API / props table
 *
 * The Preview / Code tab toggle gives the dual-view shadcn pattern; the
 * Usage section below is a redundant always-visible code block so the page
 * reads top-to-bottom even without toggling tabs.
 */
export function DocsPage({ meta, children }: DocsPageProps) {
  const media = useMedia()
  const horizontalPadding = media.gtSm ? '$6' : '$4'
  const maxWidth = 920

  // Build the import line + auto-generated minimal usage. If `meta.usage`
  // already includes an import, use that as-is; otherwise prepend one.
  const usageCode = meta.usage.includes('import ')
    ? meta.usage
    : `import { ${meta.exports.join(', ')} } from '@otf/ui-native'\n\n${meta.usage}`

  return (
    <ScrollView flex={1} backgroundColor="$background" contentContainerStyle={{ paddingBottom: 120 }}>
      <YStack
        paddingHorizontal={horizontalPadding}
        paddingTop="$5"
        paddingBottom="$3"
        maxWidth={maxWidth}
        width="100%"
        alignSelf="center"
        gap="$5"
      >
        {/* Breadcrumb + heading */}
        <YStack gap="$3">
          <XStack gap="$2" alignItems="center">
            <SizableText size="$2" color="$color10">
              {meta.category}
            </SizableText>
            <SizableText size="$2" color="$color9">
              /
            </SizableText>
            <SizableText size="$2" color="$color11">
              {meta.name}
            </SizableText>
          </XStack>
          <H1
            size="$10"
            color="$color12"
            fontWeight="700"
            letterSpacing={-0.8}
          >
            {meta.name}
          </H1>
          <SizableText size="$5" color="$color11" lineHeight={26} maxWidth={680}>
            {meta.description}
          </SizableText>
          {meta.tags.length ? (
            <XStack gap="$2" flexWrap="wrap">
              {meta.tags.map((tag) => (
                <View
                  key={tag}
                  paddingHorizontal="$2.5"
                  paddingVertical="$1"
                  borderRadius={999}
                  borderWidth={1}
                  borderColor="$borderColor"
                  backgroundColor="$backgroundStrong"
                >
                  <SizableText size="$1" color="$color10" fontFamily="$mono">
                    {tag}
                  </SizableText>
                </View>
              ))}
            </XStack>
          ) : null}
        </YStack>

        {/* Preview / Code tabs */}
        <PreviewCodeTabs preview={children} code={usageCode} />

        <Separator />

        {/* Installation */}
        <YStack gap="$3">
          <H2 size="$7" color="$color12" fontWeight="700">
            Installation
          </H2>
          <InstallBlock command="bun add @otf/ui-native" />
        </YStack>

        {/* Usage */}
        <YStack gap="$3">
          <H2 size="$7" color="$color12" fontWeight="700">
            Usage
          </H2>
          <CodeBlock code={usageCode} language="tsx" />
        </YStack>

        {/* API */}
        <YStack gap="$3">
          <H2 size="$7" color="$color12" fontWeight="700">
            API
          </H2>
          <PropsTable props={meta.props} />
        </YStack>

        {/* Source path footer */}
        {meta.docPath || derivedDocPath(meta) ? (
          <XStack paddingTop="$3" gap="$2">
            <SizableText size="$1" color="$color9" fontFamily="$mono">
              source:
            </SizableText>
            <SizableText size="$1" color="$color10" fontFamily="$mono">
              {meta.docPath ?? derivedDocPath(meta)}
            </SizableText>
          </XStack>
        ) : null}

        {Platform.OS !== 'web' ? null : null}
      </YStack>
    </ScrollView>
  )
}

function derivedDocPath(meta: ComponentMeta): string {
  const cat = meta.category.toLowerCase()
  return `packages/ui-native/src/${cat}/${pascalCase(meta.slug)}.tsx`
}

function pascalCase(slug: string): string {
  return slug
    .split('-')
    .map((s) => (s.length > 0 ? (s[0]?.toUpperCase() ?? '') + s.slice(1) : s))
    .join('')
}
