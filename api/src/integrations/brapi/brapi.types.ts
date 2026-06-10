/**
 * Single historical price item returned by brapi.
 */
export type BrapiHistoricalPrice = {
  date: number
  close: number
}

/**
 * Stock quote result returned by brapi.
 */
export type BrapiQuoteResult = {
  symbol: string
  historicalDataPrice?: BrapiHistoricalPrice[]
}

/**
 * Root response returned by brapi quote endpoint.
 */
export type BrapiQuoteResponse = {
  results: BrapiQuoteResult[]
}

/**
 * Response returned by brapi.
 */
export type BrapiStockListItem = {
  stock: string
  name?: string
  sector?: string
}

/**
 * Root list response returned by brapi quote endpoint.
 */
export type BrapiStockListResponse = {
  stocks?: BrapiStockListItem[]
}
