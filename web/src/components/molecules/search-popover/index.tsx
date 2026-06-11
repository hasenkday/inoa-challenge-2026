import * as React from 'react'

import { Plus, Search } from 'lucide-react'

import { Button } from '@/components/atoms/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

import styles from './search-popover.module.css'
import type { SearchPopoverOption, SearchPopoverProps } from './types'

export function SearchPopover({
  label = 'Adicionar',
  placeholder = 'Buscar...',
  emptyMessage = 'Nenhum resultado encontrado.',
  loadingMessage = 'Buscando...',
  options,
  selectedValues = [],
  loading = false,
  onSearchChange,
  onSelect,
  trigger,
  className,
}: SearchPopoverProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value

    setSearch(value)
    onSearchChange?.(value)
  }

  function handleSelect(option: SearchPopoverOption) {
    const alreadySelected = selectedValues.includes(option.value)

    if (alreadySelected || option.disabled) return

    onSelect(option)
    setSearch('')
    setOpen(false)
  }

  const filteredOptions = React.useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    if (!normalizedSearch) return options

    return options.filter((option) => {
      return (
        option.value.toLowerCase().includes(normalizedSearch) ||
        option.label.toLowerCase().includes(normalizedSearch) ||
        option.description?.toLowerCase().includes(normalizedSearch)
      )
    })
  }, [options, search])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {trigger ?? (
          <Button variant="outline" color="default" size="sm" className={styles.trigger}>
            <Plus className="size-4" />
            {label}
          </Button>
        )}
      </PopoverTrigger>

      <PopoverContent className={cn(styles.content, className)} align="start">
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} />

          <input
            value={search}
            onChange={handleSearchChange}
            placeholder={placeholder}
            className={styles.input}
          />
        </div>

        <div className={styles.results}>
          {loading && <p className={styles.message}>{loadingMessage}</p>}

          {!loading &&
            filteredOptions.map((option) => {
              const alreadySelected = selectedValues.includes(option.value)
              const disabled = alreadySelected || option.disabled

              return (
                <button
                  key={option.value}
                  type="button"
                  disabled={disabled}
                  className={cn(styles.result, disabled && styles.disabled)}
                  onClick={() => handleSelect(option)}
                >
                  <span className={styles.optionValue}>{option.value}</span>

                  <span className={styles.optionContent}>
                    <span className={styles.optionLabel}>{option.label}</span>

                    {option.description && (
                      <span className={styles.optionDescription}>{option.description}</span>
                    )}
                  </span>
                </button>
              )
            })}

          {!loading && filteredOptions.length === 0 && (
            <p className={styles.message}>{emptyMessage}</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
