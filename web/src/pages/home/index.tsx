import { useState } from 'react'

import { Download } from 'lucide-react'

import { getStocks } from '@/api/stocks'
import type { GetStocksParams, StocksResult } from '@/api/types'
import { Button } from '@/components/atoms/button'
import { SimulationCard } from '@/components/molecules/cards/simulation-card'
import { SimulationSkeleton } from '@/components/molecules/cards/simulation-card/skeleton'
import { SummaryCard } from '@/components/molecules/cards/summary-card'
import { SummarySkeleton } from '@/components/molecules/cards/summary-card/skeleton'
import { DailyClosingChart } from '@/components/organisms/charts/daily-closing'
import { DailyClosingChartSkeleton } from '@/components/organisms/charts/daily-closing/skeleton'
import { ComparisonTable } from '@/components/organisms/comparison-table'
import { mapComparisonToTableRows } from '@/components/organisms/comparison-table/functions'
import { ComparisonTableSkeleton } from '@/components/organisms/comparison-table/skeleton'
import { EmptyState } from '@/components/organisms/filtered-content-states/empty-state'
import { ErrorState } from '@/components/organisms/filtered-content-states/error-state'
import { SidePanel } from '@/components/organisms/side-panel'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { exportStocksToCsv } from '@/lib/export-csv'

import styles from './home.module.css'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [warnings, setWarnings] = useState<string[]>([])
  const [contentError, setContentError] = useState<string | null>(null)

  const [stocksResult, setStocksResult] = useState<StocksResult | null>(null)
  const [selectedTickers, setSelectedTickers] = useState<string[]>([])

  const isEmpty = !isLoading && !stocksResult
  const hasResult = !!stocksResult
  const canShowResult = hasResult && !isLoading && !contentError

  const feedbackContent = {
    variant: 'warning' as const,
    title: 'Consulta parcial',
    description: warnings.join(' '),
  }
  const feedback = warnings.length > 0 ? feedbackContent : null

  async function handleSubmit(filters: GetStocksParams) {
    try {
      setIsLoading(true)
      setWarnings([])
      setContentError(null)

      const response = await getStocks(filters)

      setStocksResult(response.data)
      setSelectedTickers(filters.tickers)
      setWarnings(response.warnings ?? [])
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Não foi possível buscar os dados.'

      setStocksResult(null)
      setWarnings([])
      setContentError(message)
    } finally {
      setIsLoading(false)
    }
  }

  function handleDownloadCsv() {
    if (!stocksResult) return

    exportStocksToCsv(stocksResult.chartData, selectedTickers)
  }

  return (
    <div className={styles.root}>
      <div>
        <SidePanel onSubmit={handleSubmit} loading={isLoading} feedback={feedback} />
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

        {isLoading ? (
          <>
            <div className={styles.dashboard}>
              <Card className={styles.chartCard}>
                <CardContent className={styles.chartContent}>
                  <DailyClosingChartSkeleton />
                </CardContent>
              </Card>

              <div className="flex w-full flex-col gap-3 lg:w-[360px]">
                <SummarySkeleton />
                <SimulationSkeleton />
              </div>
            </div>

            <ComparisonTableSkeleton />
          </>
        ) : (
          <>
            <div className={styles.dashboard}>
              <Card className={styles.chartCard}>
                {canShowResult && (
                  <CardHeader className="flex-row items-center justify-between gap-4 space-y-0">
                    <CardTitle>Histórico de preços</CardTitle>
                  </CardHeader>
                )}

                <CardContent className={styles.chartContent}>
                  {contentError ? (
                    <ErrorState message={contentError} />
                  ) : isEmpty ? (
                    <EmptyState />
                  ) : stocksResult ? (
                    <DailyClosingChart data={stocksResult.chartData} tickers={selectedTickers} />
                  ) : null}
                </CardContent>
              </Card>

              {stocksResult && (
                <div className="flex w-full flex-col gap-3 lg:w-[360px]">
                  <SummaryCard summary={stocksResult.summary} period={stocksResult.period} />

                  <SimulationCard simulation={stocksResult.summary.simulation} />
                </div>
              )}
            </div>

            {stocksResult && (
              <ComparisonTable data={mapComparisonToTableRows(stocksResult.comparison)} />
            )}
          </>
        )}
      </div>
    </div>
  )
}
