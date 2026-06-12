import { useState } from 'react'

import { Download } from 'lucide-react'

import { getStocks } from '@/api/stocks'
import type { GetStocksParams, StocksResult } from '@/api/types'
import { Button } from '@/components/atoms/button'
import { EmptyState } from '@/components/organisms/filtered-content-states/empty-state'
import { ErrorState } from '@/components/organisms/filtered-content-states/error-state'
import { LoadingState } from '@/components/organisms/filtered-content-states/loading-state'
import { SuccessState } from '@/components/organisms/filtered-content-states/success-state'
import { SidePanel } from '@/components/organisms/side-panel'
import { stocksStorage } from '@/components/organisms/stock-filters/storage'
import { exportStocksToCsv } from '@/lib/export-csv'

import styles from './home.module.css'

export default function HomePage() {
  const [stocksResult, setStocksResult] = useState<StocksResult | null>(() =>
    stocksStorage.getStocksResult()
  )
  const [selectedTickers, setSelectedTickers] = useState<string[]>(() =>
    stocksStorage.getSelectedTickers()
  )

  const [isLoading, setIsLoading] = useState(false)
  const [warnings, setWarnings] = useState<string[]>([])
  const [contentError, setContentError] = useState<string | null>(null)
  const isEmpty = !isLoading && !stocksResult

  const feedbackContent = {
    variant: 'warning' as const,
    title: `Consulta parcial (${warnings.length})`,
    description: warnings.join(' • '),
  }
  const feedback = warnings.length > 0 ? feedbackContent : null

  async function handleSubmit(filters: GetStocksParams) {
    try {
      setIsLoading(true)
      setWarnings([])
      setContentError(null)

      const response = await getStocks(filters)

      setStocksResult(response.data)
      stocksStorage.saveStocksResult(response.data)
      setSelectedTickers(filters.tickers)
      setWarnings(response.warnings ?? [])
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Não foi possível buscar os dados.'

      setStocksResult(null)
      stocksStorage.clearStocksResult()
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

  function handleClearResult() {
    setStocksResult(null)
    setSelectedTickers([])
    setWarnings([])
    setContentError(null)
  }

  return (
    <div className={styles.root}>
      <div>
        <SidePanel
          onSubmit={handleSubmit}
          onClearResult={handleClearResult}
          loading={isLoading}
          feedback={feedback}
        />
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
          <LoadingState />
        ) : contentError ? (
          <ErrorState message={contentError} />
        ) : !stocksResult ? (
          <EmptyState />
        ) : (
          <SuccessState result={stocksResult} selectedTickers={selectedTickers} />
        )}
      </div>
    </div>
  )
}
