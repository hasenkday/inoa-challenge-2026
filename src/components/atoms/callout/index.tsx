import type { ReactNode } from 'react'

import { Info, CircleAlert, TriangleAlert, CircleCheck, type LucideIcon } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { cn } from '@/lib/utils'

import styles from './callout.module.css'

type CalloutVariant = 'default' | 'warning' | 'error' | 'success'
type CalloutProps = {
  variant?: CalloutVariant
  title?: string
  description?: ReactNode
  icon?: ReactNode
  className?: string
}

const CALLOUT_ICON: Record<CalloutVariant, LucideIcon> = {
  default: Info,
  warning: TriangleAlert,
  error: CircleAlert,
  success: CircleCheck,
}

export function Callout({
  variant = 'default',
  title,
  description,
  icon,
  className,
}: CalloutProps) {
  const DefaultIcon = CALLOUT_ICON[variant]

  return (
    <Alert className={cn(styles.root, styles[variant], className)}>
      <span className={styles.icon} aria-hidden="true">
        {icon ?? <DefaultIcon size={14} strokeWidth={2.25} />}
      </span>

      {title && <AlertTitle className={styles.title}>{title}</AlertTitle>}

      {description && (
        <AlertDescription className={styles.description}>{description}</AlertDescription>
      )}
    </Alert>
  )
}
