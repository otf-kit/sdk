import {
  OtfPopover,
  OtfButton,
  YStack,
  XStack,
  SizableText,
  Separator,
  Settings,
  LogOut,
  User,
  Bell,
  HelpCircle,
} from '@otf/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

function MenuRow({
  icon,
  label,
  destructive,
}: {
  icon: React.ReactNode
  label: string
  destructive?: boolean
}) {
  return (
    <XStack
      alignItems="center"
      gap="$2.5"
      paddingVertical="$2"
      paddingHorizontal="$1"
      borderRadius="$3"
      cursor="pointer"
      hoverStyle={{ backgroundColor: '$color3' }}
    >
      {icon}
      <SizableText size="$3" color={destructive ? '$red10' : '$color12'}>
        {label}
      </SizableText>
    </XStack>
  )
}

export default function OtfPopoverShowcase() {
  return (
    <ShowcaseFrame
      title="Popover"
      description="Anchored floating panel — used for menus, hints, and quick controls. Adapts to a sheet on touch."
      docPath="packages/ui-native/src/patterns/OtfPopover.tsx"
    >
      <Section title="Account menu">
        <XStack>
          <OtfPopover
            placement="bottom"
            trigger={<OtfButton variant="outlined">Account</OtfButton>}
          >
            <YStack gap="$1" minWidth={200}>
              <YStack paddingHorizontal="$1" paddingBottom="$2">
                <SizableText size="$3" fontWeight="600">Sarah Chen</SizableText>
                <SizableText size="$2" color="$color10">mock@otf.sh</SizableText>
              </YStack>
              <Separator />
              <MenuRow icon={<User size={16} />} label="Profile" />
              <MenuRow icon={<Settings size={16} />} label="Settings" />
              <MenuRow icon={<Bell size={16} />} label="Notifications" />
              <Separator />
              <MenuRow icon={<LogOut size={16} />} label="Sign out" destructive />
            </YStack>
          </OtfPopover>
        </XStack>
      </Section>

      <Section title="Placement variants">
        <XStack gap="$3" flexWrap="wrap">
          <OtfPopover
            placement="top"
            trigger={<OtfButton variant="outlined" size="$3">Top</OtfButton>}
          >
            <SizableText size="$3">Pops up above the trigger.</SizableText>
          </OtfPopover>
          <OtfPopover
            placement="bottom"
            trigger={<OtfButton variant="outlined" size="$3">Bottom</OtfButton>}
          >
            <SizableText size="$3">Pops below the trigger.</SizableText>
          </OtfPopover>
          <OtfPopover
            placement="left"
            trigger={<OtfButton variant="outlined" size="$3">Left</OtfButton>}
          >
            <SizableText size="$3">Anchors to the left.</SizableText>
          </OtfPopover>
          <OtfPopover
            placement="right"
            trigger={<OtfButton variant="outlined" size="$3">Right</OtfButton>}
          >
            <SizableText size="$3">Anchors to the right.</SizableText>
          </OtfPopover>
        </XStack>
      </Section>

      <Section title="With help content">
        <XStack>
          <OtfPopover
            placement="bottom"
            trigger={
              <OtfButton variant="outlined" size="$3">
                <HelpCircle size={16} />
              </OtfButton>
            }
          >
            <YStack gap="$2" maxWidth={260}>
              <SizableText size="$3" fontWeight="600">What's a kit?</SizableText>
              <SizableText size="$3" color="$color11">
                A kit is a self-contained template — design tokens, screens, and
                a sample backend wired together. Drop one in and you're shipping.
              </SizableText>
              <OtfButton size="$2" alignSelf="flex-start">Read more</OtfButton>
            </YStack>
          </OtfPopover>
        </XStack>
      </Section>

      <Section title="Quick action picker">
        <XStack>
          <OtfPopover
            placement="bottom"
            trigger={<OtfButton>Add new</OtfButton>}
          >
            <YStack gap="$1" minWidth={180}>
              <MenuRow icon={<User size={16} />} label="Add member" />
              <MenuRow icon={<Bell size={16} />} label="New alert" />
              <MenuRow icon={<Settings size={16} />} label="New rule" />
            </YStack>
          </OtfPopover>
        </XStack>
      </Section>
    </ShowcaseFrame>
  )
}
