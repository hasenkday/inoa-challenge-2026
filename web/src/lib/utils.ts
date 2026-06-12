import { clsx } from 'clsx'
import { differenceInCalendarDays } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: unknown[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function getPeriodDays(initial: string, final: string) {
  return differenceInCalendarDays(new Date(final), new Date(initial)) + 1
}
