import { Skeleton } from '@/components/ui/skeleton'

export function DailyClosingChartSkeleton() {
  return (
    <div className="flex h-full min-h-[360px] w-full flex-col gap-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-4 w-16" />
      </div>

      <div className="flex flex-1 flex-col justify-end gap-6">
        <Skeleton className="h-px w-full" />
        <Skeleton className="h-px w-full" />
        <Skeleton className="h-px w-full" />
        <Skeleton className="h-px w-full" />

        <div className="relative h-32 w-full">
          <Skeleton className="absolute top-12 left-0 h-1 w-full rounded-full" />
          <Skeleton className="absolute top-20 left-0 h-1 w-[92%] rounded-full" />
        </div>
      </div>
    </div>
  )
}
