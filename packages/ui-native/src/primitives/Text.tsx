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
      caption: { size: '$3', fontWeight: '400', color: '$color11' },
      small: { size: '$2', fontWeight: '400', color: '$color11' },
    },
    // $color11 = muted text; $color9/$color10 are the accent ramp (solid
    // backgrounds), never body text.
    muted: {
      true: { color: '$color11' },
    },
    secondary: {
      true: { color: '$color11' },
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
