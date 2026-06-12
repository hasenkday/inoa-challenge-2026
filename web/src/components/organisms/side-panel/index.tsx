import { useState } from 'react'

import { Moon, Sun } from 'lucide-react'

import type { GetStocksParams } from '@/api/types'
import { Callout } from '@/components/atoms/callout'
import { SwitchField } from '@/components/atoms/switch-field'
import { StockFilters } from '@/components/organisms/stock-filters'
import { toggleTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

import styles from './side-panel.module.css'

type SidePanelProps = {
  onSubmit: (filters: GetStocksParams) => Promise<void>
  loading?: boolean
  feedback?: {
    variant: 'default' | 'warning' | 'error' | 'success'
    title: string
    description?: string
  } | null
  onClearResult?: () => void
}

export function SidePanel({ onSubmit, loading = false, feedback, onClearResult }: SidePanelProps) {
  const [isLight, setIsLight] = useState(false)
  function handleThemeChange(checked: boolean) {
    setIsLight(checked)
    toggleTheme(checked)
  }

  return (
    <div className={cn(styles.root)}>
      <div>
        <span className={styles.app_title}>B3 Stock Viewer</span>
        <p className={styles.subtitle}>Acompanhe e analise os ativos da B3</p>
      </div>

      <StockFilters onSubmit={onSubmit} onClearResult={onClearResult} loading={loading} />

      <div className="flex flex-col gap-2">
        {feedback && (
          <Callout
            variant={feedback.variant}
            title={feedback.title}
            description={feedback.description}
          />
        )}
        <Callout
          title="Dados armazenados localmente"
          description="O cache dos preços é salvo localmente para reduzir chamadas repetidas à API."
        />

        {/* TODO: fix localstorage saving */}
        <SwitchField
          label="Tema"
          variant="fill"
          checked={isLight}
          onCheckedChange={handleThemeChange}
          offIcon={<Moon />}
          onIcon={<Sun />}
        />
      </div>
    </div>
  )
}
