import { useState } from 'react'

import { format } from 'date-fns'
import type { DateRange } from 'react-day-picker'

import { searchStocks } from '@/api/stocks'
import type { GetStocksParams } from '@/api/types'
import { Button } from '@/components/atoms/button'
import { CheckboxField } from '@/components/atoms/checkbox-field'
import { DateRangePicker } from '@/components/molecules/date-range-picker'
import { SearchPopover } from '@/components/molecules/search-popover'
import type { SearchPopoverOption } from '@/components/molecules/search-popover/types'

import { stockPresets } from './constants'
import { addStockToSelection } from './functions'
import { stocksStorage } from './storage'

type StockFiltersProps = {
  onSubmit: (filters: GetStocksParams) => Promise<void>
  loading?: boolean
}

export function StockFilters({ onSubmit, loading = false }: StockFiltersProps) {
  const [hasPendingChanges, setHasPendingChanges] = useState(false)

  const [stockOptionsList, setStockOptionsList] = useState(() => stocksStorage.getOptions())
  const [selectedStocks, setSelectedStocks] = useState(() => stocksStorage.getSelectedTickers())
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() =>
    stocksStorage.getDateRange()
  )

  const [searchResults, setSearchResults] = useState<SearchPopoverOption[]>([])
  const [isSearching, setIsSearching] = useState(false)

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

    stocksStorage.saveOptions(stockOptionsList)
    stocksStorage.saveSelectedTickers(selectedStocks)
    stocksStorage.saveDateRange(dateRange)

    setHasPendingChanges(false)
  }

  const canSearch =
    selectedStocks.length > 0 &&
    !!dateRange?.from &&
    !!dateRange?.to &&
    hasPendingChanges &&
    !loading

  function handleAddStock(option: SearchPopoverOption) {
    const { nextOptions, nextSelectedStocks } = addStockToSelection(
      option,
      stockOptionsList,
      selectedStocks
    )

    setStockOptionsList(nextOptions)
    setSelectedStocks(nextSelectedStocks)

    stocksStorage.saveOptions(nextOptions)

    setHasPendingChanges(true)
  }

  async function handleSearchChange(query: string) {
    if (query.trim().length < 2) {
      setSearchResults([])
      return
    }

    try {
      setIsSearching(true)
      const response = await searchStocks(query)
      setSearchResults(
        response.data.map((stock) => ({
          value: stock.ticker,
          label: stock.name,
          description: stock.sector,
        }))
      )
    } finally {
      setIsSearching(false)
    }
  }

  function handleRemoveStock(stockValue: string) {
    const nextOptions = stockOptionsList.filter((stock) => stock.value !== stockValue)
    const nextSelectedStocks = selectedStocks.filter((stock) => stock !== stockValue)

    setStockOptionsList(nextOptions)
    setSelectedStocks(nextSelectedStocks)
    setHasPendingChanges(true)
  }

  const checkboxOptions = stockOptionsList.map((stock) => ({
    ...stock,
    onRemove: () => handleRemoveStock(stock.value),
  }))

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
          label={`Ativos adicionados (${stockOptionsList.length})`}
          variant="fill"
          options={checkboxOptions}
          value={selectedStocks}
          onValueChange={handleStocksChange}
        />

        <SearchPopover
          className="w-(--radix-popover-trigger-width)!"
          label="Adicionar ativo"
          placeholder="Buscar código ou nome..."
          emptyMessage="Nenhum ativo encontrado."
          loadingMessage="Buscando ativos..."
          options={searchResults}
          selectedValues={selectedStocks}
          loading={isSearching}
          onSearchChange={handleSearchChange}
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
