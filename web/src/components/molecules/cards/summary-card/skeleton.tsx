import { Skeleton } from '@/components/ui/skeleton'

export function SummarySkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-20" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-5 w-36" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-5 w-32" />
      </div>
    </div>
  )
}
