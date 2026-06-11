export type AssetBehavior =
  | '↗ Predominância de alta'
  | '↘ Predominância de baixa'
  | '→ Oscilação lateral'

export type ComparisonTableRow = {
  asset: string
  color: 'chart-yellow' | 'chart-green'
  initialPrice: number
  finalPrice: number
  variation: number
  behavior: AssetBehavior
}

export type ComparisonTableProps = {
  data?: ComparisonTableRow[]
}
