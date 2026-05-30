import { useState } from 'react'

import { Moon, Sun } from 'lucide-react'

import { Callout } from '@/components/atoms/callout'
import { SwitchField } from '@/components/atoms/switch-field'
import { toggleTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

import { StockFilters } from '../stock-filters'

import styles from './side-panel.module.css'

export function SidePanel(className?: string) {
  const [isLight, setIsLight] = useState(false)
  function handleThemeChange(checked: boolean) {
    setIsLight(checked)
    toggleTheme(checked)
  }

  return (
    <div className={cn(styles.root, className)}>
      <div>
        <span className={styles.app_title}>B3 Stock Viewer</span>
        <p className={styles.subtitle}>Visualize o histórico de valores dos ativos da B3</p>
      </div>

      <StockFilters />

      <div className="flex flex-col gap-2">
        <Callout
          variant="error"
          title="Consulta parcial"
          description="Alguns ativos não retornaram dados, mas os ativos válidos foram exibidos."
        />
        <Callout
          title="Dados armazenados localmente"
          description="O cache dos preços é salvo localmente para reduzir chamadas repetidas à API."
        />
      </div>

      <SwitchField
        label="Tema"
        variant="fill"
        checked={isLight}
        onCheckedChange={handleThemeChange}
        offIcon={<Moon />}
        onIcon={<Sun />}
      />
    </div>
  )
}
