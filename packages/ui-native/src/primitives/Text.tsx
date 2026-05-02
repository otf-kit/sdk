import { SizableText, styled, type GetProps } from 'tamagui'

export const OtfText = styled(SizableText, {
  name: 'OtfText',

  variants: {
    variant: {
      display: { size: '$10', fontWeight: '800' },
      h1: { size: '$9', fontWeight: '700' },
      h2: { size: '$8', fontWeight: '700' },
      h3: { size: '$7', fontWeight: '600' },
      h4: { size: '$6', fontWeight: '600' },
      body: { size: '$5', fontWeight: '400' },
      bodySmall: { size: '$4', fontWeight: '400' },
      caption: { size: '$3', fontWeight: '400', color: '$color10' },
      small: { size: '$2', fontWeight: '400', color: '$color9' },
    },
    muted: {
      true: { color: '$color9' },
    },
    secondary: {
      true: { color: '$color10' },
    },
    center: {
      true: { textAlign: 'center' },
    },
    bold: {
      true: { fontWeight: '700' },
    },
  } as const,

  defaultVariants: {
    variant: 'body',
  },
})

export type OtfTextProps = GetProps<typeof OtfText>
