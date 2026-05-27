import { Button } from '@/components/atoms/button'

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
    </div>
  )
}
