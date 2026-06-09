import type { ChartPoint, StockComparison, StockPerformance } from '../stocks.types'

/**
 * Calculates the stock return percentage between
 * the first and last price of the selected period.
 */
export function calculateVariationPercent(initialValue: number, finalValue: number): number {
  return ((finalValue - initialValue) / initialValue) * 100
}

/**
 * Gets first and last value for a ticker.
 */
function getTickerPeriodValues(
  chartData: ChartPoint[],
  ticker: string
): { initialValue: number; finalValue: number } | null {
  console.time('Run_the_chart_data_and_find_fisrt_and_last_values')
  const values = chartData
    .map((point) => point[ticker])
    .filter((value): value is number => typeof value === 'number')
  console.timeEnd('Run_the_chart_data_and_find_fisrt_and_last_values')

  if (values.length < 2) return null

  return {
    initialValue: values[0],
    finalValue: values[values.length - 1],
  }
}

/**
 * Builds stock comparison data.
 */
export function buildStockComparison(
  chartData: ChartPoint[],
  tickers: string[]
): StockComparison[] {
  const comparison: StockComparison[] = []

  for (const ticker of tickers) {
    const values = getTickerPeriodValues(chartData, ticker)

    if (!values) continue

    comparison.push({
      ticker,
      currentValue: values.finalValue,
      variationPercent: calculateVariationPercent(values.initialValue, values.finalValue),
      behavior: 'sideways',
    })
  }

  return comparison
}

/**
 * Finds the stock with the highest variation percentage.
 */
export function findBestPerformance(comparison: StockComparison[]): StockPerformance | null {
  if (!comparison.length) return null

  const best = comparison.reduce((currentBest, item) =>
    item.variationPercent > currentBest.variationPercent ? item : currentBest
  )

  return {
    ticker: best.ticker,
    variationPercent: best.variationPercent,
  }
}

/**
 * Finds the stock with the lowest variation percentage.
 */
export function findWorstPerformance(comparison: StockComparison[]): StockPerformance | null {
  if (!comparison.length) return null

  const worst = comparison.reduce((currentWorst, item) =>
    item.variationPercent < currentWorst.variationPercent ? item : currentWorst
  )

  return {
    ticker: worst.ticker,
    variationPercent: worst.variationPercent,
  }
}

// TODO: simulation, behavior
