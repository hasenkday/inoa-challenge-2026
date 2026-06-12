import { SimulationSkeleton } from '@/components/molecules/cards/simulation-card/skeleton'
import { SummarySkeleton } from '@/components/molecules/cards/summary-card/skeleton'
import { DailyClosingChartSkeleton } from '@/components/organisms/charts/daily-closing/skeleton'
import { ComparisonTableSkeleton } from '@/components/organisms/comparison-table/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import styles from '@/pages/home/home.module.css'

export function LoadingState() {
  return (
    <div className="flex flex-col gap-12">
      <div className={styles.dashboard}>
        <Card className={styles.chartCard}>
          <CardContent className={styles.chartContent}>
            <DailyClosingChartSkeleton />
          </CardContent>
        </Card>

        <div className="mt-5 flex w-full flex-col gap-10 lg:w-[360px]">
          <SummarySkeleton />
          <SimulationSkeleton />
        </div>
      </div>

      <ComparisonTableSkeleton />
    </div>
  )
}
