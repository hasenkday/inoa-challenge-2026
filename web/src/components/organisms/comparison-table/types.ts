import { type ColumnDef } from '@tanstack/react-table'

export type AssetBehavior =
  | '↗ Predominância de alta'
  | '↘ Predominância de baixa'
  | '→ Oscilação lateral'

export type ComparisonTableRow = {
  asset: string
  company?: string
  sector?: string
  color: string
  initialPrice: number
  finalPrice: number
  variation: number
  behavior: AssetBehavior
}

export type ComparisonTableProps = {
  data?: ComparisonTableRow[]
}

export type ComparisonColumnDef = ColumnDef<ComparisonTableRow> & {
  meta?: {
    className?: string
  }
}
