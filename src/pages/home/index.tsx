import { Button } from '@/components/atoms/button'
import { DailyClosingChart } from '@/components/organisms/charts/daily-closing'

export default function HomePage() {
  const cookie = () => {
    alert('🍪')
  }

  return (
    <div className="bg-dark text-light flex min-h-screen flex-col items-center justify-center gap-4">
      Let's bake some ideas!
      <Button onClick={cookie} variant="fill" color="primary">
        A click, a cookie
      </Button>
      <section className="w-full max-w-4xl">
        <DailyClosingChart />
      </section>
    </div>
  )
}
