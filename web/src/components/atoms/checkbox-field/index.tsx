import * as React from 'react'

import { Check, X } from 'lucide-react'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

import styles from './checkbox-field.module.css'
import { CHECKBOX_COLOR_CLASS } from './constants'
import type { CheckboxFieldProps, MultiProps, SingleProps } from './types'

export function CheckboxField(props: CheckboxFieldProps) {
  if ('options' in props) {
    return <CheckboxGroup {...props} />
  }

  return <SingleCheckbox {...props} />
}

/* ---------- Single ---------- */

function SingleCheckbox({
  label,
  checked,
  onCheckedChange,
  variant = 'ghost',
  suffix,
  className,
}: SingleProps) {
  const id = React.useId()

  if (variant === 'ghost') {
    return (
      <div className={cn(styles.ghost, className)}>
        <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
        <Label htmlFor={id}>{label}</Label>
      </div>
    )
  }

  if (variant === 'fill') {
    return (
      <button
        type="button"
        className={cn(styles.fill, checked && styles.checked, className)}
        onClick={() => onCheckedChange?.(!checked)}
      >
        <span className={styles.indicator}>{checked && <Check />}</span>
        <span className={styles.label}>{label}</span>
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </button>
    )
  }

  return (
    <button
      type="button"
      className={cn(styles.button, checked && styles.checked, className)}
      onClick={() => onCheckedChange?.(!checked)}
    >
      {label}
    </button>
  )
}

/* ---------- Group ---------- */

function CheckboxGroup({
  label,
  options,
  value = [],
  onValueChange,
  variant = 'ghost',
  className,
}: MultiProps) {
  function toggle(optionValue: string) {
    if (!onValueChange) return

    onValueChange(
      value.includes(optionValue) ? value.filter((v) => v !== optionValue) : [...value, optionValue]
    )
  }

  return (
    <div className={cn(styles.wrapper, className)}>
      {label && <Label className={styles.groupLabel}>{label}</Label>}

      <div className={styles.group}>
        {options.map((option) => {
          const id = option.value
          const checked = value.includes(option.value)

          const color = CHECKBOX_COLOR_CLASS[option.color ?? 'primary']

          if (variant === 'ghost') {
            return (
              <div key={option.value} className={styles.ghost}>
                <Checkbox id={id} checked={checked} onCheckedChange={() => toggle(option.value)} />
                <Label htmlFor={id}>{option.label}</Label>
              </div>
            )
          }

          if (variant === 'fill') {
            return (
              <button
                key={option.value}
                type="button"
                className={cn(styles.fill, checked && styles.checked)}
                onClick={() => toggle(option.value)}
              >
                <span className={styles.indicator}>
                  {checked && <Check className={cn('size-5 stroke-3', color.text)} />}
                </span>

                <span className={styles.label}>{option.label}</span>

                <span className={styles.suffix}>
                  {option.onRemove ? (
                    <button
                      type="button"
                      className="text-foreground-muted hover:text-foreground flex items-center"
                      onClick={(event) => {
                        event.stopPropagation()
                        option.onRemove?.()
                      }}
                    >
                      <X className="size-4" />
                    </button>
                  ) : (
                    (option.suffix ?? (
                      <div
                        className={cn(
                          'h-2 w-8 rounded-full',
                          color.bg,
                          checked ? 'opacity-100' : 'opacity-10'
                        )}
                      />
                    ))
                  )}
                </span>
              </button>
            )
          }

          return (
            <button
              key={option.value}
              type="button"
              className={cn(styles.button, checked && styles.checked)}
              onClick={() => toggle(option.value)}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
