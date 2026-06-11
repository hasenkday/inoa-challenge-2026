import { Info } from 'lucide-react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export function HeaderWithTooltip({ label, tooltip }: { label: string; tooltip?: string }) {
  return (
    <>
      {tooltip ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-flex items-center gap-1">
                {label}
                <Info className="text-foreground-muted size-3.5" />
              </span>
            </TooltipTrigger>

            <TooltipContent className="max-w-[180px]">
              <p className="rounded-sm px-2 py-1 text-xs leading-tight shadow-sm">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <span className="inline-flex items-center gap-1">{label}</span>
      )}
    </>
  )
}
