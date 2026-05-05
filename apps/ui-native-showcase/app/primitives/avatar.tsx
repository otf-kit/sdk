import { Avatar, XStack, YStack, SizableText, Circle } from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

const PEOPLE = [
  { name: 'Sarah Chen', src: 'https://i.pravatar.cc/120?img=47' },
  { name: 'Alex Rivera', src: 'https://i.pravatar.cc/120?img=12' },
  { name: 'Jordan Kim', src: 'https://i.pravatar.cc/120?img=33' },
  { name: 'Riley Patel', src: 'https://i.pravatar.cc/120?img=68' },
] as const

export default function AvatarShowcase() {
  return (
    <ShowcaseFrame
      title="Avatar"
      description="User portrait — image source with sized circular fallback."
      docPath="packages/ui-native/src/primitives/Avatar.tsx"
    >
      <Section title="Sizes">
        <XStack gap="$3" alignItems="center" flexWrap="wrap">
          {[24, 32, 40, 56, 80].map((size) => (
            <Avatar key={size} circular size={size}>
              <Avatar.Image source={{ uri: 'https://i.pravatar.cc/120?img=47' }} />
              <Avatar.Fallback backgroundColor="$color5">
                <SizableText size="$2" fontWeight="600">SC</SizableText>
              </Avatar.Fallback>
            </Avatar>
          ))}
        </XStack>
      </Section>

      <Section title="Initials fallback">
        <XStack gap="$3" alignItems="center" flexWrap="wrap">
          {PEOPLE.map((person) => {
            const initials = person.name
              .split(' ')
              .map((n) => n[0])
              .join('')
            return (
              <YStack key={person.name} alignItems="center" gap="$1">
                <Avatar circular size={56}>
                  <Avatar.Fallback backgroundColor="$color6" alignItems="center" justifyContent="center">
                    <SizableText size="$5" fontWeight="700" color="$color12">
                      {initials}
                    </SizableText>
                  </Avatar.Fallback>
                </Avatar>
                <SizableText size="$1" color="$color10">{person.name}</SizableText>
              </YStack>
            )
          })}
        </XStack>
      </Section>

      <Section title="Stacked">
        <XStack alignItems="center">
          {PEOPLE.map((person, i) => (
            <Avatar
              key={person.name}
              circular
              size={40}
              marginLeft={i === 0 ? 0 : -12}
              borderWidth={2}
              borderColor="$background"
            >
              <Avatar.Image source={{ uri: person.src }} />
              <Avatar.Fallback backgroundColor="$color5" />
            </Avatar>
          ))}
          <Circle
            size={40}
            marginLeft={-12}
            backgroundColor="$color4"
            borderWidth={2}
            borderColor="$background"
            alignItems="center"
            justifyContent="center"
          >
            <SizableText size="$2" fontWeight="600" color="$color12">+8</SizableText>
          </Circle>
        </XStack>
      </Section>
    </ShowcaseFrame>
  )
}
