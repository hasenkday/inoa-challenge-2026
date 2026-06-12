import type { StocksSummary } from '@/api/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn, formatCurrency } from '@/lib/utils'

import styles from '../card.module.css'

type SimulationCardProps = {
  simulation: StocksSummary['simulation']
}

export function SimulationCard({ simulation }: SimulationCardProps) {
  const simulationAmount = 1000

  function getSimulationClass(finalAmount: number) {
    if (finalAmount > simulationAmount) return styles.positive
    if (finalAmount < simulationAmount) return styles.negative

    return styles.neutral
  }

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
          <span
            className={cn('text-sm font-bold', getSimulationClass(simulation.best.finalAmount))}
          >
            {formatCurrency(simulation.best.finalAmount)}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <p className="text-sm font-normal">R$ 1.000 em {simulation.worst.ticker}</p>
          <span
            className={cn('text-sm font-bold', getSimulationClass(simulation.worst.finalAmount))}
          >
            {formatCurrency(simulation.worst.finalAmount)}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
