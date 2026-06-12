import { useState } from 'react'

import { Download } from 'lucide-react'

import { getStocks } from '@/api/stocks'
import type { GetStocksParams, StockChartData, StocksPeriod } from '@/api/types'
import { Button } from '@/components/atoms/button'
import { SimulationCard } from '@/components/molecules/cards/simulation-card'
import { SimulationSkeleton } from '@/components/molecules/cards/simulation-card/skeleton'
import { SummaryCard } from '@/components/molecules/cards/summary-card'
import { SummarySkeleton } from '@/components/molecules/cards/summary-card/skeleton'
import { DailyClosingChart } from '@/components/organisms/charts/daily-closing'
import { DailyClosingChartSkeleton } from '@/components/organisms/charts/daily-closing/skeleton'
import { ComparisonTable } from '@/components/organisms/comparison-table'
import { ComparisonTableSkeleton } from '@/components/organisms/comparison-table/skeleton'
import { EmptyState } from '@/components/organisms/filtered-content-states/empty-state'
import { ErrorState } from '@/components/organisms/filtered-content-states/error-state'
import { SidePanel } from '@/components/organisms/side-panel'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { exportStocksToCsv } from '@/lib/export-csv'

import styles from './home.module.css'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [warnings, setWarnings] = useState<string[]>([])
  const [contentError, setContentError] = useState<string | null>(null)

  const [period, setPeriod] = useState<StocksPeriod | null>(null)
  const [selectedTickers, setSelectedTickers] = useState<string[]>([])

  const [chartData, setChartData] = useState<StockChartData[]>([])

  const isEmpty = !isLoading && chartData.length === 0

  async function handleSubmit(filters: GetStocksParams) {
    try {
      setIsLoading(true)
      setError(null)
      setWarnings([])
      setContentError(null)

      const response = await getStocks(filters)

      setPeriod(response.data.period)
      setSelectedTickers(filters.tickers)

      setChartData(response.data.chartData)

      setWarnings(response.warnings ?? [])
      setContentError(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Não foi possível buscar os dados.'

      setContentError(message)
      setPeriod(null)
    } finally {
      setIsLoading(false)
    }
  }

  function handleDownloadCsv() {
    exportStocksToCsv(chartData, selectedTickers)
  }

  return (
    <div className={styles.root}>
      <div>
        <SidePanel onSubmit={handleSubmit} loading={isLoading} />
      </div>

      <div id="filtered-content" className={styles.contentWrapper}>
        <div className={styles.contentHeader}>
          <h1 className="text-h3 font-medium">Fechamento diário</h1>
          <Button
            variant="ghost"
            size="sm"
            disabled={isEmpty || isLoading || !!contentError}
            onClick={handleDownloadCsv}
          >
            <Download className="size-4" />
            CSV
          </Button>
        </div>

        {/* TODO: test again... */}
        {warnings.length > 0 && (
          <div className="flex flex-col gap-2">
            {warnings.map((warning) => (
              <p key={warning} className="text-warning text-sm">
                {warning}
              </p>
            ))}
          </div>
        )}

        {/* TODO: test again... */}
        {error && <p className="text-error text-sm">{error}</p>}

        {/* TODO: refactor to one component */}
        {isLoading ? (
          <>
            <div className={styles.dashboard}>
              <Card className={styles.chartCard}>
                {!isEmpty && !contentError && !isLoading && (
                  <CardHeader className="flex-row items-center justify-between gap-4 space-y-0">
                    <CardTitle>Histórico de preços</CardTitle>
                  </CardHeader>
                )}

                <CardContent className={styles.chartContent}>
                  {isLoading ? (
                    <DailyClosingChartSkeleton />
                  ) : contentError ? (
                    <ErrorState message={contentError} />
                  ) : isEmpty ? (
                    <EmptyState />
                  ) : (
                    <DailyClosingChart data={chartData} tickers={selectedTickers} />
                  )}
                </CardContent>
              </Card>

              <div className="flex w-full flex-col gap-3 lg:w-[360px]">
                {isLoading ? (
                  <>
                    <SummarySkeleton />
                    <SimulationSkeleton />
                  </>
                ) : (
                  <>
                    <SummaryCard />
                    <SimulationCard />
                  </>
                )}
              </div>
            </div>

            {isLoading ? <ComparisonTableSkeleton /> : <ComparisonTable />}
          </>
        ) : (
          <>
            <div className={styles.dashboard}>
              <Card className={styles.chartCard}>
                {!isEmpty && (
                  <CardHeader className="flex-row items-center justify-between gap-4 space-y-0">
                    <CardTitle>Histórico de preços</CardTitle>
                  </CardHeader>
                )}{' '}
                <CardContent className={styles.chartContent}>
                  {contentError ? (
                    <ErrorState message={contentError} />
                  ) : isEmpty ? (
                    <EmptyState />
                  ) : (
                    <DailyClosingChart data={chartData} tickers={selectedTickers} />
                  )}
                </CardContent>
              </Card>

              <div className="flex w-full flex-col gap-3 lg:w-[360px]">
                <SummaryCard />
                <SimulationCard />
              </div>
            </div>
            <ComparisonTable />
          </>
        )}
      </div>
    </div>
  )
}
