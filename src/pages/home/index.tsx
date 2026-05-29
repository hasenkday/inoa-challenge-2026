import { Download } from 'lucide-react'

import { Button } from '@/components/atoms/button'
import { DailyClosingChart } from '@/components/organisms/charts/daily-closing'
import { FilterPanel } from '@/components/organisms/filter-panel'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import styles from './home.module.css'

export default function HomePage() {
  return (
    <div className={styles.root}>
      <FilterPanel />

      <div id="filtered-content" className={styles.filteredContent}>
        <div className={styles.header}>
          <h1 className="text-h3 font-normal">Fechamento diário</h1>
          <Button variant="ghost" size="sm" className="font-medium">
            <Download />
            CSV
          </Button>
        </div>

        <section className={styles.summaryGrid}>
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <Card key={index} className={styles.summaryCard}>
                <CardHeader>
                  <CardTitle>Lorem Ipsum</CardTitle>
                  <CardDescription>Some description</CardDescription>
                </CardHeader>

                <CardContent>Lorem Ipsum is simply</CardContent>
              </Card>
            ))}
        </section>

        <section className={styles.chartSection}>
          <Card className={styles.chartCard}>
            <CardHeader>
              <CardTitle>Lorem Ipsum</CardTitle>
              <CardDescription>Some description</CardDescription>
            </CardHeader>

            <CardContent className={styles.chartContent}>
              <DailyClosingChart />
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
