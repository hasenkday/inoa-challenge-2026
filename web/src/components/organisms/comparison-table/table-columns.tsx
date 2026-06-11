import { type ColumnDef } from '@tanstack/react-table'

import { cn, formatCurrency } from '@/lib/utils'

import styles from './comparison-table.module.css'
import { HeaderWithTooltip } from './table-header'
import type { ComparisonTableRow } from './types'

const colorClass = {
  'chart-yellow': 'bg-chart-yellow',
  'chart-green': 'bg-chart-green',
}

export const TableColumns: ColumnDef<ComparisonTableRow>[] = [
  {
    accessorKey: 'asset',
    header: 'Ativo',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <span className={cn(styles.marker, colorClass[row.original.color])} />
        <span>{row.original.asset}</span>
      </div>
    ),
  },
  {
    accessorKey: 'initialPrice',
    header: () => (
      <>
        Preço inicial <span className="font-normal opacity-70">(dd/mm/aaaa)</span>
      </>
    ),
    cell: ({ row }) => formatCurrency(row.original.initialPrice),
  },
  {
    accessorKey: 'finalPrice',
    header: () => (
      <>
        Preço final <span className="font-normal opacity-70">(dd/mm/aaaa)</span>
      </>
    ),
    cell: ({ row }) => formatCurrency(row.original.finalPrice),
  },
  {
    accessorKey: 'variation',
    header: () => (
      <HeaderWithTooltip
        label="Variação"
        tooltip="Diferença percentual entre o primeiro e o último fechamento do período."
      />
    ),
    cell: ({ row }) => {
      const value = row.original.variation

      return (
        <span
          className={cn(
            value > 0 && styles.positive,
            value < 0 && styles.negative,
            value === 0 && styles.neutral
          )}
        >
          {value > 0 ? '+' : ''}
          {value.toFixed(2)}%
        </span>
      )
    },
  },
  {
    accessorKey: 'behavior',
    header: () => (
      <HeaderWithTooltip
        label="Comportamento"
        tooltip="Classificação simples baseada na variação do ativo no período."
      />
    ),
    cell: ({ row }) => (
      <span
        className={cn(
          row.original.behavior === '↗ Predominância de alta' && styles.positive,
          row.original.behavior === '↘ Predominância de baixa' && styles.negative,
          row.original.behavior === '→ Oscilação lateral' && styles.neutral
        )}
      >
        {row.original.behavior}
      </span>
    ),
  },
]
