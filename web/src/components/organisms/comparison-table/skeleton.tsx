import { Skeleton } from '@/components/ui/skeleton'

export function ComparisonTableSkeleton() {
  return (
    <div className="flex min-h-[250px] w-full flex-col gap-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-8 w-44" />
      </div>

      <div className="space-y-4 overflow-hidden">
        <div className="grid grid-cols-[1fr_1fr_1fr_0.8fr_1.2fr] gap-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-full" />
          ))}
        </div>

        {Array.from({ length: 4 }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-[1fr_1fr_1fr_0.8fr_1.2fr] gap-6">
            {Array.from({ length: 5 }).map((_, cellIndex) => (
              <Skeleton key={cellIndex} className="h-5 w-full" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
