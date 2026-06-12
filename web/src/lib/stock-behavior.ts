import type { StockBehavior } from '@/api/types'

export const STOCK_BEHAVIOR_LABEL: Record<StockBehavior, string> = {
  predominantlyUp: '↗ Mais dias de alta',
  predominantlyDown: '↘ Mais dias de baixa',
  sideways: '→ Oscilação equilibrada',
}

export function getStockBehaviorLabel(behavior: StockBehavior) {
  return STOCK_BEHAVIOR_LABEL[behavior]
}
