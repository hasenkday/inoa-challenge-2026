import type { StocksResult } from '@/api/types'
import { SimulationCard } from '@/components/molecules/cards/simulation-card'
import { SummaryCard } from '@/components/molecules/cards/summary-card'
import { DailyClosingChart } from '@/components/organisms/charts/daily-closing'
import { ComparisonTable } from '@/components/organisms/comparison-table'
import { mapComparisonToTableRows } from '@/components/organisms/comparison-table/functions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import styles from '@/pages/home/home.module.css'

type SuccessStateProps = {
  result: StocksResult
  selectedTickers: string[]
}

export function SuccessState({ result, selectedTickers }: SuccessStateProps) {
  return (
    <>
      <div className={styles.dashboard}>
        <Card className={styles.chartCard}>
          <CardHeader className="flex-row items-center justify-between gap-4 space-y-0">
            <CardTitle>Histórico de preços</CardTitle>
          </CardHeader>

          <CardContent className={styles.chartContent}>
            <DailyClosingChart data={result.chartData} tickers={selectedTickers} />
          </CardContent>
        </Card>

        <div className="flex w-full flex-col gap-3 lg:w-[360px]">
          <SummaryCard summary={result.summary} period={result.period} />
          <SimulationCard simulation={result.summary.simulation} />
        </div>
      </div>

      <ComparisonTable
        data={mapComparisonToTableRows(result.comparison)}
        total={result.comparison.length}
      />
    </>
  )
}
