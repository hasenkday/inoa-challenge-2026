import type { DateRange } from 'react-day-picker'

export type FilterPanelProps = {
  className?: string
}

export type DateRangePreset = {
  label: string
  getValue: () => DateRange
}
