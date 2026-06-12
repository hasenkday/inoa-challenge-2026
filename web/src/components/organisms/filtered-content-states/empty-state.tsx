import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import styles from '@/pages/home/home.module.css'

export function EmptyState() {
  return (
    <Card className={cn(styles.chartCard, 'flex-1')}>
      <CardContent className={styles.chartContent}>
        <div className="flex min-h-[320px] flex-col items-center justify-center gap-3 px-4 text-center">
          <h2 className="text-h4 font-medium">Nenhum dado para exibir</h2>

          <p className="text-foreground-muted max-w-[360px] text-sm font-normal">
            Selecione um período e pelo menos um ativo para consultar os preços históricos.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
