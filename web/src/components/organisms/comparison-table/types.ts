import { type ColumnDef } from '@tanstack/react-table'

import type { StockBehavior } from '@/api/types'

export type ComparisonTableRow = {
  asset: string
  company?: string
  sector?: string
  color: string
  initialPrice: number
  finalPrice: number
  variation: number
  behavior: StockBehavior
}

export type ComparisonTableProps = {
  data?: ComparisonTableRow[]
  total?: number
}

export type ComparisonColumnDef = ColumnDef<ComparisonTableRow> & {
  meta?: {
    className?: string
  }
}
