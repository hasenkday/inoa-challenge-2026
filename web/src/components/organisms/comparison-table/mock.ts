import type { ComparisonTableRow } from './types'

export const comparisonTableMock: ComparisonTableRow[] = [
  {
    asset: 'VALE3',
    company: 'Vale',
    sector: 'Mineração e Siderurgia',
    color: 'chart-green',
    initialPrice: 80.3,
    finalPrice: 70.3,
    variation: -3.18,
    behavior: '↘ Predominância de baixa',
  },
  {
    asset: 'PETR4',
    company: 'Petrobras',
    sector: 'Petróleo e Gás',
    color: 'chart-yellow',
    initialPrice: 40.75,
    finalPrice: 44.75,
    variation: 8.42,
    behavior: '↗ Predominância de alta',
  },
]
