import { subMonths, subYears } from 'date-fns'

import type { CheckboxOption } from '@/components/atoms/checkbox-field/types'
import type { DateRangePreset } from '@/components/molecules/date-range-picker/date-range-picker.types'
import type { SearchPopoverOption } from '@/components/molecules/search-popover/types'

export const stockSearchOptions: SearchPopoverOption[] = [
  {
    value: 'PETR4',
    label: 'Petrobras',
    description: 'Petróleo e Gás',
    metadata: {
      color: 'chart-yellow',
    },
  },
  {
    value: 'VALE3',
    label: 'Vale',
    description: 'Mineração',
    metadata: {
      color: 'chart-green',
    },
  },
  {
    value: 'ITUB4',
    label: 'Banco Itaú',
    description: 'Instituição Financeira',
    metadata: {
      color: 'chart-blue',
    },
  },
  {
    value: 'AMBEV3',
    label: 'Ambev',
    description: 'Bebidas',
    metadata: {
      color: 'chart-orange',
    },
  },
  {
    value: 'BPAC11',
    label: 'BTG Pactual',
    description: 'Banco de Investimentos',
    metadata: {
      color: 'chart-purple',
    },
  },
]

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
