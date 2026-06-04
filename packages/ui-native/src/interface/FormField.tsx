import { type ReactNode } from 'react'
import { SizableText, YStack } from 'tamagui'

export type FormFieldProps = {
  label?: string; error?: string; helperText?: string; required?: boolean; children: ReactNode
}

export function FormField({ label, error, helperText, required, children }: FormFieldProps) {
  return (
    <YStack gap="$1.5">
      {label && (
        <SizableText size="$3" fontWeight="600" color="$color11">
          {label}{required && <SizableText color="$red9"> *</SizableText>}
        </SizableText>
      )}
      {children}
      {helperText && !error && <SizableText size="$2" color="$color11">{helperText}</SizableText>}
      {error && <SizableText size="$2" color="$red9">{error}</SizableText>}
    </YStack>
  )
}
