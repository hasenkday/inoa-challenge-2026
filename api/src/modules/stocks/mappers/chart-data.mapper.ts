import { StockPriceRow } from '../cache/stocks-cache.types'
import { ChartPoint } from '../stocks.types'

export function mapCachedRowsToChartData(rows: StockPriceRow[]): ChartPoint[] {
  const chartMap = new Map<string, ChartPoint>()

  for (const row of rows) {
    if (!chartMap.has(row.date)) {
      chartMap.set(row.date, {
        date: row.date,
      })
    }

    chartMap.get(row.date)![row.ticker] = row.close
  }

  return Array.from(chartMap.values()).sort((a, b) => a.date.localeCompare(b.date))
}
