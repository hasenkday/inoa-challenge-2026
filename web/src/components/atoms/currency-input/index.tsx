import type { ChangeEvent } from 'react'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type CurrencyInputProps = {
  value: number
  onValueChange: (value: number) => void
  className?: string
  id?: string
}

export function CurrencyInput({ value, onValueChange, className, id }: CurrencyInputProps) {
  const formattedValue = value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const onlyNumbers = event.target.value.replace(/\D/g, '')
    const nextValue = Number(onlyNumbers) / 100

    onValueChange(nextValue)
  }

  return (
    <div className={cn('relative', className)}>
      <Input
        id={id}
        inputMode="numeric"
        className="pr-4 pl-12 text-right"
        value={formattedValue}
        onChange={handleChange}
      />

      <span className="text-foreground-muted pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm font-medium">
        R$
      </span>
    </div>
  )
}
