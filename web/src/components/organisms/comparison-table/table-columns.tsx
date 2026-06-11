import { Info } from 'lucide-react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn, formatCurrency } from '@/lib/utils'

import styles from './comparison-table.module.css'
import { HeaderWithTooltip } from './table-header'
import type { ComparisonColumnDef } from './types'

const colorClass = {
  'chart-yellow': 'bg-chart-yellow',
  'chart-green': 'bg-chart-green',
}

export const TableColumns: ComparisonColumnDef[] = [
  {
    accessorKey: 'asset',
    header: 'Ativo',
    meta: {
      className: styles.assetColumn,
    },
    cell: ({ row }) => (
      <div className={styles.assetCell}>
        <span className={cn(styles.marker, colorClass[row.original.color])} />

        <span>{row.original.asset}</span>

        {(row.original.company || row.original.sector) && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className={styles.assetInfoIcon} />
              </TooltipTrigger>

              <TooltipContent>
                <div className="flex flex-col gap-1">
                  {row.original.company && <span>{row.original.company}</span>}
                  {row.original.sector && (
                    <span className="text-foreground-subtle">{row.original.sector}</span>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
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
    meta: {
      className: styles.initialColumn,
    },
    cell: ({ row }) => formatCurrency(row.original.initialPrice),
  },
  {
    accessorKey: 'finalPrice',
    header: () => (
      <>
        Preço final <span className="font-normal opacity-70">(dd/mm/aaaa)</span>
      </>
    ),
    meta: {
      className: styles.finalColumn,
    },
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
    meta: {
      className: styles.variationColumn,
    },
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
    meta: {
      className: styles.behaviorColumn,
    },
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
