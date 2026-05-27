import { DailyClosingChart } from '@/components/organisms/charts/daily-closing'
import { FilterPanel } from '@/components/organisms/filter-panel'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export default function HomePage() {
  return (
    <div className="text-light flex min-h-screen w-full flex-col items-center justify-center gap-4 p-3 lg:flex-row">
      <FilterPanel />

      <div
        id="filtered-content"
        className="bg-neutral-darkest/10 border-neutral-darker flex h-full w-full flex-col gap-5 rounded-[24px] border px-6 py-5"
      >
        <h1>Fechamento diário</h1>

        <section className="grid w-full grid-cols-2 gap-5 lg:grid-cols-4">
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <Card id="index" className="bg-neutral-lightest/2 h-full w-full border-none">
                <CardHeader>
                  <CardTitle>Lorem Ipsum</CardTitle>
                  <CardDescription>Some description</CardDescription>
                </CardHeader>
                <CardContent>Lorem Ipsum is simply</CardContent>
              </Card>
            ))}
        </section>

        <section className="h-full w-full">
          <Card className="bg-neutral-lightest/2 h-full w-full border-none">
            <CardHeader>
              <CardTitle>Lorem Ipsum</CardTitle>
              <CardDescription>Some description</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <DailyClosingChart />
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
