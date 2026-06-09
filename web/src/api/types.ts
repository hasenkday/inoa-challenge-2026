export type StockChartData = {
  date: string
  [ticker: string]: string | number
}

export type GetStocksParams = {
  tickers: string[]
  startDate: string
  endDate: string
}

export type GetStocksResponse = {
  message: string
  data: StockChartData[]
  warnings?: string[]
}
