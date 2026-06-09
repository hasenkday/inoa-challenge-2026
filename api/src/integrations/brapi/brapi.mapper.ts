import type { ChartPoint } from '@/modules/stocks/stocks.types'

import type { BrapiQuoteResult } from './brapi.types'

export function mapBrapiToChartData(results: BrapiQuoteResult[]): ChartPoint[] {
  const chartMap = new Map<string, ChartPoint>()

  for (const stock of results) {
    const ticker = stock.symbol

    for (const price of stock.historicalDataPrice ?? []) {
      const date = new Date(price.date * 1000).toISOString().split('T')[0]

      if (!chartMap.has(date)) {
        chartMap.set(date, {
          date,
        })
      }

      chartMap.get(date)![ticker] = price.close
    }
  }

  return Array.from(chartMap.values()).sort((a, b) => a.date.localeCompare(b.date))
}
