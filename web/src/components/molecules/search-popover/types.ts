import type * as React from 'react'

export type SearchPopoverOption = {
  value: string
  label: string
  description?: string
  disabled?: boolean
  metadata?: unknown
}

export type SearchPopoverProps = {
  label?: string
  placeholder?: string
  emptyMessage?: string
  loadingMessage?: string

  options: SearchPopoverOption[]
  selectedValues?: string[]
  loading?: boolean

  onSearchChange?: (value: string) => void
  onSelect: (option: SearchPopoverOption) => void

  trigger?: React.ReactNode
  className?: string
}
