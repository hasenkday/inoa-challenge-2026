import { StockPriceRow } from '../cache/stocks-cache.types'
import { ChartPoint } from '../stocks.types'

export function mapChartDataToRows(chartData: ChartPoint[], ticker: string): StockPriceRow[] {
  return chartData
    .filter((point) => typeof point[ticker] === 'number')
    .map((point) => ({
      ticker,
      date: point.date,
      close: point[ticker] as number,
    }))
}
