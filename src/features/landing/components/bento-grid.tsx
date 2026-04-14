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
        'bento-row grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-12',
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
  return (
    <div className={cn('h-10 sm:h-14 lg:h-16 flex items-center', className)} aria-hidden="true">
      {/* Subtle decorative divider — adds visual rhythm between sections */}
      <div
        className="h-px w-full max-w-[1200px] mx-auto"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, var(--border) 20%, color-mix(in oklch, var(--primary) 15%, var(--border)) 50%, var(--border) 80%, transparent 100%)',
        }}
      />
    </div>
  )
}
