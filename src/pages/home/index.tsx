import { Download } from 'lucide-react'

import { Button } from '@/components/atoms/button'
import { DailyClosingChart } from '@/components/organisms/charts/daily-closing'
import { ChartSkeleton } from '@/components/organisms/filtered-content-state/chart-skeleton'
import { EmptyState } from '@/components/organisms/filtered-content-state/empty-state'
import { SidePanel } from '@/components/organisms/side-panel'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import styles from './home.module.css'

export default function HomePage() {
  const isLoading = false
  const isEmpty = false

  return (
    <div className={styles.root}>
      <SidePanel />

      <div id="filtered-content" className={styles.filteredContent}>
        <div className={styles.header}>
          <h1 className="text-h3 font-normal">Fechamento diário</h1>

          <Button variant="ghost" size="sm" className="font-medium" disabled={isEmpty || isLoading}>
            <Download />
            CSV
          </Button>
        </div>

        {isLoading ? (
          <ChartSkeleton />
        ) : (
          <>
            {!isEmpty && (
              <section className={styles.summaryGrid}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <Card key={index} className={styles.summaryCard}>
                    <CardHeader>
                      <CardTitle>Lorem Ipsum</CardTitle>
                      <CardDescription>Some description</CardDescription>
                    </CardHeader>

                    <CardContent>Lorem Ipsum is simply</CardContent>
                  </Card>
                ))}
              </section>
            )}

            <section className={styles.chartSection}>
              <Card className={styles.chartCard}>
                {!isEmpty && (
                  <CardHeader>
                    <CardTitle>Fechamento diário</CardTitle>
                    <CardDescription>
                      Evolução dos ativos selecionados no período consultado
                    </CardDescription>
                  </CardHeader>
                )}

                <CardContent className={styles.chartContent}>
                  {isEmpty ? <EmptyState /> : <DailyClosingChart />}
                </CardContent>
              </Card>
            </section>
          </>
        )}
      </div>
    </div>
  )
}
