import * as React from 'react'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

import styles from './switch-field.module.css'
import type { SwitchFieldProps } from './types'

export function SwitchField({
  label,
  checked,
  onCheckedChange,
  variant = 'default',
  onIcon,
  offIcon,
  className,
}: SwitchFieldProps) {
  const id = React.useId()

  /* ---------- ICON ---------- */

  if (variant === 'icon') {
    return (
      <div className={cn(styles.iconWrapper, className)}>
        <Switch
          id={id}
          checked={checked}
          onCheckedChange={onCheckedChange}
          className={styles.iconSwitch}
        />

        <div className={cn(styles.icon, checked && styles.iconChecked)}>
          {checked ? onIcon : offIcon}
        </div>
      </div>
    )
  }

  /* ---------- DEFAULT ---------- */

  if (variant === 'default') {
    return (
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} className={className} />
    )
  }

  /* ---------- GHOST / FILL ---------- */

  return (
    <Label
      htmlFor={id}
      className={cn(
        styles.wrapper,
        variant === 'ghost' && styles.ghost,
        variant === 'fill' && styles.fill,
        checked && styles.active,
        className
      )}
    >
      <div className={styles.content}>
        {(onIcon || offIcon) && (
          <span className={styles.stateIcon}>{checked ? onIcon : offIcon}</span>
        )}

        {label && <span className={styles.label}>{label}</span>}
      </div>

      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </Label>
  )
}
