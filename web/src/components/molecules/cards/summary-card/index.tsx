import type { StocksPeriod, StocksSummary } from '@/api/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

import styles from '../card.module.css'

type SummaryCardProps = {
  summary: StocksSummary
  period: StocksPeriod
}

export function SummaryCard({ summary, period }: SummaryCardProps) {
  return (
    <Card className={styles.cardRoot}>
      <CardHeader className={styles.cardHeader}>
        <CardTitle>Resumo do período</CardTitle>
        <CardDescription className="text-xs">
          {new Date(period.initial).toLocaleDateString('pt-BR')} até{' '}
          {new Date(period.final).toLocaleDateString('pt-BR')}
        </CardDescription>
      </CardHeader>

      <CardContent className={cn(styles.cardContent, 'flex flex-row lg:flex-col')}>
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-xs font-normal">Melhor desempenho</p>
          <div className="flex flex-row items-baseline gap-4">
            <span className="text-lg font-medium">{summary.bestPerformance.ticker}</span>
            <span className="text-foreground-success text-sm font-bold">
              +{summary.bestPerformance.variationPercent.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <p className="text-xs font-normal">Menor desempenho</p>
          <div className="flex flex-row items-baseline gap-4">
            <span className="text-lg font-medium">{summary.worstPerformance.ticker}</span>
            <span className="text-foreground-error text-sm font-bold">
              {summary.worstPerformance.variationPercent.toFixed(2)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
