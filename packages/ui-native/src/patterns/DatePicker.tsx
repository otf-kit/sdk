import { useCallback, useMemo, useState } from 'react'
import { SizableText, XStack, YStack } from 'tamagui'

export type DatePickerProps = {
  value?: Date
  onDateChange?: (date: Date) => void
  minDate?: Date
  maxDate?: Date
  startDay?: 0 | 1
  placeholder?: string
}

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAY_LABELS_SUN = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const DAY_LABELS_MON = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function sameDay(a: Date | undefined, b: Date) {
  return a ? a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate() : false
}

function buildGrid(year: number, month: number, startDay: 0 | 1) {
  const total = daysInMonth(year, month)
  const firstWeekday = new Date(year, month, 1).getDay()
  const offset = (firstWeekday - startDay + 7) % 7
  const prevTotal = daysInMonth(year, month - 1)
  const cells: { day: number; month: number; year: number; outside: boolean }[] = []

  for (let i = offset - 1; i >= 0; i--)
    cells.push({ day: prevTotal - i, month: month - 1, year: month === 0 ? year - 1 : year, outside: true })
  for (let d = 1; d <= total; d++)
    cells.push({ day: d, month, year, outside: false })
  while (cells.length < 42)
    cells.push({ day: cells.length - offset - total + 1, month: month + 1, year: month === 11 ? year + 1 : year, outside: true })
  return cells
}

function NavButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <XStack
      width={36} height={36} borderRadius="$10" alignItems="center" justifyContent="center"
      backgroundColor="$color3" pressStyle={{ scale: 0.92, backgroundColor: '$color5' }}
      animation="quick" onPress={onPress} cursor="pointer"
    >
      <SizableText size="$5" color="$color11" fontWeight="600">{label}</SizableText>
    </XStack>
  )
}

export function DatePicker({ value, onDateChange, minDate, maxDate, startDay = 1 }: DatePickerProps) {
  const today = useMemo(() => new Date(), [])
  const [viewMonth, setViewMonth] = useState(value?.getMonth() ?? today.getMonth())
  const [viewYear, setViewYear] = useState(value?.getFullYear() ?? today.getFullYear())
  const headers = startDay === 1 ? DAY_LABELS_MON : DAY_LABELS_SUN
  const grid = useMemo(() => buildGrid(viewYear, viewMonth, startDay), [viewYear, viewMonth, startDay])

  const navigate = useCallback((dir: -1 | 1) => {
    setViewMonth(m => {
      const next = m + dir
      if (next < 0) { setViewYear(y => y - 1); return 11 }
      if (next > 11) { setViewYear(y => y + 1); return 0 }
      return next
    })
  }, [])

  const isDisabled = useCallback((d: Date) => {
    if (minDate && d < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true
    if (maxDate && d > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) return true
    return false
  }, [minDate, maxDate])

  return (
    <YStack backgroundColor="$color2" borderRadius="$4" padding="$3" gap="$2" animation="quick">
      <XStack alignItems="center" justifyContent="space-between">
        <NavButton label="‹" onPress={() => navigate(-1)} />
        <SizableText size="$4" fontWeight="700" color="$color12">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </SizableText>
        <NavButton label="›" onPress={() => navigate(1)} />
      </XStack>

      <XStack>
        {headers.map(h => (
          <SizableText key={h} size="$2" color="$color8" fontWeight="600" textAlign="center" flex={1}>{h}</SizableText>
        ))}
      </XStack>

      {Array.from({ length: Math.ceil(grid.length / 7) }, (_, row) => (
        <XStack key={row}>
          {grid.slice(row * 7, row * 7 + 7).map((cell, i) => {
            const date = new Date(cell.year, cell.month, cell.day)
            const selected = sameDay(value, date)
            const isToday = sameDay(today, date)
            const disabled = cell.outside || isDisabled(date)
            return (
              <YStack key={`${row}-${i}`} flex={1} alignItems="center" paddingVertical="$0.5">
                <XStack
                  width={40} height={40} borderRadius="$10" alignItems="center" justifyContent="center"
                  backgroundColor={selected ? '$color9' : 'transparent'}
                  borderWidth={isToday && !selected ? 1.5 : 0}
                  borderColor="$color9"
                  pressStyle={disabled ? undefined : { scale: 0.9, backgroundColor: selected ? '$color10' : '$color4' }}
                  animation="quick"
                  opacity={disabled ? 0.35 : 1}
                  cursor={disabled ? 'default' : 'pointer'}
                  onPress={disabled ? undefined : () => onDateChange?.(date)}
                >
                  <SizableText
                    size="$3"
                    fontWeight={selected || isToday ? '700' : '400'}
                    color={selected ? 'white' : cell.outside ? '$color5' : '$color12'}
                  >
                    {cell.day}
                  </SizableText>
                </XStack>
              </YStack>
            )
          })}
        </XStack>
      ))}
    </YStack>
  )
}
