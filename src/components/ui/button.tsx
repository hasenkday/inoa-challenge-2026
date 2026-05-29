import * as React from 'react'

import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'focus-visible:ring-control-border-focus inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-neutral-darkest shadow hover:bg-surface-primary-hover',

        destructive: 'bg-error text-neutral-lightest shadow-sm hover:bg-surface-error',

        outline:
          'border-control-border bg-control-bg text-control-foreground hover:border-control-border-hover hover:bg-control-hover border shadow-sm',

        secondary: 'bg-surface-muted text-foreground shadow-sm hover:bg-surface-hover',

        ghost: 'text-foreground hover:bg-control-hover',

        link: 'text-primary underline-offset-4 hover:underline',
      },

      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },

    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  }
)

Button.displayName = 'Button'

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants }
