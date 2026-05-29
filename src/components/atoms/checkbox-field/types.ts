import type * as React from 'react'

type CheckboxVariant = 'ghost' | 'fill' | 'button'

type CheckboxColor =
  | 'chart-yellow'
  | 'chart-green'
  | 'chart-blue'
  | 'chart-orange'
  | 'chart-red'
  | 'chart-purple'
  | 'chart-pink'
  | 'primary'

export type CheckboxOption = {
  value: string
  label: string
  color?: CheckboxColor
  suffix?: React.ReactNode
}

export type SingleProps = {
  variant?: CheckboxVariant
  label: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  suffix?: React.ReactNode
  className?: string
}

export type MultiProps = {
  variant?: CheckboxVariant
  label?: string
  options: CheckboxOption[]
  value?: string[]
  onValueChange?: (value: string[]) => void
  className?: string
}

export type CheckboxFieldProps = SingleProps | MultiProps
