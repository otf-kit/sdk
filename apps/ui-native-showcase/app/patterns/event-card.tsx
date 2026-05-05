import { EventCard, OtfButton, YStack } from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

export default function EventCardShowcase() {
  return (
    <ShowcaseFrame
      title="Event Card"
      description="RSVP-ready event tile. Title, time, location, participants, themed accent."
      docPath="packages/ui-native/src/patterns/EventCard.tsx"
    >
      <Section title="Default — purple">
        <EventCard
          title="Design Critique"
          subtitle="Weekly review"
          time="Thu 4:00 PM"
          location="Studio B"
          participants={6}
          maxParticipants={12}
          label="Open"
          theme="purple"
          actions={<OtfButton size="$2">RSVP</OtfButton>}
        />
      </Section>

      <Section title="Themes" hint="purple · green · blue · orange · red · pink">
        <YStack gap="$3">
          <EventCard
            title="Morning Run"
            time="Sat 7:00 AM"
            location="Riverside Park"
            participants={8}
            theme="green"
            label="Free"
          />
          <EventCard
            title="Hackathon Kickoff"
            time="Fri 6:00 PM"
            location="HQ — 4F"
            participants={24}
            maxParticipants={40}
            theme="blue"
            label="Tickets"
          />
          <EventCard
            title="Sunset Yoga"
            time="Wed 6:30 PM"
            location="Rooftop"
            participants={3}
            theme="orange"
            label="Drop-in"
          />
        </YStack>
      </Section>

      <Section title="With press + RSVP action">
        <EventCard
          title="Pottery Workshop"
          subtitle="Beginner-friendly · 2hr"
          time="Sun 1:00 PM"
          location="Maker Lab"
          participants={4}
          maxParticipants={8}
          theme="pink"
          label="$30"
          onPress={() => {}}
          actions={<OtfButton size="$2" variant="outlined">Details</OtfButton>}
        />
      </Section>

      <Section title="Minimal — no participants, no actions">
        <EventCard
          title="Quarterly Planning"
          time="Mon 10:00 AM"
          location="Zoom"
          theme="red"
        />
      </Section>
    </ShowcaseFrame>
  )
}
