import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

import styles from '../card.module.css'

export function SummaryCard() {
  return (
    <Card className={styles.cardRoot}>
      <CardHeader className={styles.cardHeader}>
        <CardTitle>Resumo do período</CardTitle>
        <CardDescription>Últimos 30 dias</CardDescription>
      </CardHeader>

      <CardContent className={cn(styles.cardContent, 'flex flex-row lg:flex-col')}>
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-xs font-normal">Melhor desempenho</p>
          <div className="flex flex-row items-baseline gap-4">
            <span className="text-lg font-medium">VALE3</span>
            <span className="text-foreground-success text-sm font-bold">+12.81%</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <p className="text-xs font-normal">Menor desempenho</p>
          <div className="flex flex-row items-baseline gap-4">
            <span className="text-lg font-medium">PETRA</span>
            <span className="text-foreground-error text-sm font-bold">-8.36%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
