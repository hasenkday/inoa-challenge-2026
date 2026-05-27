import { cn } from '@/lib/cn'

import styles from './filter-panel.module.css'

type FilterPanelProps = {
  className?: string
}

export function FilterPanel({ className }: FilterPanelProps) {
  return (
    <div className={cn(styles.root, className)}>
      <div>
        <span className="text-lg">B3 Stock Viewer</span>
        <p>Visualize o histórico do valor dos ativos da B3</p>
      </div>

      <div className="flex flex-1 flex-col gap-6">
        <div>Input date select</div>
        <div>Input multi select</div>
      </div>

      <div>info</div>
      <div>theme</div>
    </div>
  )
}
