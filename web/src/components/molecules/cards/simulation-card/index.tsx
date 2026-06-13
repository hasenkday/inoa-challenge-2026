import { useState } from 'react'

import type { StocksSummary } from '@/api/types'
import { CurrencyInput } from '@/components/atoms/currency-input'
import { stocksStorage } from '@/components/organisms/stock-filters/storage'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn, formatCurrency } from '@/lib/utils'

import styles from '../card.module.css'

type SimulationCardProps = {
  simulation: StocksSummary['simulation']
}

function calculateSimulationAmount(initialAmount: number, finalAmount: number, amount: number) {
  return amount * (finalAmount / initialAmount)
}

function getSimulationClass(initialAmount: number, finalAmount: number) {
  if (finalAmount > initialAmount) return styles.positive
  if (finalAmount < initialAmount) return styles.negative

  return styles.neutral
}

export function SimulationCard({ simulation }: SimulationCardProps) {
  const [investmentAmount, setInvestmentAmount] = useState(() =>
    stocksStorage.getSimulationAmount()
  )

  const bestFinalAmount = calculateSimulationAmount(
    simulation.best.initialAmount,
    simulation.best.finalAmount,
    investmentAmount
  )

  const worstFinalAmount = calculateSimulationAmount(
    simulation.worst.initialAmount,
    simulation.worst.finalAmount,
    investmentAmount
  )

  return (
    <Card className={styles.cardRoot}>
      <CardHeader className={styles.cardHeader}>
        <CardTitle>Simulação</CardTitle>

        <CardDescription className="text-xs">
          Estima quanto o valor aplicado teria retornado ao comprar o ativo no início e vender ao
          final do período.
        </CardDescription>

        <div className="flex flex-col gap-1 pt-2">
          <label htmlFor="simulation-amount" className="text-foreground-muted text-xs font-medium">
            Valor investido
          </label>

          <CurrencyInput
            className="w-50 lg:w-full"
            value={investmentAmount}
            onValueChange={(value) => {
              setInvestmentAmount(value)
              stocksStorage.saveSimulationAmount(value)
            }}
          />
        </div>
      </CardHeader>

      <CardContent className={cn(styles.cardContent, 'flex flex-row lg:flex-col')}>
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-sm font-normal">
            {formatCurrency(investmentAmount)} em {simulation.best.ticker}
          </p>
          <span
            className={cn(
              'text-sm font-bold',
              getSimulationClass(investmentAmount, bestFinalAmount)
            )}
          >
            {formatCurrency(bestFinalAmount)}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <p className="text-sm font-normal">
            {formatCurrency(investmentAmount)} em {simulation.worst.ticker}
          </p>
          <span
            className={cn(
              'text-sm font-bold',
              getSimulationClass(investmentAmount, worstFinalAmount)
            )}
          >
            {formatCurrency(worstFinalAmount)}
          </span>
        </div>

        <span className="text-foreground-subtle text-xs">
          Não inclui dividendos, taxas, impostos ou reinvestimentos.
        </span>
      </CardContent>
    </Card>
  )
}
