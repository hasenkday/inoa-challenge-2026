import type { Table } from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown } from 'lucide-react'

import { Button } from '@/components/atoms/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import type { ComparisonTableRow } from './types'

type SortButtonProps = {
  table: Table<ComparisonTableRow>
}

export function SortButton({ table }: SortButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <ArrowUpDown className="size-4" />
          Ordenar
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => table.getColumn('asset')?.toggleSorting(false)}>
          Ativo A-Z
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => table.getColumn('asset')?.toggleSorting(true)}>
          Ativo Z-A
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => table.getColumn('variation')?.toggleSorting(true)}>
          Maior variação
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => table.getColumn('variation')?.toggleSorting(false)}>
          Menor variação
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
