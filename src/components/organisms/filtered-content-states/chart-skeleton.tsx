import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import styles from '@/pages/home/home.module.css'

export function ChartSkeleton() {
  const comonClasses = 'bg-control-bg animate-pulse rounded-md'

  return (
    <>
      {/* <section className={styles.summaryGrid}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className={styles.summaryCard}>
            <CardHeader>
              <div className={cn(comonClasses, 'h-4 w-24')} />
              <div className={cn(comonClasses, 'h-3 w-32')} />
            </CardHeader>

            <CardContent>
              <div className={cn(comonClasses, 'h-6 w-20')} />
            </CardContent>
          </Card>
        ))}
      </section> */}

      <section className={styles.chartSection}>
        <Card className={styles.chartCard}>
          <CardHeader>
            <div className={cn(comonClasses, 'h-5 w-40')} />
            <div className={cn(comonClasses, 'h-3 w-56')} />
          </CardHeader>

          <CardContent className={styles.chartContent}>
            <div className={cn(comonClasses, 'h-full min-h-[320px] rounded-xl')} />
          </CardContent>
        </Card>
      </section>
    </>
  )
}
