import type { DateRange } from 'react-day-picker'

import type { StocksResult } from '@/api/types'
import type { CheckboxOption } from '@/components/atoms/checkbox-field/types'

const STOCK_OPTIONS_KEY = 'stock-options'
const SELECTED_TICKERS_KEY = 'selected-tickers'
const DATE_RANGE_KEY = 'date-range'
const STOCKS_RESULT_KEY = 'stocks-result'

export const stocksStorage = {
  // checkbox options -----------------------------------------------------
  getOptions(): CheckboxOption[] {
    return JSON.parse(localStorage.getItem(STOCK_OPTIONS_KEY) ?? '[]')
  },

  saveOptions(options: CheckboxOption[]) {
    localStorage.setItem(STOCK_OPTIONS_KEY, JSON.stringify(options))
  },

  // selected options -----------------------------------------------------
  getSelectedTickers(): string[] {
    return JSON.parse(localStorage.getItem(SELECTED_TICKERS_KEY) ?? '[]')
  },

  saveSelectedTickers(tickers: string[]) {
    localStorage.setItem(SELECTED_TICKERS_KEY, JSON.stringify(tickers))
  },

  // selected period ------------------------------------------------------
  getDateRange(): DateRange | undefined {
    const stored = localStorage.getItem(DATE_RANGE_KEY)

    if (!stored) return undefined

    const dateRange = JSON.parse(stored)

    return {
      from: dateRange.from ? new Date(dateRange.from) : undefined,
      to: dateRange.to ? new Date(dateRange.to) : undefined,
    }
  },

  saveDateRange(dateRange: DateRange | undefined) {
    if (!dateRange) {
      localStorage.removeItem(DATE_RANGE_KEY)
      return
    }

    localStorage.setItem(
      DATE_RANGE_KEY,
      JSON.stringify({
        from: dateRange.from?.toISOString(),
        to: dateRange.to?.toISOString(),
      })
    )
  },

  // Save/recovery result in localstorage (for the metrics cards)
  getStocksResult(): StocksResult | null {
    const stored = localStorage.getItem(STOCKS_RESULT_KEY)

    if (!stored) return null

    return JSON.parse(stored)
  },

  saveStocksResult(result: StocksResult) {
    localStorage.setItem(STOCKS_RESULT_KEY, JSON.stringify(result))
  },

  clearStocksResult() {
    localStorage.removeItem(STOCKS_RESULT_KEY)
  },
}
