import { useState } from 'react'

import { format } from 'date-fns'
import type { DateRange } from 'react-day-picker'

import type { GetStocksParams } from '@/api/types'
import { Button } from '@/components/atoms/button'
import { CheckboxField } from '@/components/atoms/checkbox-field'
import { DateRangePicker } from '@/components/molecules/date-range-picker'

import { stockOptions, stockPresets } from './constants'

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

  return (
    <div className="flex flex-1 flex-col gap-6">
      <DateRangePicker
        presets={stockPresets}
        value={dateRange}
        onValueChange={handleDateRangeChange}
      />

      <CheckboxField
        label="Ativos"
        variant="fill"
        options={stockOptions}
        value={selectedStocks}
        onValueChange={handleStocksChange}
      />

      <Button color="primary" variant="fill" size="sm" disabled={!canSearch} onClick={handleSubmit}>
        {loading ? 'Buscando...' : 'Buscar'}
      </Button>
    </div>
  )
}
