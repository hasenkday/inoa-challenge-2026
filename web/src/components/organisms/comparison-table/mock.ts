import type { ComparisonTableRow } from './types'

export const comparisonTableMock: ComparisonTableRow[] = [
  {
    asset: 'VALE3',
    color: 'chart-green',
    initialPrice: 80.3,
    finalPrice: 70.3,
    variation: -3.18,
    behavior: '↘ Predominância de baixa',
  },
  {
    asset: 'PETR4',
    color: 'chart-yellow',
    initialPrice: 40.75,
    finalPrice: 44.75,
    variation: 8.42,
    behavior: '↗ Predominância de alta',
  },
]
