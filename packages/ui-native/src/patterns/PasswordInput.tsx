import { useState, useCallback } from 'react'
import { Input, SizableText, XStack, YStack } from 'tamagui'
import { Eye, EyeOff } from '@tamagui/lucide-icons'

export type PasswordInputProps = {
  value?: string
  onChangeText?: (value: string) => void
  placeholder?: string
  label?: string
  error?: string
  size?: '$3' | '$4' | '$5'
  strengthIndicator?: boolean
}

function getStrength(pw: string): { label: string; color: string; width: string } {
  if (!pw) return { label: '', color: '$color6', width: '0%' }
  const score = [pw.length >= 8, /[A-Z]/.test(pw), /[0-9]/.test(pw), /[^A-Za-z0-9]/.test(pw)].filter(Boolean).length
  if (score <= 1) return { label: 'Weak', color: '$red9', width: '33%' }
  if (score <= 2) return { label: 'Medium', color: '$yellow9', width: '66%' }
  return { label: 'Strong', color: '$green9', width: '100%' }
}

export function PasswordInput({ value = '', onChangeText, placeholder = 'Password', label, error, size = '$4', strengthIndicator }: PasswordInputProps) {
  const [visible, setVisible] = useState(false)
  const toggle = useCallback(() => setVisible(v => !v), [])
  const strength = getStrength(value)

  return (
    <YStack gap="$1.5">
      {label && <SizableText size="$3" color="$color11" fontWeight="500">{label}</SizableText>}
      <XStack
        borderWidth={1} borderColor={error ? '$red9' : '$color6'} borderRadius="$3"
        backgroundColor="$color2" alignItems="center" paddingRight="$2"
        focusStyle={{ borderColor: '$color9' }}
      >
        <Input
          flex={1} size={size} value={value} onChangeText={onChangeText}
          placeholder={placeholder} placeholderTextColor="$color8"
          secureTextEntry={!visible} backgroundColor="transparent" borderWidth={0}
        />
        <XStack
          paddingHorizontal="$2" alignItems="center" justifyContent="center"
          pressStyle={{ opacity: 0.6 }} onPress={toggle} cursor="pointer"
        >
          {visible ? <Eye size={18} color="$color11" /> : <EyeOff size={18} color="$color11" />}
        </XStack>
      </XStack>
      {strengthIndicator && value.length > 0 && (
        <YStack gap="$1">
          <YStack height={3} backgroundColor="$color4" borderRadius={2} overflow="hidden">
            <YStack height={3} width={strength.width as any} backgroundColor={strength.color} borderRadius={2} animation="quick" />
          </YStack>
          <SizableText size="$1" color={strength.color}>{strength.label}</SizableText>
        </YStack>
      )}
      {error && <SizableText size="$2" color="$red9">{error}</SizableText>}
    </YStack>
  )
}
