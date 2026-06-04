import { Separator, SizableText, XStack, styled } from 'tamagui'
import type { ReactNode } from 'react'

export const H1 = styled(SizableText, {
  name: 'OtfH1',
  role: 'heading',
  fontFamily: '$heading',
  size: '$10',
  fontWeight: '700',
})

export const H2 = styled(SizableText, {
  name: 'OtfH2',
  role: 'heading',
  fontFamily: '$heading',
  size: '$9',
  fontWeight: '700',
})

export const H3 = styled(SizableText, {
  name: 'OtfH3',
  role: 'heading',
  fontFamily: '$heading',
  size: '$8',
  fontWeight: '600',
})

export const H4 = styled(SizableText, {
  name: 'OtfH4',
  role: 'heading',
  fontFamily: '$heading',
  size: '$6',
  fontWeight: '600',
})

export const H5 = styled(SizableText, {
  name: 'OtfH5',
  role: 'heading',
  fontFamily: '$heading',
  size: '$5',
  fontWeight: '500',
})

export const H6 = styled(SizableText, {
  name: 'OtfH6',
  role: 'heading',
  fontFamily: '$heading',
  size: '$4',
  fontWeight: '500',
})

export const SubHeading = styled(SizableText, {
  name: 'OtfSubHeading',
  size: '$5',
  color: '$color11',
  fontWeight: '300',
  $lg: { size: '$6' },
})

export function SepHeading({ children }: { children: ReactNode }) {
  return (
    <XStack marginTop="$6" marginBottom="$4" alignItems="center" gap="$6">
      <H3 size="$4" color="$color11">
        {children}
      </H3>
      <Separator opacity={0.5} />
    </XStack>
  )
}
