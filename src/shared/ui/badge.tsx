import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  [
    'inline-flex items-center gap-1.5 font-sans text-xs font-medium',
    'px-2.5 py-1 rounded-full select-none',
  ],
  {
    variants: {
      variant: {
        live: [
          'bg-success/15 text-success',
          // Pulse dot for live indicator
          'before:content-[""] before:w-1.5 before:h-1.5 before:rounded-full before:bg-success before:animate-pulse',
        ],
        'coming-soon': [
          'bg-warning/15 text-warning',
        ],
        'in-development': [
          'bg-plan-t/15 text-plan-t',
        ],
      },
    },
    defaultVariants: {
      variant: 'live',
    },
  }
)

export type BadgeVariants = VariantProps<typeof badgeVariants>

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, BadgeVariants {}

export function Badge({ variant, className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { badgeVariants }
