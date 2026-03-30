import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  // Base styles — 44px min touch target on mobile
  [
    'inline-flex items-center justify-center gap-2 font-sans font-medium',
    'rounded-xl transition-colors duration-200 cursor-pointer select-none',
    'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'min-h-[44px] min-w-[44px]',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary text-primary-foreground',
          'hover:bg-primary-hover',
          'active:scale-[0.98]',
        ],
        secondary: [
          'bg-muted text-foreground border border-border',
          'hover:bg-muted/70',
          'active:scale-[0.98]',
        ],
        ghost: [
          'text-foreground',
          'hover:bg-muted',
          'active:scale-[0.98]',
        ],
        outline: [
          'border border-border text-foreground bg-transparent',
          'hover:bg-muted',
          'active:scale-[0.98]',
        ],
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-lg min-h-[44px]',
        md: 'h-11 px-6 text-base',
        lg: 'h-13 px-8 text-lg rounded-2xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export type ButtonVariants = VariantProps<typeof buttonVariants>

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  ref?: React.Ref<HTMLButtonElement>
}

export function Button({
  variant,
  size,
  className,
  ref,
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { buttonVariants }
