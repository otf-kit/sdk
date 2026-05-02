import { useState, type ReactNode } from 'react'
import { Button, SizableText, XStack, YStack } from 'tamagui'

export type SwipeAction = { id: string; label: string; color: string; onPress: () => void }
export type SwipeableRowProps = { children: ReactNode; leftActions?: SwipeAction[]; rightActions?: SwipeAction[] }

export function SwipeableRow({ children, leftActions, rightActions }: SwipeableRowProps) {
  const [showActions, setShowActions] = useState(false)
  const actions = [...(leftActions ?? []), ...(rightActions ?? [])]
  if (actions.length === 0) return <>{children}</>
  return (
    <YStack>
      <YStack onLongPress={() => setShowActions(v => !v)} pressStyle={{ opacity: 0.9 }}>{children}</YStack>
      {showActions && (
        <XStack gap="$2" padding="$2" animation="quick" enterStyle={{ opacity: 0, scale: 0.95 }}>
          {actions.map(action => (
            <Button key={action.id} flex={1} size="$3" backgroundColor={action.color} borderRadius="$3"
              onPress={() => { action.onPress(); setShowActions(false) }}>
              <SizableText size="$2" fontWeight="600" color="white">{action.label}</SizableText>
            </Button>
          ))}
        </XStack>
      )}
    </YStack>
  )
}
