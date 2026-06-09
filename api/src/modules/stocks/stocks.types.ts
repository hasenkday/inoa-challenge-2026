/**
 * Stock ticker single symbol (Examples: PETR4, VALE3).
 */
export type StockTicker = string

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
 * To know which warning type it return.
 */
export type GetStocksResult = {
  data: ChartPoint[]
  warnings: string[]
}
