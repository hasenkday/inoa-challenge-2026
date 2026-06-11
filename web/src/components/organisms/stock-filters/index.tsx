import { useState } from 'react'

import { format } from 'date-fns'
import type { DateRange } from 'react-day-picker'

import type { GetStocksParams } from '@/api/types'
import { Button } from '@/components/atoms/button'
import { CheckboxField } from '@/components/atoms/checkbox-field'
import { DateRangePicker } from '@/components/molecules/date-range-picker'
import { SearchPopover } from '@/components/molecules/search-popover'
import type { SearchPopoverOption } from '@/components/molecules/search-popover/types'

import { stockOptions, stockPresets, stockSearchOptions } from './constants'

type StockFiltersProps = {
  onSubmit: (filters: GetStocksParams) => Promise<void>
  loading?: boolean
}

export function StockFilters({ onSubmit, loading = false }: StockFiltersProps) {
  const [selectedStocks, setSelectedStocks] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [hasPendingChanges, setHasPendingChanges] = useState(true)

  function handleStocksChange(value: string[]) {
    setSelectedStocks(value)
    setHasPendingChanges(true)
  }

  function handleDateRangeChange(value: DateRange | undefined) {
    setDateRange(value)
    setHasPendingChanges(true)
  }

  async function handleSubmit() {
    if (!canSearch || !dateRange?.from || !dateRange?.to) return

    await onSubmit({
      tickers: selectedStocks,
      startDate: format(dateRange.from, 'yyyy-MM-dd'),
      endDate: format(dateRange.to, 'yyyy-MM-dd'),
    })

    setHasPendingChanges(false)
  }

  const canSearch =
    selectedStocks.length > 0 &&
    !!dateRange?.from &&
    !!dateRange?.to &&
    hasPendingChanges &&
    !loading

  function handleAddStock(option: SearchPopoverOption) {
    setSelectedStocks((current) => [...current, option.value])
    setHasPendingChanges(true)
  }

  return (
    <div className="flex max-h-full flex-1 flex-col gap-6 overflow-hidden">
      <DateRangePicker
        presets={stockPresets}
        value={dateRange}
        onValueChange={handleDateRangeChange}
      />

      <div className="flex max-h-full flex-col gap-3 overflow-hidden">
        <CheckboxField
          className="max-h-[250px] overflow-hidden md:max-h-full"
          label={`Ativos selecionados (${selectedStocks.length})`}
          variant="fill"
          options={stockOptions}
          value={selectedStocks}
          onValueChange={handleStocksChange}
        />

        <SearchPopover
          className="w-(--radix-popover-trigger-width)!"
          label="Adicionar ativo"
          placeholder="Buscar código ou nome..."
          emptyMessage="Nenhum ativo encontrado."
          loadingMessage="Buscando ativos..."
          options={stockSearchOptions}
          selectedValues={selectedStocks}
          onSelect={handleAddStock}
        />

        <Button
          className="py-5"
          color="primary"
          variant="fill"
          size="sm"
          disabled={!canSearch}
          onClick={handleSubmit}
        >
          {loading ? 'Comparando...' : 'Comparar ativos'}
        </Button>
      </div>
    </div>
  )
}
