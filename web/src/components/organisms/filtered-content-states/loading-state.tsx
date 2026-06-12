import { SimulationSkeleton } from '@/components/molecules/cards/simulation-card/skeleton'
import { SummarySkeleton } from '@/components/molecules/cards/summary-card/skeleton'
import { DailyClosingChartSkeleton } from '@/components/organisms/charts/daily-closing/skeleton'
import { ComparisonTableSkeleton } from '@/components/organisms/comparison-table/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import styles from '@/pages/home/home.module.css'

export function LoadingState() {
  return (
    <>
      <div className={styles.dashboard}>
        <Card className={styles.chartCard}>
          <CardContent className={styles.chartContent}>
            <DailyClosingChartSkeleton />
          </CardContent>
        </Card>

        <div className="flex w-full flex-col gap-3 lg:w-[360px]">
          <SummarySkeleton />
          <SimulationSkeleton />
        </div>
      </div>

      <ComparisonTableSkeleton />
    </>
  )
}
