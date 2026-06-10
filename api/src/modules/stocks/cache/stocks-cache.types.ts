export type StockPriceRow = {
  ticker: string
  date: string
  close: number
}

export type StockCatalogRow = {
  ticker: string
  name: string
  sector: string | null
  is_available: number
  updated_at: string
}
