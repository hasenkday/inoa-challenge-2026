import type { CheckboxOption } from '@/components/atoms/checkbox-field/types'

export const STOCK_COLORS: NonNullable<CheckboxOption['color']>[] = [
  'chart-green',
  'chart-yellow',
  'chart-blue',
  'chart-orange',
  'chart-purple',
  'chart-pink',
  'chart-red',
]

export function getStockColor(index: number) {
  return STOCK_COLORS[index % STOCK_COLORS.length]
}

export function getStockColorVar(index: number) {
  return `var(--color-${getStockColor(index)})`
}

export function getStockColorVarByTicker(ticker: string, tickers: string[]) {
  const index = tickers.indexOf(ticker)

  return getStockColorVar(index >= 0 ? index : 0)
}
