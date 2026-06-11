/**
 * Stock ticker single symbol (Examples: PETR4, VALE3, etc).
 */
export type StockTicker = string

/**
 * Selected period info.
 */
export type StocksPeriod = {
  initial: string
  final: string
}

/**
 * A single point in the chart dataset.
 */
export type ChartPoint = {
  date: string
  [ticker: string]: string | number
}

/**
 * Internal parameters used by the StocksService.
 * Converts tickers list into array.
 */
export type GetStocksParams = {
  tickers: StockTicker[]
  startDate: string
  endDate: string
}

/**
 * Stock price behavior during the period.
 */
export type StockBehavior = 'predominantlyUp' | 'predominantlyDown' | 'sideways'

/**
 * Stock comparison info for the table.
 */
export type StockComparison = {
  ticker: string
  initialValue: number
  finalValue: number
  variationPercent: number
  behavior: StockBehavior
}

/**
 * Stock performance for the summary.
 */
export type StockPerformance = {
  ticker: string
  variationPercent: number
}

/**
 * Investment simulation for the summary.
 */
export type StockSimulation = {
  ticker: string
  initialAmount: number
  finalAmount: number
  profitOrLoss: number
  variationPercent: number
}

/**
 * Summary info for the selected period.
 * Uses Performance and Simulation data to build.
 */
export type StocksSummary = {
  bestPerformance: StockPerformance | null
  worstPerformance: StockPerformance | null
  simulation: {
    best: StockSimulation | null
    worst: StockSimulation | null
  }
}

/**
 * Response data with the warning type if exists.
 * Returns data to build:
 * - the main chart,
 * - the comparison table,
 * - and the period summary containing the simulation and the performances.
 */
export type GetStocksResult = {
  period: StocksPeriod
  chartData: ChartPoint[]
  comparison: StockComparison[]
  summary: StocksSummary
  warnings: string[]
}

/**
 * Stock search parameters.
 */
export type SearchStocksParams = {
  query: string
}
