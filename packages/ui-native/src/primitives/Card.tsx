import { styled, View, GetProps, withStaticProperties } from 'tamagui'

const CardFrame = styled(View, {
  name: 'OtfCard',
  backgroundColor: '$color2',
  borderRadius: '$4',
  overflow: 'hidden',

  variants: {
    variant: {
      flat: {},
      // Premium lift: soft shadow (carries depth in light mode) + a hairline
      // so the surface still separates in dark mode where shadows vanish.
      elevated: {
        backgroundColor: '$color2',
        borderWidth: 1,
        borderColor: '$color3',
        shadowColor: '$shadow2',
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 18,
        shadowOpacity: 0.14,
        elevation: 4,
      },
      // Hairline-forward surface (inner ring) + a whisper of shadow.
      ring: {
        backgroundColor: '$color2',
        borderWidth: 1,
        borderColor: '$color4',
        shadowColor: '$shadow2',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        shadowOpacity: 0.08,
      },
      outlined: {
        borderWidth: 1,
        borderColor: '$color5',
      },
    },
    size: {
      sm: { borderRadius: '$3', padding: '$3' },
      md: { borderRadius: '$4', padding: '$4' },
      lg: { borderRadius: '$5', padding: '$5' },
    },
    pressable: {
      true: {
        pressStyle: { scale: 0.98, opacity: 0.9 },
        cursor: 'pointer',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'elevated',
    size: 'md',
  },
})

const CardHeader = styled(View, { name: 'OtfCardHeader', paddingBottom: '$3' })
const CardContent = styled(View, { name: 'OtfCardContent' })
const CardFooter = styled(View, {
  name: 'OtfCardFooter',
  paddingTop: '$3',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '$2',
})

export type CardProps = GetProps<typeof CardFrame>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Card: any = withStaticProperties(CardFrame, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
})
