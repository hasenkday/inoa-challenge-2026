import type { StocksSummary } from '@/api/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn, formatCurrency } from '@/lib/utils'

import styles from '../card.module.css'

type SimulationCardProps = {
  simulation: StocksSummary['simulation']
}

export function SimulationCard({ simulation }: SimulationCardProps) {
  return (
    <Card className={styles.cardRoot}>
      <CardHeader className={styles.cardHeader}>
        <CardTitle>Simulação</CardTitle>
        <CardDescription className="text-xs">
          Compare quanto cada ativo teria rendido ao investir no início do período.
        </CardDescription>
      </CardHeader>

      <CardContent className={cn(styles.cardContent, 'flex flex-row lg:flex-col')}>
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-sm font-normal">R$ 1.000 em {simulation.best.ticker}</p>
          <span className="text-foreground-success text-sm font-bold">
            {formatCurrency(simulation.best.finalAmount)}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <p className="text-sm font-normal">R$ 1.000 em {simulation.worst.ticker}</p>
          <span className="text-foreground-error text-sm font-bold">
            {formatCurrency(simulation.worst.finalAmount)}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
