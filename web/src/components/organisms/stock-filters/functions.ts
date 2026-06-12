import type { CheckboxOption } from '@/components/atoms/checkbox-field/types'
import type { SearchPopoverOption } from '@/components/molecules/search-popover/types'
import { getStockColor } from '@/lib/stock-colors'

export function createStockOption(option: SearchPopoverOption, colorIndex: number): CheckboxOption {
  return {
    value: option.value,
    label: option.label,
    color: getStockColor(colorIndex),
  }
}

export function addStockToSelection(
  option: SearchPopoverOption,
  stockOptions: CheckboxOption[],
  selectedStocks: string[]
) {
  const alreadyExists = stockOptions.some((stock) => stock.value === option.value)

  const nextOptions = alreadyExists
    ? stockOptions
    : [...stockOptions, createStockOption(option, stockOptions.length)]

  const nextSelectedStocks = selectedStocks.includes(option.value)
    ? selectedStocks
    : [...selectedStocks, option.value]

  return {
    nextOptions,
    nextSelectedStocks,
  }
}
