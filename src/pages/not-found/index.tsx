import PageNotFoundImage from '@/assets/404-error.png'

export default function NotFoundPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5">
      <div
        className="h-30 w-60 bg-contain bg-no-repeat"
        style={{ backgroundImage: `url(${PageNotFoundImage})` }}
      />
      <span className="text-h2">Ops, página não encontrada</span>
    </div>
  )
}
