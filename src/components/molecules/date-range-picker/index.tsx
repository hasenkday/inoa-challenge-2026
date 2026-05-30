import * as React from 'react'

import { addDays, format, subDays, subMonths } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import type { DateRange } from 'react-day-picker'

import { Button } from '@/components/atoms/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

import styles from './date-range-picker.module.css'
import type { DateRangePreset, DateRangePickerProps } from './date-range-picker.types'

const defaultPresets: DateRangePreset[] = [
  {
    label: 'Últimos 15 dias',
    getValue: () => ({
      from: subDays(new Date(), 15),
      to: new Date(),
    }),
  },
  {
    label: 'Um mês atrás',
    getValue: () => ({
      from: subMonths(new Date(), 1),
      to: new Date(),
    }),
  },
]

export function DateRangePicker({
  label = 'Período',
  placeholder = 'Selecione um período',
  presets = defaultPresets,
  className,
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 0, 1),
    to: addDays(new Date(2024, 0, 1), 20),
  })

  const [startMonth, setStartMonth] = React.useState(new Date(2024, 0, 1))
  const [endMonth, setEndMonth] = React.useState(addDays(new Date(2024, 0, 1), 20))

  const dateLabel = React.useMemo(() => {
    if (!date?.from) return placeholder
    if (!date.to) return format(date.from, 'dd/MM/yyyy')

    return `${format(date.from, 'dd/MM/yyyy')} — ${format(date.to, 'dd/MM/yyyy')}`
  }, [date, placeholder])

  function handlePresetClick(preset: DateRangePreset) {
    const nextDate = preset.getValue()

    setDate(nextDate)

    if (nextDate.from) {
      setStartMonth(nextDate.from)
    }

    if (nextDate.to) {
      setEndMonth(nextDate.to)
    }
  }

  function handleRangeSelect(nextDate: DateRange | undefined) {
    setDate(nextDate)

    if (nextDate?.from) {
      setStartMonth(nextDate.from)
    }

    if (nextDate?.to) {
      setEndMonth(nextDate.to)
    }
  }

  return (
    <div className={cn(styles.root, className)}>
      {label && <span className={styles.label}>{label}</span>}

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className={styles.trigger}>
            <CalendarIcon size={18} className={styles.icon} />
            <span className={cn(styles.value, !date?.from && styles.placeholder)}>{dateLabel}</span>
          </Button>
        </PopoverTrigger>

        <PopoverContent className={styles.content} align="start">
          <aside className={styles.presets}>
            {presets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                className={styles.preset}
                onClick={() => handlePresetClick(preset)}
              >
                {preset.label}
              </button>
            ))}
          </aside>

          <div className={styles.calendars}>
            <Calendar
              mode="range"
              captionLayout="dropdown"
              month={startMonth}
              onMonthChange={setStartMonth}
              selected={date}
              onSelect={handleRangeSelect}
              numberOfMonths={1}
              startMonth={new Date(2010, 0)}
              endMonth={new Date()}
            />

            <Calendar
              mode="range"
              captionLayout="dropdown"
              month={endMonth}
              onMonthChange={setEndMonth}
              selected={date}
              onSelect={handleRangeSelect}
              numberOfMonths={1}
              startMonth={new Date(2010, 0)}
              endMonth={new Date()}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
