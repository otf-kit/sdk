import { useState } from 'react'
import {
  BottomSheet,
  OtfButton,
  YStack,
  XStack,
  SizableText,
  Separator,
  Switch,
  Settings,
  User,
  Bell,
  Lock,
  Trash2,
  Share2,
  Edit3,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

export default function BottomSheetShowcase() {
  const [actionsOpen, setActionsOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)

  const [pushOn, setPushOn] = useState(true)
  const [emailOn, setEmailOn] = useState(false)
  const [filter, setFilter] = useState<'all' | 'unread' | 'starred'>('all')

  return (
    <ShowcaseFrame
      title="Bottom Sheet"
      description="Gorhom-style sheet — handle, dismiss-on-drag, configurable snap point. Used for action menus, filters, contextual settings, and confirmations."
      docPath="packages/ui-native/src/patterns/BottomSheet.tsx"
    >
      <Section title="Action menu" hint="row of icons + labels">
        <YStack gap="$2" alignItems="flex-start">
          <OtfButton variant="outlined" onPress={() => setActionsOpen(true)}>
            Open action sheet
          </OtfButton>
          <SizableText size="$2" color="$color10">
            Single snap point at 40%, no title bar.
          </SizableText>
        </YStack>

        <BottomSheet
          open={actionsOpen}
          onOpenChange={setActionsOpen}
          snapPoints={[40]}
        >
          <YStack gap="$1">
            {[
              { icon: <Edit3 size={20} />, label: 'Edit' },
              { icon: <Share2 size={20} />, label: 'Share' },
              { icon: <Trash2 size={20} color="$red10" />, label: 'Delete', danger: true },
            ].map((item) => (
              <XStack
                key={item.label}
                paddingVertical="$3"
                paddingHorizontal="$2"
                gap="$3"
                alignItems="center"
                pressStyle={{ backgroundColor: '$color3' }}
                borderRadius="$3"
                onPress={() => setActionsOpen(false)}
              >
                {item.icon}
                <SizableText
                  size="$4"
                  fontWeight="500"
                  color={item.danger ? '$red10' : '$color12'}
                >
                  {item.label}
                </SizableText>
              </XStack>
            ))}
          </YStack>
        </BottomSheet>
      </Section>

      <Section title="Titled — settings" hint="snap to 65%, with title">
        <OtfButton variant="outlined" onPress={() => setSettingsOpen(true)}>
          Open notification settings
        </OtfButton>

        <BottomSheet
          open={settingsOpen}
          onOpenChange={setSettingsOpen}
          title="Notifications"
          snapPoints={[65]}
          showClose
        >
          <YStack gap="$4">
            {[
              { icon: <Bell size={20} />, label: 'Push notifications', desc: 'Streaks + reminders', on: pushOn, set: setPushOn },
              { icon: <User size={20} />, label: 'Email digest', desc: 'Weekly summary', on: emailOn, set: setEmailOn },
            ].map((row) => (
              <XStack key={row.label} alignItems="center" gap="$3">
                {row.icon}
                <YStack flex={1}>
                  <SizableText size="$4" fontWeight="600">{row.label}</SizableText>
                  <SizableText size="$2" color="$color10">{row.desc}</SizableText>
                </YStack>
                <Switch checked={row.on} onCheckedChange={row.set} size="$3">
                  <Switch.Thumb animation="quick" />
                </Switch>
              </XStack>
            ))}
            <Separator />
            <XStack alignItems="center" gap="$3">
              <Lock size={20} />
              <YStack flex={1}>
                <SizableText size="$4" fontWeight="600">Privacy</SizableText>
                <SizableText size="$2" color="$color10">Manage data + account</SizableText>
              </YStack>
              <SizableText size="$3" color="$color9">›</SizableText>
            </XStack>
          </YStack>
        </BottomSheet>
      </Section>

      <Section title="Confirmation" hint="destructive action">
        <OtfButton variant="outlined" onPress={() => setConfirmOpen(true)}>
          Trigger destructive sheet
        </OtfButton>

        <BottomSheet
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          title="Delete this plan?"
          snapPoints={[35]}
        >
          <YStack gap="$4">
            <SizableText size="$3" color="$color11">
              This permanently removes the plan and all logged sessions. You cannot undo this action.
            </SizableText>
            <XStack gap="$2">
              <OtfButton variant="outlined" flex={1} onPress={() => setConfirmOpen(false)}>
                Keep it
              </OtfButton>
              <OtfButton variant="destructive" flex={1} onPress={() => setConfirmOpen(false)}>
                Delete plan
              </OtfButton>
            </XStack>
          </YStack>
        </BottomSheet>
      </Section>

      <Section title="Filter sheet" hint={`Filter: ${filter}`}>
        <OtfButton variant="outlined" onPress={() => setFilterOpen(true)}>
          Open filter
        </OtfButton>

        <BottomSheet
          open={filterOpen}
          onOpenChange={setFilterOpen}
          title="Show items"
          snapPoints={[50]}
        >
          <YStack gap="$2">
            {(['all', 'unread', 'starred'] as const).map((opt) => (
              <XStack
                key={opt}
                paddingVertical="$3"
                paddingHorizontal="$3"
                borderRadius="$3"
                borderWidth={1}
                borderColor={filter === opt ? '$color9' : '$borderColor'}
                backgroundColor={filter === opt ? '$color3' : 'transparent'}
                alignItems="center"
                justifyContent="space-between"
                pressStyle={{ opacity: 0.8 }}
                onPress={() => {
                  setFilter(opt)
                  setFilterOpen(false)
                }}
              >
                <SizableText size="$4" fontWeight={filter === opt ? '700' : '400'} textTransform="capitalize">
                  {opt}
                </SizableText>
                {filter === opt ? (
                  <SizableText size="$4" color="$color9">✓</SizableText>
                ) : null}
              </XStack>
            ))}
          </YStack>
        </BottomSheet>
      </Section>

      <Section title="No handle, no close" hint="minimal — full-bleed content">
        <SizableText size="$2" color="$color10">
          Pass <SizableText size="$2" fontFamily="$mono" color="$color12">{'showHandle={false}'}</SizableText>
          {' '}to swap the drag pill for your own header.
        </SizableText>
        <XStack>
          <OtfButton
            variant="outlined"
            onPress={() => setActionsOpen(true)}
            icon={<Settings size={16} />}
          >
            Same trigger, different config
          </OtfButton>
        </XStack>
      </Section>
    </ShowcaseFrame>
  )
}
