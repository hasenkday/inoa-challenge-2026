import { useState } from 'react'

import { format } from 'date-fns'
import { Info } from 'lucide-react'
import type { DateRange } from 'react-day-picker'

import { Button } from '@/components/atoms/button'
import { CheckboxField } from '@/components/atoms/checkbox-field'
import { DateRangePicker } from '@/components/molecules/date-range-picker'

import { stockOptions, stockPresets } from './constants'

export function StockFilters() {
  const [selectedStocks, setSelectedStocks] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  const canSearch = selectedStocks.length > 0 && dateRange?.from && dateRange?.to

  function handleSearch() {
    const from = dateRange?.from ? format(dateRange.from, 'dd/MM/yyyy') : 'não selecionado'
    const to = dateRange?.to ? format(dateRange.to, 'dd/MM/yyyy') : 'não selecionado'
    const stocks = selectedStocks.length ? selectedStocks.join(', ') : 'nenhum ativo selecionado'

    window.alert(`Período: ${from} até ${to}\nAtivos: ${stocks}`)
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <DateRangePicker presets={stockPresets} value={dateRange} onValueChange={setDateRange} />

      <CheckboxField
        label="Ativos"
        variant="fill"
        options={stockOptions}
        value={selectedStocks}
        onValueChange={setSelectedStocks}
      />

      <Button
        color="primary"
        variant="fill"
        size="sm"
        disabled={!canSearch}
        title={!canSearch ? 'Selecione um período e pelo menos um ativo' : undefined}
        onClick={handleSearch}
      >
        Buscar
      </Button>
      {!canSearch && (
        <span className="text-foreground-subtle flex gap-2 text-sm">
          <Info size={15} className="mt-[2px] text-inherit" />
          Selecione um período e pelo menos um ativo e
        </span>
      )}
    </div>
  )
}
