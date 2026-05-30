import { useState } from 'react'

import { CheckboxField } from '@/components/atoms/checkbox-field'
import { DateRangePicker } from '@/components/molecules/date-range-picker'

import { stockOptions, stockPresets } from './constants'

export function StockFilters() {
  const [selectedStocks, setSelectedStocks] = useState<string[]>([])

  return (
    <div className="flex flex-1 flex-col gap-6">
      <DateRangePicker presets={stockPresets} />

      <CheckboxField
        label="Ativos"
        variant="fill"
        options={stockOptions}
        value={selectedStocks}
        onValueChange={setSelectedStocks}
      />
    </div>
  )
}
