import type * as React from 'react'

type SwitchVariant = 'default' | 'ghost' | 'fill' | 'icon'

export type SwitchFieldProps = {
  label?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  variant?: SwitchVariant
  onIcon?: React.ReactNode
  offIcon?: React.ReactNode
  className?: string
}
