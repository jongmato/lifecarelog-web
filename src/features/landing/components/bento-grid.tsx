import { cn } from '@/lib/utils'

interface BentoGridProps {
  children: React.ReactNode
  className?: string
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn('w-full max-w-[1200px] mx-auto', className)}>
      {children}
    </div>
  )
}

interface BentoRowProps {
  children: React.ReactNode
  className?: string
}

export function BentoRow({ children, className }: BentoRowProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-12',
        'gap-3 sm:gap-4 lg:gap-5',
        className
      )}
    >
      {children}
    </div>
  )
}

interface BentoSectionBreakProps {
  className?: string
}

export function BentoSectionBreak({ className }: BentoSectionBreakProps) {
  return <div className={cn('h-10 sm:h-14 lg:h-16', className)} />
}
