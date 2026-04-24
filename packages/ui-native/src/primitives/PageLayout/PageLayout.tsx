import React from 'react'
import { styled, View, ScrollView, SizableText, type GetProps } from 'tamagui'

/**
 * Native PageContainer — responsive width ladder matching @otf/ui PageContainer.
 * On mobile, full width. On tablet+, constrained max widths.
 */
const PageContainerFrame = styled(View, {
  name: 'OtfPageContainer',
  width: '100%',
  paddingHorizontal: '$4',
  alignSelf: 'center',

  variants: {
    maxWidth: {
      md: { maxWidth: 640 },
      lg: { maxWidth: 768 },
      xl: { maxWidth: 1024 },
      full: { maxWidth: '100%' as any },
    },
  } as const,

  defaultVariants: {
    maxWidth: 'lg',
  },
})

export type PageContainerProps = GetProps<typeof PageContainerFrame>
export const PageContainer = PageContainerFrame

/**
 * Native PageLayout — full-screen layout matching @otf/ui PageLayout.
 */
const PageLayoutFrame = styled(View, {
  name: 'OtfPageLayout',
  flex: 1,
  backgroundColor: '$color1',
})

export type PageLayoutProps = GetProps<typeof PageLayoutFrame> & {
  scrollable?: boolean
  children: React.ReactNode
}

export function PageLayout({ scrollable = true, children, ...props }: PageLayoutProps) {
  if (scrollable) {
    return (
      <PageLayoutFrame {...props}>
        <ScrollView
          flex={1}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </PageLayoutFrame>
    )
  }

  return <PageLayoutFrame {...props}>{children}</PageLayoutFrame>
}

/**
 * Native PageHeader — title + description + actions
 */
export interface PageHeaderProps {
  title: string
  description?: string
  actions?: React.ReactNode
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <View paddingHorizontal="$4" paddingVertical="$3" gap="$1">
      <View flexDirection="row" alignItems="center" justifyContent="space-between">
        <SizableText size="$7" fontWeight="700" color="$color12">
          {title}
        </SizableText>
        {actions && <View flexDirection="row" gap="$2">{actions}</View>}
      </View>
      {description && (
        <SizableText size="$4" color="$color8">
          {description}
        </SizableText>
      )}
    </View>
  )
}
