import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import styles from '@/pages/home/home.module.css'

type ErrorStateProps = {
  message: string
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <Card className={cn(styles.chartCard, 'flex-1')}>
      <CardContent className={styles.chartContent}>
        <div className="flex min-h-[320px] flex-col items-center justify-center gap-3 px-4 text-center">
          <h2 className="text-error text-h4 font-medium">Erro ao carregar dados</h2>

          <p className="text-foreground-muted max-w-[420px] text-sm">{message}</p>
        </div>
      </CardContent>
    </Card>
  )
}
