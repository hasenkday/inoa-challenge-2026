import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

import styles from '../card.module.css'

export function SimulationCard() {
  return (
    <Card className={styles.cardRoot}>
      <CardHeader className={styles.cardHeader}>
        <CardTitle>Simulação</CardTitle>
        <CardDescription>...</CardDescription>
      </CardHeader>

      <CardContent className={cn(styles.cardContent, 'flex flex-row lg:flex-col')}>
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-sm font-normal">R$ 1.000 em VALE3</p>
          <span className="text-foreground-success text-sm font-bold">R$ 1.128</span>
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <p className="text-sm font-normal">R$ 1.000 em PETR4</p>
          <span className="text-foreground-error text-sm font-bold">R$ 916</span>
        </div>
      </CardContent>
    </Card>
  )
}
