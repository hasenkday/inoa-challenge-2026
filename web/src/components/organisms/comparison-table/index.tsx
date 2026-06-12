import * as React from 'react'

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown } from 'lucide-react'

import { Button } from '@/components/atoms/button'
import cardStyles from '@/components/molecules/cards/card.module.css'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

import styles from './comparison-table.module.css'
import { TableColumns } from './table-columns'
import type { ComparisonTableProps } from './types'

export function ComparisonTable({ data = [], total = data.length }: ComparisonTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns: React.useMemo(() => TableColumns, []),
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <Card className={cn(cardStyles.cardRoot, 'bg-transparent! shadow-none')}>
      <CardHeader className={cn(cardStyles.cardHeader, 'flex-row items-center justify-between')}>
        <CardTitle>
          Comparação
          <span className="text-foreground-subtle ml-2 font-normal">({total} ativos)</span>
        </CardTitle>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => table.getColumn('variation')?.toggleSorting()}
        >
          <ArrowUpDown className="size-4" />
          Maior variação no período
          <ChevronDown className="size-4" />
        </Button>
      </CardHeader>

      <CardContent
        className={cn(cardStyles.cardContent, 'max-h-[920px] min-h-[250px] overflow-auto')}
      >
        <Table className={styles.table}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
