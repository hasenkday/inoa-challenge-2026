import styles from '@/components/molecules/cards/card.module.css'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function ComparisonTable() {
  return (
    <Card className={cn(styles.cardRoot, 'bg-transparent!')}>
      <CardHeader className={styles.cardHeader}>
        <CardTitle>Comparação</CardTitle>
      </CardHeader>

      <CardContent className={cn(styles.cardContent)}>{/* TODO: Table */}</CardContent>
    </Card>
  )
}
