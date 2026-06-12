import type { CheckboxOption } from '@/components/atoms/checkbox-field/types'
import type { SearchPopoverOption } from '@/components/molecules/search-popover/types'

export function createStockOption(option: SearchPopoverOption): CheckboxOption {
  return {
    value: option.value,
    label: `${option.value} (${option.label})`,
    color: 'chart-blue',
  }
}

export function addStockToSelection(
  option: SearchPopoverOption,
  stockOptions: CheckboxOption[],
  selectedStocks: string[]
) {
  const alreadyExists = stockOptions.some((stock) => stock.value === option.value)
  const nextOptions = alreadyExists ? stockOptions : [...stockOptions, createStockOption(option)]
  const nextSelectedStocks = selectedStocks.includes(option.value)
    ? selectedStocks
    : [...selectedStocks, option.value]

  return {
    nextOptions,
    nextSelectedStocks,
  }
}
