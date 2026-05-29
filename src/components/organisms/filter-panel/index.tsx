import { useState } from 'react'

import { Info } from 'lucide-react'
import { Moon, Sun } from 'lucide-react'

import { CheckboxField } from '@/components/atoms/checkbox-field'
import { SwitchField } from '@/components/atoms/switch-field'
import { DateRangePicker } from '@/components/molecules/date-range-picker'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { toggleTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

import { stockOptions, stockPresets } from './constants'
import styles from './filter-panel.module.css'
import type { FilterPanelProps } from './types'

export function FilterPanel({ className }: FilterPanelProps) {
  const [selectedStocks, setSelectedStocks] = useState<string[]>([])
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
      <div className="flex flex-1 flex-col gap-6">
        <DateRangePicker presets={stockPresets} />

        <CheckboxField
          label="Ativos"
          variant="fill"
          options={stockOptions}
          value={selectedStocks}
          onValueChange={setSelectedStocks}
        />
      </div>
      <Alert className={styles.callout}>
        <Info width={14} height={14} className="mt-[-6px] ml-[-5px]" />
        <AlertDescription className="leading-md text-foreground/50 text-xs">
          O armazenamento dos seus orçamentos é feito localmente (seu próprio navegador) e
          sincronizado com sua nuvem.
        </AlertDescription>
      </Alert>

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
