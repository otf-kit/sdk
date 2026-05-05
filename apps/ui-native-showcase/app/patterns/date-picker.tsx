import { useState } from 'react'
import {
  DatePicker,
  YStack,
  XStack,
  SizableText,
  OtfButton,
} from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

function formatDate(d: Date | undefined) {
  if (!d) return '—'
  return d.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function DatePickerShowcase() {
  const [single, setSingle] = useState<Date | undefined>(new Date(2026, 4, 14))
  const [start, setStart] = useState<Date | undefined>(new Date(2026, 4, 5))
  const [end, setEnd] = useState<Date | undefined>(new Date(2026, 4, 12))
  const [pickingEnd, setPickingEnd] = useState(false)
  const [bounded, setBounded] = useState<Date | undefined>(new Date(2026, 4, 10))
  const [sundayStart, setSundayStart] = useState<Date | undefined>()

  const today = new Date()
  const minDate = new Date(today.getFullYear(), today.getMonth(), 1)
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 0)

  return (
    <ShowcaseFrame
      title="Date Picker"
      description="Calendar grid with single-date, range, and bounded variants. Monday-start by default; pass startDay={0} for Sunday-first."
      docPath="packages/ui-native/src/patterns/DatePicker.tsx"
    >
      <Section title="Single date" hint={`Selected: ${formatDate(single)}`}>
        <YStack gap="$3" maxWidth={360}>
          <DatePicker value={single} onDateChange={setSingle} />
          <XStack gap="$2">
            <OtfButton variant="outlined" size="sm" onPress={() => setSingle(new Date())}>
              Today
            </OtfButton>
            <OtfButton variant="outlined" size="sm" onPress={() => setSingle(undefined)}>
              Clear
            </OtfButton>
          </XStack>
        </YStack>
      </Section>

      <Section
        title="Range"
        hint={`${formatDate(start)} → ${formatDate(end)} ${pickingEnd ? '(picking end)' : ''}`}
      >
        <YStack gap="$3" maxWidth={360}>
          <DatePicker
            value={pickingEnd ? end : start}
            onDateChange={(d: Date) => {
              if (!pickingEnd) {
                setStart(d)
                setEnd(undefined)
                setPickingEnd(true)
              } else {
                if (start && d < start) {
                  setEnd(start)
                  setStart(d)
                } else {
                  setEnd(d)
                }
                setPickingEnd(false)
              }
            }}
          />
          <XStack gap="$2">
            <OtfButton
              variant={!pickingEnd ? 'primary' : 'outlined'}
              size="sm"
              onPress={() => setPickingEnd(false)}
            >
              Pick start
            </OtfButton>
            <OtfButton
              variant={pickingEnd ? 'primary' : 'outlined'}
              size="sm"
              onPress={() => setPickingEnd(true)}
            >
              Pick end
            </OtfButton>
          </XStack>
        </YStack>
      </Section>

      <Section
        title="Min / max bounds"
        hint="constrained to the current month +/- 1"
      >
        <YStack gap="$2" maxWidth={360}>
          <DatePicker
            value={bounded}
            onDateChange={setBounded}
            minDate={minDate}
            maxDate={maxDate}
          />
          <SizableText size="$2" color="$color10">
            Faded cells fall outside the allowed window — taps are disabled.
          </SizableText>
        </YStack>
      </Section>

      <Section title="Sunday-first week" hint={`Selected: ${formatDate(sundayStart)}`}>
        <YStack maxWidth={360}>
          <DatePicker
            value={sundayStart}
            onDateChange={setSundayStart}
            startDay={0}
          />
        </YStack>
      </Section>
    </ShowcaseFrame>
  )
}
