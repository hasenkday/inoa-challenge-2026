import { Skeleton } from '@/components/ui/skeleton'

export function SimulationSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-40" />
      </div>

      <div className="flex flex-1 flex-row gap-6 lg:flex-col">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-5 w-24" />
        </div>

        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-5 w-24" />
        </div>
      </div>
    </div>
  )
}
