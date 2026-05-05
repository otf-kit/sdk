import { DataTable, StatusBadge, SizableText } from '@otfdashkit/ui-native'
import { ShowcaseFrame, Section } from '../../components/ShowcaseFrame'

type Row = {
  name: string
  email: string
  role: string
  status: string
  spend: number
}

type Col = {
  key: string
  header: string
  sortable?: boolean
  width?: number | string
  render?: (value: unknown, row: Row) => React.ReactNode
}

const ROWS: Row[] = [
  { name: 'Sarah Chen', email: 'sarah@otf.sh', role: 'Admin', status: 'Active', spend: 1234.56 },
  { name: 'Alex Rivera', email: 'alex@otf.sh', role: 'Editor', status: 'Active', spend: 842.10 },
  { name: 'Jordan Kim', email: 'jordan@otf.sh', role: 'Viewer', status: 'Pending', spend: 42.00 },
  { name: 'Maya Patel', email: 'maya@otf.sh', role: 'Editor', status: 'Active', spend: 318.75 },
  { name: 'Diego Costa', email: 'diego@otf.sh', role: 'Viewer', status: 'Pending', spend: 0.00 },
]

const COLS: Col[] = [
  { key: 'name', header: 'Name', sortable: true, width: 160 },
  { key: 'email', header: 'Email', width: 200 },
  { key: 'role', header: 'Role', sortable: true, width: 100 },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    width: 120,
    render: (value: unknown) => <StatusBadge status={String(value)} />,
  },
  {
    key: 'spend',
    header: 'Spend',
    sortable: true,
    width: 120,
    render: (value: unknown) => (
      <SizableText size="$3" color="$color12" fontWeight="600">
        ${(value as number).toFixed(2)}
      </SizableText>
    ),
  },
]

const SIMPLE_COLS: Col[] = [
  { key: 'name', header: 'Name' },
  { key: 'role', header: 'Role' },
  { key: 'status', header: 'Status', render: (v: unknown) => <StatusBadge status={String(v)} /> },
]

export default function DataTableShowcase() {
  return (
    <ShowcaseFrame
      title="Data Table"
      description="Sortable rows with status badges. Collapses to stacked cards on small screens."
      docPath="packages/ui-native/src/patterns/DataTable.tsx"
    >
      <Section title="Full table — sortable" hint="click header to sort">
        <DataTable columns={COLS} data={ROWS} />
      </Section>

      <Section title="Status badges">
        <DataTable columns={SIMPLE_COLS} data={ROWS.slice(0, 3)} />
      </Section>

      <Section title="With row press handler">
        <DataTable
          columns={SIMPLE_COLS}
          data={ROWS.slice(0, 3)}
          onRowPress={() => {}}
        />
      </Section>

      <Section title="Empty state">
        <DataTable columns={SIMPLE_COLS} data={[]} emptyMessage="No team members yet" />
      </Section>
    </ShowcaseFrame>
  )
}
