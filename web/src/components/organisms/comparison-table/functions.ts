import type { StockComparisonItem } from '@/api/types'
import { getStockColor } from '@/lib/stock-colors'

import type { ComparisonTableRow } from './types'

export function mapComparisonToTableRows(comparison: StockComparisonItem[]): ComparisonTableRow[] {
  return comparison.map((item, index) => ({
    asset: item.ticker,
    color: getStockColor(index),
    initialPrice: item.initialValue,
    finalPrice: item.finalValue,
    variation: item.variationPercent,
    behavior: item.behavior,
  }))
}
