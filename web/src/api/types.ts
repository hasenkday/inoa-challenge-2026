export type StockChartData = {
  date: string
  [ticker: string]: string | number
}

export type StocksPeriod = {
  initial: string
  final: string
}

export type StockBehavior = 'predominantlyUp' | 'predominantlyDown' | 'sideways'

export type StockComparisonItem = {
  ticker: string
  initialValue: number
  finalValue: number
  variationPercent: number
  behavior: StockBehavior
}

export type StockPerformance = {
  ticker: string
  variationPercent: number
}

export type StockSimulation = {
  ticker: string
  initialAmount: number
  finalAmount: number
  profitOrLoss: number
  variationPercent: number
}

export type StocksSummary = {
  bestPerformance: StockPerformance
  worstPerformance: StockPerformance
  simulation: {
    best: StockSimulation
    worst: StockSimulation
  }
}

// Request/response types -------------------------

export type GetStocksParams = {
  tickers: string[]
  startDate: string
  endDate: string
}

export type StocksResult = {
  period: StocksPeriod
  chartData: StockChartData[]
  comparison: StockComparisonItem[]
  summary: StocksSummary
}

export type GetStocksResponse = {
  message: string
  data: StocksResult
  warnings?: string[]
}

export type StockSearchItem = {
  ticker: string
  name: string
  sector: string
  is_available: number
  updated_at: string
}

export type SearchStocksResponse = {
  message: string
  data: StockSearchItem[]
}

// API error response -----------------------------

export type ApiErrorResponse = {
  message: string
  statusCode?: number
}
