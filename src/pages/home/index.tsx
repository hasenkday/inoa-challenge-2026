import { useState } from 'react'

import { Download } from 'lucide-react'

import { getStocks } from '@/api/stocks'
import type { GetStocksParams, StockChartData } from '@/api/types'
import { Button } from '@/components/atoms/button'
import { DailyClosingChart } from '@/components/organisms/charts/daily-closing'
import { ChartSkeleton } from '@/components/organisms/filtered-content-states/chart-skeleton'
import { EmptyState } from '@/components/organisms/filtered-content-states/empty-state'
import { ErrorState } from '@/components/organisms/filtered-content-states/error-state'
import { SidePanel } from '@/components/organisms/side-panel'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import styles from './home.module.css'

export default function HomePage() {
  const [chartData, setChartData] = useState<StockChartData[]>([])
  const [selectedTickers, setSelectedTickers] = useState<string[]>([])
  const [warnings, setWarnings] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [contentError, setContentError] = useState<string | null>(null)

  const isEmpty = !isLoading && chartData.length === 0

  async function handleSubmit(filters: GetStocksParams) {
    try {
      setIsLoading(true)
      setError(null)
      setWarnings([])
      setContentError(null)

      const response = await getStocks(filters)

      setChartData(response.data)
      setSelectedTickers(filters.tickers)
      setWarnings(response.warnings ?? [])
      setContentError(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Não foi possível buscar os dados.'

      setContentError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.root}>
      <SidePanel onSubmit={handleSubmit} loading={isLoading} />

      <div id="filtered-content" className={styles.filteredContent}>
        <div className={styles.header}>
          <h1 className="text-h3 font-normal">Fechamento diário</h1>

          <Button variant="ghost" size="sm" className="font-medium" disabled={isEmpty || isLoading}>
            <Download />
            CSV
          </Button>
        </div>

        {warnings.length > 0 && (
          <div className="flex flex-col gap-2">
            {warnings.map((warning) => (
              <p key={warning} className="text-warning text-sm">
                {warning}
              </p>
            ))}
          </div>
        )}

        {error && <p className="text-error text-sm">{error}</p>}

        {isLoading ? (
          <ChartSkeleton />
        ) : (
          <>
            {!isEmpty && (
              <section className={styles.summaryGrid}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <Card key={index} className={styles.summaryCard}>
                    <CardHeader>
                      <CardTitle>Lorem Ipsum</CardTitle>
                      <CardDescription>Some description</CardDescription>
                    </CardHeader>

                    <CardContent>Lorem Ipsum is simply</CardContent>
                  </Card>
                ))}
              </section>
            )}

            <section className={styles.chartSection}>
              <Card className={styles.chartCard}>
                {!isEmpty && (
                  <CardHeader>
                    <CardTitle>Fechamento diário</CardTitle>
                    <CardDescription>
                      Evolução dos ativos selecionados no período consultado
                    </CardDescription>
                  </CardHeader>
                )}

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
            </section>
          </>
        )}
      </div>
    </div>
  )
}
