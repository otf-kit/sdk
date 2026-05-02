import { type ReactNode, useMemo, useState } from 'react'
import { SizableText, Separator, XStack, YStack, useMedia, styled, View } from 'tamagui'

export type DataTableColumn<T> = {
  key: string
  header: string
  render?: (value: any, row: T) => ReactNode
  sortable?: boolean
  width?: number | string
}

export type DataTableProps<T extends Record<string, any>> = {
  columns: DataTableColumn<T>[]
  data: T[]
  onRowPress?: (row: T) => void
  emptyMessage?: string
}

type SortState = { key: string; dir: 'asc' | 'desc' } | null

const TH = styled(View, { padding: '$3', justifyContent: 'center' })
const TD = styled(View, { padding: '$3', justifyContent: 'center' })

export function StatusBadge({ status }: { status: string }) {
  const isActive = status.toLowerCase() === 'active'
  return (
    <XStack gap="$2" alignItems="center">
      <View width={8} height={8} borderRadius={4}
        backgroundColor={isActive ? '$green9' : '$orange9'} />
      <SizableText size="$3" color="$color11">{status}</SizableText>
    </XStack>
  )
}

function HeaderCell({ col, sort, onSort }: { col: DataTableColumn<any>; sort: SortState; onSort: () => void }) {
  const active = sort?.key === col.key
  const indicator = active ? (sort!.dir === 'asc' ? ' ▲' : ' ▼') : ''
  return (
    <TH key={col.key} width={col.width} flexDirection="row" alignItems="center"
      cursor={col.sortable ? 'pointer' : undefined} onPress={col.sortable ? onSort : undefined}
      pressStyle={col.sortable ? { opacity: 0.7 } : undefined}>
      <SizableText size="$2" fontWeight="700" color={active ? '$color12' : '$color9'}
        textTransform="uppercase" letterSpacing={0.5}>
        {col.header}{indicator}
      </SizableText>
    </TH>
  )
}

function TableRow<T extends Record<string, any>>({ row, columns, onPress, odd }: {
  row: T; columns: DataTableColumn<T>[]; onPress?: (r: T) => void; odd: boolean
}) {
  return (
    <XStack backgroundColor={odd ? '$color2' : 'transparent'} borderBottomWidth={0.5}
      borderColor="$color4" hoverStyle={{ backgroundColor: '$color3' }}
      cursor={onPress ? 'pointer' : undefined} onPress={onPress ? () => onPress(row) : undefined}
      pressStyle={onPress ? { opacity: 0.85 } : undefined} animation="quick">
      {columns.map((col) => (
        <TD key={col.key} width={col.width} flex={col.width ? undefined : 1}>
          {col.render ? col.render(row[col.key], row) : (
            <SizableText size="$3" color="$color11">{String(row[col.key] ?? '')}</SizableText>
          )}
        </TD>
      ))}
    </XStack>
  )
}

function CardRow<T extends Record<string, any>>({ row, columns, onPress }: {
  row: T; columns: DataTableColumn<T>[]; onPress?: (r: T) => void
}) {
  return (
    <YStack backgroundColor="$color1" borderRadius="$4" borderWidth={1} borderColor="$color4"
      padding="$3" gap="$2" onPress={onPress ? () => onPress(row) : undefined}
      pressStyle={onPress ? { scale: 0.98, opacity: 0.9 } : undefined} animation="quick">
      {columns.map((col, i) => (
        <YStack key={col.key}>
          {i > 0 && <Separator marginVertical="$1.5" borderColor="$color4" />}
          <XStack justifyContent="space-between" alignItems="center">
            <SizableText size="$2" color="$color9" fontWeight="600">{col.header}</SizableText>
            {col.render ? col.render(row[col.key], row) : (
              <SizableText size="$3" color="$color11">{String(row[col.key] ?? '')}</SizableText>
            )}
          </XStack>
        </YStack>
      ))}
    </YStack>
  )
}

export function DataTable<T extends Record<string, any>>({ columns, data, onRowPress, emptyMessage = 'No data' }: DataTableProps<T>) {
  const [sort, setSort] = useState<SortState>(null)
  const media = useMedia()
  const isSmall = media.sm

  const sorted = useMemo(() => {
    if (!sort) return data
    return [...data].sort((a, b) => {
      const av = a[sort.key], bv = b[sort.key]
      const cmp = typeof av === 'number' && typeof bv === 'number' ? av - bv
        : String(av ?? '').localeCompare(String(bv ?? ''))
      return sort.dir === 'asc' ? cmp : -cmp
    })
  }, [data, sort])

  const toggleSort = (key: string) =>
    setSort((s) => s?.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' })

  if (!data.length) {
    return (
      <YStack padding="$6" alignItems="center">
        <SizableText size="$4" color="$color9">{emptyMessage}</SizableText>
      </YStack>
    )
  }

  if (isSmall) {
    return (
      <YStack gap="$3">
        {sorted.map((row, i) => (
          <CardRow key={i} row={row} columns={columns} onPress={onRowPress} />
        ))}
      </YStack>
    )
  }

  return (
    <YStack borderWidth={1} borderColor="$color4" borderRadius="$4" overflow="hidden">
      <XStack backgroundColor="$color1" borderBottomWidth={1} borderColor="$color4">
        {columns.map((col) => (
          <HeaderCell key={col.key} col={col} sort={sort} onSort={() => toggleSort(col.key)} />
        ))}
      </XStack>
      {sorted.map((row, i) => (
        <TableRow key={i} row={row} columns={columns} onPress={onRowPress} odd={i % 2 === 1} />
      ))}
    </YStack>
  )
}
