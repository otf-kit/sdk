import { useState, useEffect, useRef, useCallback } from 'react'
import { SizableText, XStack, YStack } from 'tamagui'

export type CountdownBannerProps = {
  endTime?: Date
  minutes?: number
  label?: string
  onExpire?: () => void
  variant?: 'banner' | 'compact' | 'badge'
}

function useCountdown(endTime?: Date, minutes?: number, onExpire?: () => void) {
  const getRemaining = useCallback(() => {
    if (endTime) return Math.max(0, Math.floor((endTime.getTime() - Date.now()) / 1000))
    return 0
  }, [endTime])

  const [seconds, setSeconds] = useState(() => endTime ? getRemaining() : (minutes ?? 0) * 60)
  const firedRef = useRef(false)

  useEffect(() => {
    if (endTime) setSeconds(getRemaining())
    else setSeconds((minutes ?? 0) * 60)
    firedRef.current = false
  }, [endTime, minutes, getRemaining])

  useEffect(() => {
    if (seconds <= 0) return
    const id = setInterval(() => {
      setSeconds((s) => {
        const next = endTime ? Math.max(0, Math.floor((endTime.getTime() - Date.now()) / 1000)) : s - 1
        if (next <= 0 && !firedRef.current) { firedRef.current = true; onExpire?.() }
        return Math.max(0, next)
      })
    }, 1000)
    return () => clearInterval(id)
  }, [seconds > 0, endTime, onExpire])

  const hh = String(Math.floor(seconds / 3600)).padStart(2, '0')
  const mm = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')
  const display = seconds >= 3600 ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`
  return { display, expired: seconds <= 0 }
}

function TimeBox({ value }: { value: string }) {
  return (
    <XStack backgroundColor="rgba(0,0,0,0.15)" paddingHorizontal="$2" paddingVertical="$1" borderRadius="$3">
      <SizableText size="$6" fontWeight="800" color="white" fontFamily="$mono">{value}</SizableText>
    </XStack>
  )
}

export function CountdownBanner({ endTime, minutes, label = 'Offer ends in', onExpire, variant = 'banner' }: CountdownBannerProps) {
  const { display, expired } = useCountdown(endTime, minutes, onExpire)
  if (expired) return null

  const parts = display.split(':')

  if (variant === 'badge') {
    return (
      <XStack backgroundColor="$red9" paddingHorizontal="$2.5" paddingVertical="$1" borderRadius="$10" gap="$1.5" alignItems="center">
        <SizableText size="$1" fontWeight="600" color="white">{label}</SizableText>
        <SizableText size="$2" fontWeight="800" color="white" fontFamily="$mono">{display}</SizableText>
      </XStack>
    )
  }

  if (variant === 'compact') {
    return (
      <XStack backgroundColor="$red3" paddingHorizontal="$3" paddingVertical="$2" borderRadius="$4" gap="$2" alignItems="center" alignSelf="center">
        <SizableText size="$3" fontWeight="600" color="$red9">{label}</SizableText>
        <SizableText size="$5" fontWeight="800" color="$red9" fontFamily="$mono">{display}</SizableText>
      </XStack>
    )
  }

  return (
    <YStack backgroundColor="$red9" paddingVertical="$3" paddingHorizontal="$4" gap="$1.5" alignItems="center">
      <SizableText size="$3" fontWeight="600" color="white" opacity={0.9}>{label}</SizableText>
      <XStack gap="$1.5" alignItems="center">
        {parts.map((p, i) => (
          <XStack key={i} gap="$1.5" alignItems="center">
            {i > 0 && <SizableText size="$6" fontWeight="800" color="white">:</SizableText>}
            <TimeBox value={p} />
          </XStack>
        ))}
      </XStack>
    </YStack>
  )
}
