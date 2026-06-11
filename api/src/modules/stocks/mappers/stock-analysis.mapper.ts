import type {
  ChartPoint,
  StockBehavior,
  StockComparison,
  StockPerformance,
  StockSimulation,
} from '../stocks.types'

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
  const values = chartData
    .map((point) => point[ticker])
    .filter((value): value is number => typeof value === 'number')

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
      initialValue: values.initialValue,
      finalValue: values.finalValue,
      variationPercent: calculateVariationPercent(values.initialValue, values.finalValue),
      behavior: calculateStockBehavior(chartData, ticker),
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

/**
 * Builds an investment simulation for a stock.
 */
export function buildStockSimulation(
  chartData: ChartPoint[],
  ticker: string,
  initialAmount = 1000
): StockSimulation | null {
  const values = getTickerPeriodValues(chartData, ticker)

  if (!values) {
    return null
  }

  const finalAmount = initialAmount * (values.finalValue / values.initialValue)

  return {
    ticker,
    initialAmount,
    finalAmount,
    profitOrLoss: finalAmount - initialAmount,
    variationPercent: calculateVariationPercent(values.initialValue, values.finalValue),
  }
}

/**
 * Calculates the predominant stock behavior
 * based on daily price movements in the selected period.
 */
export function calculateStockBehavior(chartData: ChartPoint[], ticker: string): StockBehavior {
  const values = getTickerValues(chartData, ticker)

  let upMovements = 0
  let downMovements = 0

  for (let index = 1; index < values.length; index++) {
    const previousValue = values[index - 1]
    const currentValue = values[index]

    if (currentValue > previousValue) {
      upMovements++
    }

    if (currentValue < previousValue) {
      downMovements++
    }
  }

  if (upMovements > downMovements) return 'predominantlyUp'
  if (downMovements > upMovements) return 'predominantlyDown'

  return 'sideways'
}

/**
 * Gets all numeric values for a ticker.
 */
function getTickerValues(chartData: ChartPoint[], ticker: string): number[] {
  const values: number[] = []

  for (const point of chartData) {
    const value = point[ticker]

    if (typeof value === 'number') {
      values.push(value)
    }
  }

  return values
}
