import type { StockComparisonItem } from '@/api/types'
import { getStockColor } from '@/lib/stock-colors'

import type { AssetBehavior, ComparisonTableRow } from './types'

function getBehaviorLabel(behavior: StockComparisonItem['behavior']): AssetBehavior {
  const behaviorMap = {
    predominantlyUp: '↗ Predominância de alta',
    predominantlyDown: '↘ Predominância de baixa',
    sideways: '→ Oscilação lateral',
  } as const

  return behaviorMap[behavior]
}

export function mapComparisonToTableRows(comparison: StockComparisonItem[]): ComparisonTableRow[] {
  return comparison.map((item, index) => ({
    asset: item.ticker,
    color: getStockColor(index),
    initialPrice: item.initialValue,
    finalPrice: item.finalValue,
    variation: item.variationPercent,
    behavior: getBehaviorLabel(item.behavior),
  }))
}
