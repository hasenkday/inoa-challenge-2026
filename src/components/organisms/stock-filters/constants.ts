import { subMonths, subYears } from 'date-fns'

import type { CheckboxOption } from '@/components/atoms/checkbox-field/types'
import type { DateRangePreset } from '@/components/molecules/date-range-picker/date-range-picker.types'

export const stockOptions: CheckboxOption[] = [
  {
    value: 'VALE3',
    label: 'VALE3 (Vale)',
    color: 'chart-green',
  },
  {
    value: 'PETR4',
    label: 'PETR4 (Petrobras)',
    color: 'chart-yellow',
  },
]

export const stockPresets: DateRangePreset[] = [
  {
    label: '15 dias',
    getValue: () => ({
      from: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      to: new Date(),
    }),
  },
  {
    label: '1 mês',
    getValue: () => ({
      from: subMonths(new Date(), 1),
      to: new Date(),
    }),
  },
  {
    label: '3 meses',
    getValue: () => ({
      from: subMonths(new Date(), 3),
      to: new Date(),
    }),
  },
  {
    label: '6 meses',
    getValue: () => ({
      from: subMonths(new Date(), 6),
      to: new Date(),
    }),
  },
  {
    label: '1 ano',
    getValue: () => ({
      from: subYears(new Date(), 1),
      to: new Date(),
    }),
  },
  {
    label: '5 anos',
    getValue: () => ({
      from: subYears(new Date(), 5),
      to: new Date(),
    }),
  },
]
