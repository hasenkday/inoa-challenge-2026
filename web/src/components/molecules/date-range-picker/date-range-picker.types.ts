import type { DateRange } from 'react-day-picker'

export type DateRangePreset = {
  label: string
  getValue: () => DateRange
}

export type DateRangePickerProps = {
  label?: string
  placeholder?: string
  presets?: DateRangePreset[]
  className?: string
  value?: DateRange
  onValueChange?: (value: DateRange | undefined) => void
}
